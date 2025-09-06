-- CreateTable
CREATE TABLE "public"."WasteAnalysis" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "imageName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'processing',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "lifecycleInfo" JSONB,
    "recyclingOptions" JSONB,
    "reuseIdeas" JSONB,
    "confidence" DOUBLE PRECISION,
    "userId" TEXT NOT NULL,

    CONSTRAINT "WasteAnalysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."DetectedWasteItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "material" TEXT,
    "confidence" DOUBLE PRECISION NOT NULL,
    "boundingBox" JSONB,
    "analysisId" TEXT NOT NULL,

    CONSTRAINT "DetectedWasteItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."WasteProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "material" TEXT,
    "description" TEXT,
    "lifecycleStages" JSONB NOT NULL,
    "decompositionTime" TEXT,
    "recyclable" BOOLEAN NOT NULL DEFAULT false,
    "recyclingCode" TEXT,
    "recyclingCenters" JSONB,
    "reuseIdeas" JSONB NOT NULL,
    "upcyclingPotential" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WasteProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WasteProduct_name_key" ON "public"."WasteProduct"("name");

-- AddForeignKey
ALTER TABLE "public"."WasteAnalysis" ADD CONSTRAINT "WasteAnalysis_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."DetectedWasteItem" ADD CONSTRAINT "DetectedWasteItem_analysisId_fkey" FOREIGN KEY ("analysisId") REFERENCES "public"."WasteAnalysis"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
