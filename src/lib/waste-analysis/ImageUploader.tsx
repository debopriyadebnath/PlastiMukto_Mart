
'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '@/components/ui/card'
import { WasteAnalysis } from '@/types/waste-analysis'

interface ImageUploaderProps {
  onAnalysisComplete: (analysis: WasteAnalysis, imageInfo: undefined) => void
}

export default function ImageUploader({ onAnalysisComplete }: ImageUploaderProps) {
  const [analyzing, setAnalyzing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    setAnalyzing(true)
    setImageFile(file)

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Convert to base64
      const imageData = await convertToBase64(file)

      // Analyze directly
      const response = await fetch('/api/waste-analysis/analyze-direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          imageData,
          fileName: file.name,
          fileSize: file.size,
          mimeType: file.type
        }),
      })

      const data = await response.json()

      if (data.success) {
        onAnalysisComplete(data.analysis, data.imageInfo)
      } else {
        setError(data.message || 'Analysis failed')
        setPreview(null)
        setImageFile(null)
      }
    } catch (err) {
      console.error('Analysis error:', err)
      setError('Analysis failed. Please try again.')
      setPreview(null)
      setImageFile(null)
    } finally {
      setAnalyzing(false)
    }
  }, [onAnalysisComplete])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: analyzing
  })

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive 
            ? 'border-green-500 bg-green-50' 
            : 'border-gray-300 hover:border-gray-400'
          }
          ${analyzing ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {analyzing ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-gray-600">Analyzing image...</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-6xl">📸</div>
            <div>
              <p className="text-lg font-medium text-gray-900">
                {isDragActive ? 'Drop the image here' : 'Drag & drop an image here'}
              </p>
              <p className="text-gray-500">or click to select</p>
            </div>
            <div className="text-sm text-gray-400">
              <p>Supports: JPEG, PNG, WebP</p>
              <p>Max size: 10MB</p>
            </div>
          </div>
        )}
      </div>

      {/* Preview */}
      {preview && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h4 className="font-medium">Image Preview:</h4>
              <img
                src={preview}
                alt="Analysis preview"
                className="max-w-full h-48 object-cover rounded-lg mx-auto"
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="text-red-500">⚠️</span>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">📝 Tips for better results:</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Use good lighting and clear focus</li>
          <li>• Include multiple items in one photo for efficiency</li>
          <li>• Avoid blurry or dark images</li>
          <li>• Make sure items are clearly visible</li>
        </ul>
      </div>
    </div>
  )
}