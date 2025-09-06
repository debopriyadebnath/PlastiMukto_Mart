'use client'

import { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent } from '@/components/ui/card'

interface ImageUploaderProps {
  onUploadSuccess: (analysisId: string) => void
}

export default function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    setError(null)
    setUploading(true)

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file)
      setPreview(previewUrl)

      // Upload file
      const formData = new FormData()
      formData.append('image', file)

      const response = await fetch('/api/waste-analysis/upload', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        onUploadSuccess(data.analysisId)
      } else {
        setError(data.message || 'Upload failed')
        setPreview(null)
      }
    } catch (err) {
      console.error('Upload error:', err)
      setError('Upload failed. Please try again.')
      setPreview(null)
    } finally {
      setUploading(false)
    }
  }, [onUploadSuccess])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: uploading
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
          ${uploading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {uploading ? (
          <div className="space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
            <p className="text-gray-600">Uploading image...</p>
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
              <h4 className="font-medium">Preview:</h4>
              <img
                src={preview}
                alt="Upload preview"
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
