import { GoogleGenerativeAI } from '@google/generative-ai'

const apiKey = process.env.GEMINI_API_KEY

if (!apiKey) {
  throw new Error('Missing GEMINI_API_KEY environment variable')
}

export const genAI = new GoogleGenerativeAI(apiKey)

// Use Gemini 1.5 Pro for better image analysis
export const geminiModel = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash-image-preview",
  generationConfig: {
    temperature: 0.1,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  }
})

// For vision tasks specifically
export const visionModel = genAI.getGenerativeModel({ 
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.1,
    topK: 32,
    topP: 1,
    maxOutputTokens: 4096,
  }
})
