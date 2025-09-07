'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useParams, useRouter } from 'next/navigation'
import AnalysisResults from '@/components/waste-analysis/AnalysisResults'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WasteAnalysis } from '@/types/waste-analysis'

export default function ResultsPage(_props: { params: Promise<{ analysisId: string }> }) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const routeParams = useParams()
  const analysisId = (routeParams?.analysisId as string) || ''
  const [analysis, setAnalysis] = useState<WasteAnalysis | null>(null)
  const [loadingAnalysis, setLoadingAnalysis] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    if (user) {
      fetchAnalysis()
    }
  }, [user, loading, analysisId])

  const fetchAnalysis = async () => {
    try {
      setLoadingAnalysis(true)
  if (!analysisId) return
  const response = await fetch(`/api/waste-analysis/results/${analysisId}`, {
        credentials: 'include'
      })

      const data = await response.json()

      if (data.success) {
        setAnalysis(data.analysis)
      } else {
        setError(data.message || 'Failed to load analysis results')
      }
    } catch (err) {
      console.error('Error fetching analysis:', err)
      setError('Failed to load analysis results')
    } finally {
      setLoadingAnalysis(false)
    }
  }

  if (loading || loadingAnalysis) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <div className="text-lg">Loading results...</div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-red-600">❌ Error</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-700">{error}</p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push('/dashboard/profile/waste-analyzer')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Try Another Analysis
                </button>
                <button
                  onClick={() => router.push('/dashboard')}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                >
                  Back to Dashboard
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
        <div className="max-w-md mx-auto px-4">
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-700">Analysis not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Analysis Results
              </h1>
              <p className="text-gray-600">
                Analysis completed on {new Date(analysis.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => router.push('/dashboard/profile/waste-analyzer')}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                New Analysis
              </button>
              <button
                onClick={() => router.push('/dashboard/profile/waste-analyzer/history')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                View History
              </button>
            </div>
          </div>
        </div>

        {/* Analysis Results */}
        <AnalysisResults analysis={analysis} />

        {/* Points Earned */}
        {analysis.detectedItems.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">🏆</span>
                Points Earned
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-lg font-medium">
                    You earned {analysis.detectedItems.length * 10} points!
                  </p>
                  <p className="text-sm text-gray-600">
                    {analysis.detectedItems.length} items detected × 10 points each
                  </p>
                </div>
                <div className="text-3xl font-bold text-green-600">
                  +{analysis.detectedItems.length * 10}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
