import { Router } from "express";
import { PrismaClient } from "../../generated/prisma";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { Resend } from "resend";
import { Request, Response } from "express";

const prisma = new PrismaClient();
const router = Router();
const resend = new Resend(process.env.RESEND_API_KEY);

router.post("/request-magic-link", async (req: Request, res: Response) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    res.status(400).json({ error: "Valid email is required" });
    return;
  }

  try {
    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      user = await prisma.user.create({
        data: { email },
      });
    }

    const token = uuidv4();
    const expires_at = dayjs().add(15, "minutes").toDate();

    await prisma.magicToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt: expires_at,
        isUsed: false,
      },
    });

    const magic_link = `https://localhost:3000/magic-login?token=${token}`;

    await resend.emails.send({
      from: "Beaconite <noreply@beaconite.com>",
      to: email,
      subject: "Your Magic Login Link",
      html: `
              <p>Click the link below to log in:</p>
              <p><a href="${magic_link}">${magic_link}</a></p>
            `,
    });
    res.status(200).json({ success: true });
    return;
  } catch (error) {
    console.error("Error occured at Magic Link request:", error);
    res.status(500).json({ error: "Failed to send magic link" });
    return;
  }
});

export = router;

/**
 * in express 5
 * must return void | Promise<void>
 * don't return res || Response (typescript only)
 *
 */
