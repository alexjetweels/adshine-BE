/*
  Warnings:

  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email" VARCHAR(255) NOT NULL;

-- CreateIndex
CREATE INDEX "users_email_idx" ON "users"("email");
