-- CreateEnum
CREATE TYPE "StatusProduct" AS ENUM ('INACTIVE', 'ACTIVE');

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "status" "StatusProduct" NOT NULL DEFAULT 'ACTIVE';
