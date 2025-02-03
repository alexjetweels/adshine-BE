-- CreateTable
CREATE TABLE "products" (
    "id" BIGSERIAL NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255),
    "description" TEXT,
    "price" BIGINT DEFAULT 0,
    "stock" BIGINT DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_category_key" ON "products"("category");
