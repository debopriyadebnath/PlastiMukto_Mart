'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DetectedWasteItem } from '@/types/waste-analysis'

interface DetectedItemsListProps {
  items: DetectedWasteItem[]
}

export default function DetectedItemsList({ items }: DetectedItemsListProps) {
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'plastic':
        return '🔵'
      case 'paper':
      case 'cardboard':
        return '📄'
      case 'metal':
        return '⚫'
      case 'glass':
        return '🟢'
      case 'organic':
        return '🟠'
      case 'electronic':
        return '📱'
      case 'textile':
        return '👕'
      case 'hazardous':
        return '⚠️'
      default:
        return '📦'
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'plastic':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'paper':
      case 'cardboard':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'metal':
        return 'bg-gray-100 text-gray-800 border-gray-200'
      case 'glass':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'organic':
        return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'electronic':
        return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'textile':
        return 'bg-pink-100 text-pink-800 border-pink-200'
      case 'hazardous':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600'
    if (confidence >= 0.6) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (items.length === 0) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No items detected</h3>
          <p className="text-gray-600">
            Try uploading a clearer image with better lighting and focus.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">🔍</span>
            Detected Waste Items ({items.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{getCategoryIcon(item.category)}</span>
                    <div>
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full border ${getCategoryColor(item.category)}`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <div className={`text-sm font-medium ${getConfidenceColor(item.confidence)}`}>
                    {Math.round(item.confidence * 100)}%
                  </div>
                </div>

                {item.material && (
                  <div className="mb-2">
                    <span className="text-sm text-gray-600">Material: </span>
                    <span className="text-sm font-medium">{item.material}</span>
                  </div>
                )}

                {item.description && (
                  <div className="mb-3">
                    <p className="text-sm text-gray-700">{item.description}</p>
                  </div>
                )}

                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Confidence: {Math.round(item.confidence * 100)}%</span>
                  <div className="w-16 bg-gray-200 rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        item.confidence >= 0.8 ? 'bg-green-500' :
                        item.confidence >= 0.6 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${item.confidence * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Category Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(
              items.reduce((acc, item) => {
                acc[item.category] = (acc[item.category] || 0) + 1
                return acc
              }, {} as Record<string, number>)
            ).map(([category, count]) => (
              <div key={category} className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">{getCategoryIcon(category)}</div>
                <div className="font-medium text-gray-900">{count}</div>
                <div className="text-sm text-gray-600">{category}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
