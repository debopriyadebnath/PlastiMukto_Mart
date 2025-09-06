'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WasteAnalysis } from '@/types/waste-analysis'

interface AnalysisHistoryProps {
  analyses: WasteAnalysis[]
  pagination: {
    page: number
    limit: number
    totalCount: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  onPageChange: (page: number) => void
}

export default function AnalysisHistory({ analyses, pagination, onPageChange }: AnalysisHistoryProps) {
  const router = useRouter()
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'failed' | 'processing'>('all')

  const filteredAnalyses = analyses.filter(analysis => {
    if (filterStatus === 'all') return true
    return analysis.status === filterStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      case 'processing':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✅'
      case 'failed':
        return '❌'
      case 'processing':
        return '⏳'
      default:
        return '❓'
    }
  }

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleViewAnalysis = (analysisId: string) => {
    router.push(`/dashboard/profile/waste-analyzer/results/${analysisId}`)
  }

  if (analyses.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {/* Filter Controls */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Analysis History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              { value: 'all', label: 'All', count: analyses.length },
              { value: 'completed', label: 'Completed', count: analyses.filter(a => a.status === 'completed').length },
              { value: 'failed', label: 'Failed', count: analyses.filter(a => a.status === 'failed').length },
              { value: 'processing', label: 'Processing', count: analyses.filter(a => a.status === 'processing').length }
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setFilterStatus(filter.value as any)}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  filterStatus === filter.value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Analysis List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAnalyses.map((analysis) => (
          <Card key={analysis.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-4" onClick={() => handleViewAnalysis(analysis.id)}>
              {/* Image Preview */}
              <div className="relative mb-4">
                <img
                  src={analysis.imageUrl}
                  alt="Analysis preview"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <div className="absolute top-2 right-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(analysis.status)}`}>
                    {getStatusIcon(analysis.status)} {analysis.status}
                  </span>
                </div>
              </div>

              {/* Analysis Info */}
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 truncate">
                  {analysis.imageName}
                </h4>
                
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{formatDate(analysis.createdAt)}</span>
                  <span>{analysis.detectedItems.length} items</span>
                </div>

                {analysis.status === 'completed' && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Confidence:</span>
                    <span className="font-medium">
                      {analysis.confidence ? `${Math.round(analysis.confidence * 100)}%` : 'N/A'}
                    </span>
                  </div>
                )}

                {analysis.status === 'completed' && analysis.detectedItems.length > 0 && (
                  <div className="pt-2 border-t">
                    <div className="flex flex-wrap gap-1">
                      {analysis.detectedItems.slice(0, 3).map((item, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                        >
                          {item.name}
                        </span>
                      ))}
                      {analysis.detectedItems.length > 3 && (
                        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">
                          +{analysis.detectedItems.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {analysis.status === 'failed' && analysis.errorMessage && (
                  <div className="pt-2 border-t">
                    <p className="text-xs text-red-600 truncate">
                      Error: {analysis.errorMessage}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                {Math.min(pagination.page * pagination.limit, pagination.totalCount)} of{' '}
                {pagination.totalCount} analyses
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => onPageChange(pagination.page - 1)}
                  disabled={!pagination.hasPrevPage}
                  className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Previous
                </button>
                
                <div className="flex gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <button
                        key={pageNum}
                        onClick={() => onPageChange(pageNum)}
                        className={`px-3 py-1 text-sm border rounded-md ${
                          pagination.page === pageNum
                            ? 'bg-green-600 text-white border-green-600'
                            : 'hover:bg-gray-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>
                
                <button
                  onClick={() => onPageChange(pagination.page + 1)}
                  disabled={!pagination.hasNextPage}
                  className="px-3 py-1 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Next
                </button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
