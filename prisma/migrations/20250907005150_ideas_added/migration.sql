/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Bounty` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `Bounty` table. All the data in the column will be lost.
  - You are about to drop the column `reward` on the `Bounty` table. All the data in the column will be lost.
  - Added the required column `idea` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Bounty` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wasteAnalysisId` to the `Bounty` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Bounty" DROP CONSTRAINT "Bounty_creatorId_fkey";

-- AlterTable
ALTER TABLE "public"."Bounty" DROP COLUMN "creatorId",
DROP COLUMN "deadline",
DROP COLUMN "reward",
ADD COLUMN     "idea" TEXT NOT NULL,
ADD COLUMN     "rewardTokens" INTEGER,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'open',
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "wasteAnalysisId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "public"."_UserBounties" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserBounties_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_UserBounties_B_index" ON "public"."_UserBounties"("B");

-- AddForeignKey
ALTER TABLE "public"."Bounty" ADD CONSTRAINT "Bounty_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Bounty" ADD CONSTRAINT "Bounty_wasteAnalysisId_fkey" FOREIGN KEY ("wasteAnalysisId") REFERENCES "public"."WasteAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserBounties" ADD CONSTRAINT "_UserBounties_A_fkey" FOREIGN KEY ("A") REFERENCES "public"."Bounty"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."_UserBounties" ADD CONSTRAINT "_UserBounties_B_fkey" FOREIGN KEY ("B") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
