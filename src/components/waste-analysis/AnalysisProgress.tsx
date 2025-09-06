'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface AnalysisProgressProps {
  analysisId: string
}

export default function AnalysisProgress({ analysisId }: AnalysisProgressProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Starting analysis...')
  const router = useRouter()

  useEffect(() => {
    const progressMessages = [
      'Uploading image...',
      'Processing with AI...',
      'Identifying waste items...',
      'Analyzing materials...',
      'Generating lifecycle info...',
      'Finding recycling options...',
      'Creating reuse ideas...',
      'Finalizing results...'
    ]

    let currentStep = 0
    const interval = setInterval(() => {
      if (currentStep < progressMessages.length) {
        setStatus(progressMessages[currentStep])
        setProgress((currentStep + 1) * 12.5) // 100% / 8 steps = 12.5%
        currentStep++
      } else {
        clearInterval(interval)
        // Check if analysis is complete
        checkAnalysisStatus()
      }
    }, 2000) // Update every 2 seconds

    return () => clearInterval(interval)
  }, [analysisId])

  const checkAnalysisStatus = async () => {
    try {
      const response = await fetch(`/api/waste-analysis/results/${analysisId}`, {
        credentials: 'include'
      })

      if (response.ok) {
        // Analysis is complete, redirect to results
        router.push(`/dashboard/profile/waste-analyzer/results/${analysisId}`)
      } else {
        // Still processing or failed
        setTimeout(checkAnalysisStatus, 3000) // Check again in 3 seconds
      }
    } catch (error) {
      console.error('Error checking analysis status:', error)
      setTimeout(checkAnalysisStatus, 3000)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-8">
      <div className="max-w-md mx-auto px-4">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2">
              <span className="text-3xl">🔍</span>
              Analyzing Your Image
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-500 h-3 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Status Message */}
            <div className="text-center">
              <p className="text-gray-700 font-medium">{status}</p>
              <p className="text-sm text-gray-500 mt-2">
                This usually takes 30-60 seconds
              </p>
            </div>

            {/* Loading Animation */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-gray-200 rounded-full animate-spin border-t-green-500"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl">🤖</span>
                </div>
              </div>
            </div>

            {/* Fun Facts */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">💡 Did you know?</h4>
              <p className="text-sm text-blue-800">
                Our AI can identify over 100 different types of waste materials 
                and provide personalized recycling and reuse suggestions!
              </p>
            </div>

            {/* Cancel Button */}
            <div className="text-center">
              <button
                onClick={() => router.push('/dashboard/profile/waste-analyzer')}
                className="text-gray-500 hover:text-gray-700 text-sm underline"
              >
                Cancel Analysis
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
