'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import ImageUploader from '@/components/waste-analysis/ImageUploader'
import AnalysisProgress from '@/components/waste-analysis/AnalysisProgress'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function WasteAnalyzerPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [analysisId, setAnalysisId] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    router.push('/auth/login')
    return null
  }

  const handleUploadSuccess = (uploadedAnalysisId: string) => {
    setAnalysisId(uploadedAnalysisId)
    setIsAnalyzing(true)
    
    // Start analysis process
    startAnalysis(uploadedAnalysisId)
  }

  const startAnalysis = async (id: string) => {
    try {
      const response = await fetch('/api/waste-analysis/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ analysisId: id }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to results page
        router.push(`/dashboard/profile/waste-analyzer/results/${id}`)
      } else {
        console.error('Analysis failed:', data.message)
        setIsAnalyzing(false)
        // Handle error - could show a toast or error message
      }
    } catch (error) {
      console.error('Analysis error:', error)
      setIsAnalyzing(false)
    }
  }

  if (isAnalyzing && analysisId) {
    return <AnalysisProgress analysisId={analysisId} />
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Waste Product Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload an image of waste products to get detailed information about their lifecycle, 
            recycling options, and creative reuse ideas. Help the environment while earning points!
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📸</span>
                  Upload Waste Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUploader onUploadSuccess={handleUploadSuccess} />
              </CardContent>
            </Card>
          </div>

          {/* Info Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">ℹ️</span>
                  How It Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-medium">Upload Image</h4>
                    <p className="text-sm text-gray-600">
                      Take or upload a clear photo of waste items
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-medium">AI Analysis</h4>
                    <p className="text-sm text-gray-600">
                      Our AI identifies items and analyzes their properties
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-medium">Get Insights</h4>
                    <p className="text-sm text-gray-600">
                      Receive detailed lifecycle, recycling, and reuse information
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Earn Points
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">
                  Get rewarded for helping the environment:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    10 points per detected item
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Bonus points for rare items
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-500">✓</span>
                    Climb the leaderboard
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">📋</span>
                  Supported Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500">🔵</span>
                    Plastic
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">🟡</span>
                    Paper
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500">⚫</span>
                    Metal
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">🟢</span>
                    Glass
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-orange-500">🟠</span>
                    Organic
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-500">🟣</span>
                    Electronic
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
