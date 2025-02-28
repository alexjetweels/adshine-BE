-- AddForeignKey
ALTER TABLE "notifications" ADD CONSTRAINT "notifications_createBy_fkey" FOREIGN KEY ("createBy") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
