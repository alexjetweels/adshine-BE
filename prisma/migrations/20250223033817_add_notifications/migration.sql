-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ALL_USER');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('HIDE', 'SHOW');

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "type" "NotificationType" NOT NULL DEFAULT 'ALL_USER',
    "status" "NotificationStatus" NOT NULL DEFAULT 'SHOW',
    "iconType" VARCHAR(50),
    "iconUrl" VARCHAR(255),
    "createBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);
