/*
  Warnings:

  - You are about to drop the column `icon` on the `SocialPlatform` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `SocialPlatform` table. All the data in the column will be lost.
  - Added the required column `type` to the `SocialPlatform` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "PlatformType" AS ENUM ('LINKEDIN', 'INSTAGRAM', 'GITHUB', 'X', 'YOUTUBE', 'TIKTOK', 'WEBSITE', 'EMAIL');

-- AlterTable
ALTER TABLE "SocialPlatform" DROP COLUMN "icon",
DROP COLUMN "name",
ADD COLUMN     "type" "PlatformType" NOT NULL;
