-- CreateEnum
CREATE TYPE "PostType" AS ENUM ('TIP', 'TRICK', 'SHARE');

-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('HIDE', 'SHOW');

-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255),
    "content" TEXT NOT NULL,
    "type" "PostType" NOT NULL DEFAULT 'TIP',
    "status" "PostStatus" NOT NULL DEFAULT 'SHOW',
    "iconType" VARCHAR(50),
    "iconUrl" VARCHAR(255),
    "createBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
