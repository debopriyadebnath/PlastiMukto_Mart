import { visionModel } from './client'
import { WASTE_ANALYSIS_PROMPT } from './prompts'

export interface DetectedWasteItem {
  name: string
  category: string
  material: string
  confidence: number
  description: string
  lifecycleInfo: {
    manufacturing: string
    lifespan: string
    decompositionTime: string
    environmentalImpact: string
  }
  recyclingOptions: {
    recyclable: boolean
    recyclingCode: string
    preparation: string
    whereToRecycle: string
  }
  reuseIdeas: string[]
}

export interface WasteAnalysisResult {
  detectedItems: DetectedWasteItem[]
  overallConfidence: number
  analysisNotes: string
}

export async function analyzeWasteImage(imageUrl: string): Promise<WasteAnalysisResult> {
  try {
    console.log('Starting waste analysis for image:', imageUrl)
    
    // Convert image URL to base64 or use direct URL
    const imageData = await fetchImageAsBase64(imageUrl)
    
    const result = await visionModel.generateContent([
      WASTE_ANALYSIS_PROMPT,
      {
        inlineData: {
          data: imageData,
          mimeType: 'image/jpeg'
        }
      }
    ])

    const response = await result.response
    const text = response.text()
    
    console.log('Gemini response:', text)
    
    // Parse JSON response
    const analysisResult = JSON.parse(text) as WasteAnalysisResult
    
    // Validate the response structure
    if (!analysisResult.detectedItems || !Array.isArray(analysisResult.detectedItems)) {
      throw new Error('Invalid response structure from Gemini')
    }
    
    return analysisResult
  } catch (error) {
    console.error('Waste analysis error:', error)
    
    // Return a fallback response
    return {
      detectedItems: [],
      overallConfidence: 0,
      analysisNotes: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

async function fetchImageAsBase64(imageUrl: string): Promise<string> {
  try {
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }
    
    const arrayBuffer = await response.arrayBuffer()
    const base64 = Buffer.from(arrayBuffer).toString('base64')
    
    return base64
  } catch (error) {
    console.error('Error fetching image:', error)
    throw new Error('Failed to process image for analysis')
  }
}

export async function validateAnalysisResult(result: WasteAnalysisResult): Promise<boolean> {
  try {
    // Basic validation
    if (!result.detectedItems || !Array.isArray(result.detectedItems)) {
      return false
    }
    
    if (typeof result.overallConfidence !== 'number' || result.overallConfidence < 0 || result.overallConfidence > 1) {
      return false
    }
    
    // Validate each detected item
    for (const item of result.detectedItems) {
      if (!item.name || !item.category || typeof item.confidence !== 'number') {
        return false
      }
    }
    
    return true
  } catch (error) {
    console.error('Validation error:', error)
    return false
  }
}
