'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DetectedWasteItem } from '@/types/waste-analysis'

interface LifecycleTimelineProps {
  lifecycleInfo: any
  detectedItems: DetectedWasteItem[]
}

export default function LifecycleTimeline({ lifecycleInfo, detectedItems }: LifecycleTimelineProps) {
  const lifecycleStages = [
    { stage: 'Production', icon: '🏭', description: 'Raw materials extraction and manufacturing' },
    { stage: 'Distribution', icon: '🚚', description: 'Transportation and retail distribution' },
    { stage: 'Usage', icon: '👤', description: 'Consumer use and product lifecycle' },
    { stage: 'Disposal', icon: '🗑️', description: 'End-of-life disposal methods' },
    { stage: 'Decomposition', icon: '⏰', description: 'Natural breakdown timeline' }
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="text-2xl">♻️</span>
          Product Lifecycle Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Lifecycle Timeline */}
          <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-300"></div>
            {lifecycleStages.map((stage, index) => (
              <div key={stage.stage} className="relative flex items-start gap-4 pb-8">
                <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-green-500 text-white rounded-full text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">{stage.icon}</span>
                    <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                  </div>
                  <p className="text-sm text-gray-600">{stage.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Item-specific Information */}
          {detectedItems.length > 0 && (
            <div className="border-t pt-6">
              <h4 className="font-medium text-gray-900 mb-4">Item-Specific Details:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {detectedItems.map((item) => (
                  <div key={item.id} className="bg-gray-50 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 mb-2">{item.name}</h5>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="font-medium">Category:</span> {item.category}
                      </div>
                      {item.material && (
                        <div>
                          <span className="font-medium">Material:</span> {item.material}
                        </div>
                      )}
                      <div>
                        <span className="font-medium">Typical Lifespan:</span> Varies by usage
                      </div>
                      <div>
                        <span className="font-medium">Decomposition Time:</span> 
                        {item.category.toLowerCase() === 'plastic' && ' 450+ years'}
                        {item.category.toLowerCase() === 'paper' && ' 2-6 months'}
                        {item.category.toLowerCase() === 'metal' && ' 50-500 years'}
                        {item.category.toLowerCase() === 'glass' && ' 1 million+ years'}
                        {item.category.toLowerCase() === 'organic' && ' 2-6 weeks'}
                        {!['plastic', 'paper', 'metal', 'glass', 'organic'].includes(item.category.toLowerCase()) && ' Varies'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environmental Impact */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">🌍 Environmental Impact</h4>
            <p className="text-sm text-blue-800">
              Understanding the lifecycle of waste items helps us make better choices about 
              consumption, disposal, and recycling. Each stage has environmental implications 
              that we can minimize through conscious decisions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
