import { Router, Request, Response } from "express";
import { PrismaClient } from "../../../generated/prisma";
import { Resend } from "resend";
import bcrypt from "bcryptjs";
import optGenerator from "otp-generator";
import jwt from "jsonwebtoken";

const OTP_EXPIRY_MINS = 10;
const ACCESS_SECRET = process.env.ACCESS_SECRET!;
const REFRESH_SECRET = process.env.REFRESH_SECRET!;
const RESEND_API_KEY = process.env.RESEND_API!;

const prisma = new PrismaClient();
const router = Router();
const resend = new Resend(RESEND_API_KEY);

export const requestOtp = async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }

  const otp = optGenerator.generate(6);
  const otp_hash = await bcrypt.hash(otp, 6);
  const expiry_at = new Date(Date.now() + OTP_EXPIRY_MINS * 60 * 1000);

  await prisma.oTPToken.create({
    data: {
      email,
      otpHash: otp_hash,
      expiresAt: expiry_at,
    },
  });

  // const resendRes: any = await resend.emails.send({
  //   from: "kiratsatarohan@gmail.com",
  //   to: email,
  //   subject: "Your OTP Code",
  //   html: `<p>Your OTP is <strong>${otp}</strong>. It will expire in ${OTP_EXPIRY_MINS} minutes.</p>`,
  // });
  // console.log(resendRes);
  console.log(`OTP: ${otp} \n Expires in : ${OTP_EXPIRY_MINS}`);

  res.json({ message: `OTP sent to ${email}`, otp: otp });
  return;
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    res.status(400).json({ error: "Email or OTP required." });
    return;
  }

  const otp_record = await prisma.oTPToken.findFirst({
    where: {
      email,
      expiresAt: { gt: new Date() },
    },
    orderBy: { createdAt: "desc" },
  });

  if (!otp_record) {
    res.status(400).json({ error: "OTP not found or expired" });
    return;
  }

  const is_valid = await bcrypt.compare(otp, otp_record.otpHash);

  if (!is_valid) {
    res.status(401).json({ error: "Invalid OTP" });
    return;
  }

  await prisma.oTPToken.deleteMany({ where: { email } }); // optional

  let user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    user = await prisma.user.create({ data: { email } });
  }

  const access_token = jwt.sign({ userId: user.id }, ACCESS_SECRET, {
    expiresIn: "15m",
  });
  const refresh_token = jwt.sign({ userId: user.id }, REFRESH_SECRET, {
    expiresIn: "30d",
  });

  res.json({
    access_token,
    refresh_token,
    user: { id: user.id, email: user.email },
  });
  return;
};

router.post("/auth/request-otp", requestOtp);
router.post("/auth/verify-otp", verifyOtp);

export { router as authRouter };
