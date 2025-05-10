import { Router } from "express";
import { PrismaClient } from "../../../generated/prisma";
import { Resend } from "resend";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import optGenerator from "otp-generator";

const prisma = new PrismaClient();
const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

const OTP_EXPIRY_MINS = 10;

router.post("/auth/request-otp", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }

  const otp = optGenerator.generate(6);
  const otp_hash = await bcrypt.hash(otp, 6);
  const expiry_at = new Date(Date.now() + OTP_EXPIRY_MINS * 60 * 1000);
});
