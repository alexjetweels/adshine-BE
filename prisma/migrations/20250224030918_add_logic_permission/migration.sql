-- CreateEnum
CREATE TYPE "StatusPermissionGroup" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "permissions" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_groups" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "status" "StatusPermissionGroup" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "permission_groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permission_group_details" (
    "permissionGroupId" TEXT NOT NULL,
    "permissionId" TEXT NOT NULL,

    CONSTRAINT "permission_group_details_pkey" PRIMARY KEY ("permissionGroupId","permissionId")
);

-- CreateTable
CREATE TABLE "user_permission_groups" (
    "userId" BIGINT NOT NULL,
    "permissionGroupId" TEXT NOT NULL,
    "createBy" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_permission_groups_pkey" PRIMARY KEY ("userId","permissionGroupId")
);

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "permission_groups_name_key" ON "permission_groups"("name");

-- AddForeignKey
ALTER TABLE "permission_group_details" ADD CONSTRAINT "permission_group_details_permissionGroupId_fkey" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "permission_group_details" ADD CONSTRAINT "permission_group_details_permissionId_fkey" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission_groups" ADD CONSTRAINT "user_permission_groups_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permission_groups" ADD CONSTRAINT "user_permission_groups_permissionGroupId_fkey" FOREIGN KEY ("permissionGroupId") REFERENCES "permission_groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
