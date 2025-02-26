/*
  Warnings:

  - The primary key for the `support_order_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "support_order_groups" DROP CONSTRAINT "support_order_groups_pkey",
ALTER COLUMN "orderGroupId" SET DATA TYPE TEXT,
ADD CONSTRAINT "support_order_groups_pkey" PRIMARY KEY ("supportGroupId", "orderGroupId");
