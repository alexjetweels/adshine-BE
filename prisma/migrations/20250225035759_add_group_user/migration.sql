-- CreateEnum
CREATE TYPE "GroupRole" AS ENUM ('MANAGER', 'LEADER', 'STAFF');

-- CreateEnum
CREATE TYPE "StatusGroup" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "StatusUserGroup" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "status" "StatusGroup" NOT NULL DEFAULT 'ACTIVE',
    "createdBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_groups" (
    "userId" BIGINT NOT NULL,
    "groupId" TEXT NOT NULL,
    "status" "StatusGroup" NOT NULL DEFAULT 'ACTIVE',
    "role" "GroupRole" NOT NULL DEFAULT 'STAFF',
    "createdBy" BIGINT NOT NULL,

    CONSTRAINT "user_groups_pkey" PRIMARY KEY ("userId","groupId")
);

-- AddForeignKey
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_groups" ADD CONSTRAINT "user_groups_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
