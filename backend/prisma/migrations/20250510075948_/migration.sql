/*
  Warnings:

  - You are about to drop the `MagicToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MagicToken" DROP CONSTRAINT "MagicToken_userId_fkey";

-- DropTable
DROP TABLE "MagicToken";

-- CreateTable
CREATE TABLE "OTPToken" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "otpHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OTPToken_pkey" PRIMARY KEY ("id")
);
