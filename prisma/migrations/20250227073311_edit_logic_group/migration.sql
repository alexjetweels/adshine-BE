/*
  Warnings:

  - A unique constraint covering the columns `[userId,groupId]` on the table `user_groups` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE INDEX "user_groups_userId_groupId_idx" ON "user_groups"("userId", "groupId");

-- CreateIndex
CREATE UNIQUE INDEX "user_groups_userId_groupId_key" ON "user_groups"("userId", "groupId");
