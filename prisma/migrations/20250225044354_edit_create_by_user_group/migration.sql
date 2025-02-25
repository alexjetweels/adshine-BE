/*
  Warnings:

  - You are about to drop the column `createdBy` on the `user_groups` table. All the data in the column will be lost.
  - Added the required column `createBy` to the `user_groups` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user_groups" DROP COLUMN "createdBy",
ADD COLUMN     "createBy" BIGINT NOT NULL;
