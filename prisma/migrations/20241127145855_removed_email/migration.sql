/*
  Warnings:

  - The values [EMAIL] on the enum `PlatformType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PlatformType_new" AS ENUM ('LINKEDIN', 'INSTAGRAM', 'GITHUB', 'X', 'YOUTUBE', 'TIKTOK', 'WEBSITE', 'FACEBOOK');
ALTER TABLE "SocialPlatform" ALTER COLUMN "type" TYPE "PlatformType_new" USING ("type"::text::"PlatformType_new");
ALTER TYPE "PlatformType" RENAME TO "PlatformType_old";
ALTER TYPE "PlatformType_new" RENAME TO "PlatformType";
DROP TYPE "PlatformType_old";
COMMIT;
