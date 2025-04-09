-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "groupSupportId" TEXT;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_groupSupportId_fkey" FOREIGN KEY ("groupSupportId") REFERENCES "groups"("id") ON DELETE SET NULL ON UPDATE CASCADE;
