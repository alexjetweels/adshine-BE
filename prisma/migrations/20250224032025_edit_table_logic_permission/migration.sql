/*
  Warnings:

  - You are about to drop the column `name` on the `permissions` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "permissions_name_key";

-- AlterTable
ALTER TABLE "permission_groups" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "permissions" DROP COLUMN "name",
ADD COLUMN     "description" TEXT;
