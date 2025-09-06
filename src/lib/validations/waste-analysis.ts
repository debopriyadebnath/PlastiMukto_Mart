import { z } from 'zod'

export const wasteAnalysisUploadSchema = z.object({
  image: z.instanceof(File, {
    message: 'Please select an image file'
  }).refine(
    (file) => file.size <= 10 * 1024 * 1024, // 10MB limit
    'Image size must be less than 10MB'
  ).refine(
    (file) => ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type),
    'Only JPEG, PNG, and WebP images are allowed'
  ),
  userId: z.string().min(1, 'User ID is required')
})

export const wasteAnalysisResultSchema = z.object({
  detectedItems: z.array(z.object({
    name: z.string().min(1),
    category: z.string().min(1),
    material: z.string().optional(),
    confidence: z.number().min(0).max(1),
    description: z.string().optional(),
    lifecycleInfo: z.object({
      manufacturing: z.string(),
      lifespan: z.string(),
      decompositionTime: z.string(),
      environmentalImpact: z.string()
    }).optional(),
    recyclingOptions: z.object({
      recyclable: z.boolean(),
      recyclingCode: z.string().optional(),
      preparation: z.string(),
      whereToRecycle: z.string()
    }).optional(),
    reuseIdeas: z.array(z.string()).optional()
  })),
  overallConfidence: z.number().min(0).max(1),
  analysisNotes: z.string().optional()
})

export const detectedWasteItemSchema = z.object({
  name: z.string().min(1, 'Item name is required'),
  category: z.string().min(1, 'Category is required'),
  material: z.string().optional(),
  confidence: z.number().min(0).max(1, 'Confidence must be between 0 and 1'),
  boundingBox: z.any().optional(),
  description: z.string().optional()
})

export const wasteProductSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  category: z.string().min(1, 'Category is required'),
  material: z.string().optional(),
  description: z.string().optional(),
  lifecycleStages: z.any(),
  decompositionTime: z.string().optional(),
  recyclable: z.boolean().default(false),
  recyclingCode: z.string().optional(),
  recyclingCenters: z.any().optional(),
  reuseIdeas: z.any(),
  upcyclingPotential: z.string().optional()
})

export type WasteAnalysisUploadInput = z.infer<typeof wasteAnalysisUploadSchema>
export type WasteAnalysisResultInput = z.infer<typeof wasteAnalysisResultSchema>
export type DetectedWasteItemInput = z.infer<typeof detectedWasteItemSchema>
export type WasteProductInput = z.infer<typeof wasteProductSchema>
