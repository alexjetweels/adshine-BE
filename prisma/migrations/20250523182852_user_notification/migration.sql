-- CreateTable
CREATE TABLE "user_notifications" (
    "id" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" VARCHAR(500) NOT NULL,
    "type" SMALLINT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "redirectType" SMALLINT,
    "redirectId" VARCHAR(255),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_notifications_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "user_notifications_userId_idx" ON "user_notifications"("userId");

-- AddForeignKey
ALTER TABLE "user_notifications" ADD CONSTRAINT "user_notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
