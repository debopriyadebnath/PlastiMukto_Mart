/*
  Warnings:

  - Added the required column `imageSize` to the `WasteAnalysis` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `WasteAnalysis` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."DetectedWasteItem" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "public"."WasteAnalysis" ADD COLUMN     "errorMessage" TEXT,
ADD COLUMN     "imageSize" INTEGER NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "rawGeminiResponse" JSONB;
