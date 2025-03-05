-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('CREATED', 'PRODUCT_DELIVERED', 'COMPLETED', 'CANCELED');

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "state" "OrderState" NOT NULL DEFAULT 'CREATED';

-- CreateTable
CREATE TABLE "order_history" (
    "id" BIGSERIAL NOT NULL,
    "orderId" BIGINT NOT NULL,
    "userId" BIGINT NOT NULL,
    "action" "OrderState" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "order_history_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "order_history" ADD CONSTRAINT "order_history_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_history" ADD CONSTRAINT "order_history_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
