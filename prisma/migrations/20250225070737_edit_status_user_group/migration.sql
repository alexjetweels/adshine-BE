/*
  Warnings:

  - The `status` column on the `user_groups` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "user_groups" DROP COLUMN "status",
ADD COLUMN     "status" "StatusUserGroup" NOT NULL DEFAULT 'ACTIVE';
