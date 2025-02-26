-- CreateEnum
CREATE TYPE "GroupType" AS ENUM ('ORDER', 'SUPPORT');

-- AlterTable
ALTER TABLE "groups" ADD COLUMN     "type" "GroupType" NOT NULL DEFAULT 'ORDER';
