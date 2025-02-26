/*
  Warnings:

  - The primary key for the `user_groups` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `user_groups` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "user_groups" DROP CONSTRAINT "user_groups_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "user_groups_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "support_order_groups" (
    "supportGroupId" TEXT NOT NULL,
    "orderGroupId" BIGINT NOT NULL,

    CONSTRAINT "support_order_groups_pkey" PRIMARY KEY ("supportGroupId","orderGroupId")
);

-- CreateTable
CREATE TABLE "user_group_supports" (
    "userGroupId" TEXT NOT NULL,
    "groupSupportId" TEXT NOT NULL,

    CONSTRAINT "user_group_supports_pkey" PRIMARY KEY ("userGroupId","groupSupportId")
);

-- AddForeignKey
ALTER TABLE "support_order_groups" ADD CONSTRAINT "support_order_groups_supportGroupId_fkey" FOREIGN KEY ("supportGroupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_group_supports" ADD CONSTRAINT "user_group_supports_userGroupId_fkey" FOREIGN KEY ("userGroupId") REFERENCES "user_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
