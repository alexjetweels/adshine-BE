-- AddForeignKey
ALTER TABLE "support_order_groups" ADD CONSTRAINT "support_order_groups_orderGroupId_fkey" FOREIGN KEY ("orderGroupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
