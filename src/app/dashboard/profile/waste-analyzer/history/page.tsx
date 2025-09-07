'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import AnalysisHistory from '@/components/waste-analysis/AnalysisHistory'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AnalysisHistoryPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [analyses, setAnalyses] = useState<any[]>([])
  const [loadingAnalyses, setLoadingAnalyses] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalCount: 0,
    totalPages: 0,
    hasNextPage: false,
    hasPrevPage: false
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
      return
    }

    if (user) {
      fetchAnalyses()
    }
  // FIX: guard against undefined pagination
  }, [user, loading, pagination?.page])

  const fetchAnalyses = async () => {
    try {
      setLoadingAnalyses(true)
      const response = await fetch(
        `/api/waste-analysis/history?page=${pagination?.page ?? 1}&limit=${pagination?.limit ?? 10}`,
        { credentials: 'include' }
      )

      const data = await response.json()

      if (data.success) {
        // Guard analyses array shape
        const safeAnalyses = Array.isArray(data.analyses) ? data.analyses : []
        setAnalyses(safeAnalyses)
        // FIX: only update if pagination exists; preserve previous defaults
        if (data.pagination && typeof data.pagination === 'object') {
          setPagination(prev => ({ ...prev, ...data.pagination }))
        }
      } else {
        setError(data.message || 'Failed to load analysis history')
      }
    } catch (err) {
      console.error('Error fetching analyses:', err)
      setError('Failed to load analysis history')
    } finally {
      setLoadingAnalyses(false)
    }
  }

  const handlePageChange = (newPage: number) => {
    setPagination(prev => ({ ...prev, page: newPage }))
  }

  if (loading || loadingAnalyses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <div className="text-lg">Loading history...</div>
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
              <button
                onClick={() => router.push('/dashboard/profile/waste-analyzer')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                Back to Analyzer
              </button>
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
                Analysis History
              </h1>
              <p className="text-gray-600">
                View all your waste analysis results and track your environmental impact
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
                onClick={() => router.push('/dashboard')}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Stats Summary */}
        {analyses.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">{analyses.length}</div>
                <div className="text-sm text-gray-600">Total Analyses</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-600">
                  {analyses.reduce((sum, analysis) => sum + (analysis.detectedItems?.length || 0), 0)}
                </div>
                <div className="text-sm text-gray-600">Items Analyzed</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {analyses.reduce((sum, analysis) => sum + (analysis.detectedItems?.length || 0) * 10, 0)}
                </div>
                <div className="text-sm text-gray-600">Points Earned</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {new Set(analyses.flatMap(analysis => (analysis.detectedItems || []).map((item: any) => item.category))).size}
                </div>
                <div className="text-sm text-gray-600">Categories Found</div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Analysis History */}
        <AnalysisHistory 
          analyses={analyses}
          pagination={pagination}
          onPageChange={handlePageChange}
        />

        {/* Empty State */}
        {analyses.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis History</h3>
              <p className="text-gray-600 mb-6">
                You haven't analyzed any waste items yet. Start your first analysis to see your history here!
              </p>
              <button
                onClick={() => router.push('/dashboard/profile/waste-analyzer')}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md"
              >
                Start Your First Analysis
              </button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
