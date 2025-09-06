export interface WasteAnalysis {
  id: string
  imageUrl: string
  imageName: string
  imageSize: number
  mimeType: string
  status: 'processing' | 'completed' | 'failed'
  errorMessage?: string
  createdAt: Date
  completedAt?: Date
  rawGeminiResponse?: any
  detectedItems: DetectedWasteItem[]
  lifecycleInfo?: any
  recyclingOptions?: any
  reuseIdeas?: any
  confidence?: number
  userId: string
}

export interface DetectedWasteItem {
  id: string
  name: string
  category: string
  material?: string
  confidence: number
  boundingBox?: any
  description?: string
  analysisId: string
}

export interface WasteProduct {
  id: string
  name: string
  category: string
  material?: string
  description?: string
  lifecycleStages: any
  decompositionTime?: string
  recyclable: boolean
  recyclingCode?: string
  recyclingCenters?: any
  reuseIdeas: any
  upcyclingPotential?: string
  createdAt: Date
  updatedAt: Date
}

export interface LifecycleInfo {
  manufacturing: string
  lifespan: string
  decompositionTime: string
  environmentalImpact: string
}

export interface RecyclingOptions {
  recyclable: boolean
  recyclingCode?: string
  preparation: string
  whereToRecycle: string
}

export interface ReuseIdeas {
  ideas: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  materialsNeeded?: string[]
  timeRequired?: string
}

export interface AnalysisUploadRequest {
  image: File
  userId: string
}

export interface AnalysisResponse {
  success: boolean
  analysisId?: string
  error?: string
}

export interface AnalysisResult {
  success: boolean
  analysis?: WasteAnalysis
  error?: string
}

export interface AnalysisHistoryResponse {
  success: boolean
  analyses?: WasteAnalysis[]
  error?: string
}

export type WasteCategory = 
  | 'Plastic'
  | 'Paper/Cardboard'
  | 'Metal'
  | 'Glass'
  | 'Organic'
  | 'Electronic'
  | 'Textile'
  | 'Hazardous'
  | 'Other'

export type AnalysisStatus = 'processing' | 'completed' | 'failed'
