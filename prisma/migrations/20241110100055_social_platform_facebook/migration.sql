/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `SocialPlatform` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
ALTER TYPE "PlatformType" ADD VALUE 'FACEBOOK';

-- CreateIndex
CREATE UNIQUE INDEX "SocialPlatform_type_key" ON "SocialPlatform"("type");
