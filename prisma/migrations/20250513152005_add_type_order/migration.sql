-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('BUY', 'SUPPORT');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "type" "OrderType" NOT NULL DEFAULT 'BUY';
