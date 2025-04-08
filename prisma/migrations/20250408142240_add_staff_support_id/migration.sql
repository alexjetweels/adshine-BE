-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "staffSupportId" BIGINT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_staffSupportId_fkey" FOREIGN KEY ("staffSupportId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
