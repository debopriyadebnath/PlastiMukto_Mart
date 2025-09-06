'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WasteAnalysis } from '@/types/waste-analysis'
import DetectedItemsList from './DetectedItemsList'
import LifecycleTimeline from './LifecycleTimeline'
import RecyclingOptions from './RecyclingOptions'
import ReuseIdeas from './ReuseIdeas'

interface AnalysisResultsProps {
  analysis: WasteAnalysis
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState<'items' | 'lifecycle' | 'recycling' | 'reuse'>('items')

  const tabs = [
    { id: 'items', label: 'Detected Items', icon: '🔍' },
    { id: 'lifecycle', label: 'Lifecycle', icon: '♻️' },
    { id: 'recycling', label: 'Recycling', icon: '♻️' },
    { id: 'reuse', label: 'Reuse Ideas', icon: '💡' }
  ] as const

  return (
    <div className="space-y-6">
      {/* Image Preview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📸</span>
            Analyzed Image
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <img
              src={analysis.imageUrl}
              alt="Analyzed waste image"
              className="w-full max-w-2xl mx-auto rounded-lg shadow-lg"
            />
            <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {analysis.detectedItems.length} items detected
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">📊</span>
            Analysis Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {analysis.detectedItems.length}
              </div>
              <div className="text-sm text-blue-800">Items Detected</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {analysis.confidence ? `${Math.round(analysis.confidence * 100)}%` : 'N/A'}
              </div>
              <div className="text-sm text-green-800">Confidence</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {new Set(analysis.detectedItems.map(item => item.category)).size}
              </div>
              <div className="text-sm text-purple-800">Categories</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === 'items' && (
          <DetectedItemsList items={analysis.detectedItems} />
        )}
        
        {activeTab === 'lifecycle' && (
          <LifecycleTimeline 
            lifecycleInfo={analysis.lifecycleInfo}
            detectedItems={analysis.detectedItems}
          />
        )}
        
        {activeTab === 'recycling' && (
          <RecyclingOptions 
            recyclingOptions={analysis.recyclingOptions}
            detectedItems={analysis.detectedItems}
          />
        )}
        
        {activeTab === 'reuse' && (
          <ReuseIdeas 
            reuseIdeas={analysis.reuseIdeas}
            detectedItems={analysis.detectedItems}
          />
        )}
      </div>
    </div>
  )
}
