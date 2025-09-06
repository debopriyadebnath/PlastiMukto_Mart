// src/app/dashboard/profile/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ImageUploader from '@/components/waste-analysis/ImageUploader'
import AnalysisResults from '@/components/waste-analysis/AnalysisResults'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [analysis, setAnalysis] = useState<any>(null)
  const [imageInfo, setImageInfo] = useState<any>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [userImages, setUserImages] = useState<any[]>([]);
  const [loadingImages, setLoadingImages] = useState(true);
  // Fetch user's uploaded images
  useEffect(() => {
    if (user) {
      fetch('/api/waste-analysis/history?userId=' + user.id)
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUserImages(data.analyses);
          }
        })
        .finally(() => setLoadingImages(false));
    }
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

  const handleAnalysisComplete = (analysisData: any, imageData: any) => {
    setAnalysis(analysisData)
    setImageInfo(imageData)
    setSaved(false)
    setError(null)
  }

  const handleSaveAnalysis = async () => {
    if (!analysis || !imageInfo) return

    setSaving(true)
    setError(null)

    try {
      const response = await fetch('/api/waste-analysis/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          imageData: imageInfo.imageData,
          fileName: imageInfo.fileName,
          fileSize: imageInfo.fileSize,
          mimeType: imageInfo.mimeType,
          analysis: analysis
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSaved(true)
        // Update user points in context if needed
      } else {
        setError(data.message || 'Failed to save analysis')
      }
    } catch (err) {
      console.error('Save error:', err)
      setError('Failed to save analysis. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handleNewAnalysis = () => {
    setAnalysis(null)
    setImageInfo(null)
    setSaved(false)
    setError(null)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile Dashboard
          </h1>
          <p className="text-gray-600">
            Analyze waste items and track your environmental impact
          </p>
        </div>

        {/* Uploaded Images Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Uploaded Waste Images</h2>
          {loadingImages ? (
            <div className="text-center text-gray-600">Loading images...</div>
          ) : userImages.length === 0 ? (
            <div className="text-center text-gray-600">No images uploaded yet.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userImages.map(img => (
                <div key={img.id} className="bg-white rounded-lg shadow p-4">
                  <img src={img.imageUrl} alt={img.imageName} className="w-full h-48 object-cover rounded mb-2" />
                  <div className="font-semibold text-lg text-gray-900 mb-1">{img.imageName}</div>
                  <div className="text-sm text-gray-600 mb-1">Size: {img.imageSize} bytes</div>
                  <div className="text-sm text-gray-600 mb-1">Type: {img.mimeType}</div>
                  <div className="text-sm text-gray-600 mb-1">Status: {img.status}</div>
                  {img.confidence && (
                    <div className="text-sm text-green-700 mb-1">Confidence: {Math.round(img.confidence * 100)}%</div>
                  )}
                  <div className="text-xs text-gray-500">Uploaded: {new Date(img.createdAt).toLocaleString()}</div>
                  {img.detectedItems && img.detectedItems.length > 0 && (
                    <div className="mt-2">
                      <div className="font-medium text-gray-800 mb-1">Detected Items:</div>
                      <ul className="list-disc ml-5 text-sm">
                        {img.detectedItems.map((item: any, idx: number) => (
                          <><li key={idx} className='text-black'>{item.name} ({item.category})</li><h1>{item.description}</h1></>
                        ))}
                      </ul>
                    </div>
                  )}
                  {img.errorMessage && (
                    <div className="text-xs text-red-600 mt-2">Error: {img.errorMessage}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User Info & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">👤</span>
                  User Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Points</label>
                    <p className="mt-1 text-lg text-gray-900">{user.points}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🏆</span>
                  Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">{user.points}</div>
                    <div className="text-sm text-green-800">Total Points</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-3xl font-bold text-blue-600">
                      {user.rank ? `#${user.rank}` : 'Unranked'}
                    </div>
                    <div className="text-sm text-blue-800">Leaderboard Rank</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Waste Analyzer Section */}
        <div className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🔍</span>
                  Waste Product Analyzer
                </div>
                {analysis && (
                  <button
                    onClick={handleNewAnalysis}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm"
                  >
                    New Analysis
                  </button>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!analysis && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <p className="text-gray-600 mb-4">
                      Upload an image of waste products to get instant analysis and detailed information 
                      about their lifecycle, recycling options, and creative reuse ideas.
                    </p>
                  </div>
                  
                  <ImageUploader onAnalysisComplete={handleAnalysisComplete} />
                </div>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-red-500">⚠️</span>
                    <p className="text-red-700">{error}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Analysis Results */}
        {analysis && (
          <div className="mb-8">
            <AnalysisResults analysis={analysis} />
            
            {/* Save Analysis Section */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">💾</span>
                  Save Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!saved ? (
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Save this analysis to your history and earn {analysis.detectedItems?.length * 10 || 0} points!
                    </p>
                    <div className="flex gap-4">
                      <button
                        onClick={handleSaveAnalysis}
                        disabled={saving}
                        className="bg-green-600 hover:bg-green-700 disabled:opacity-50 text-white px-6 py-3 rounded-md font-medium"
                      >
                        {saving ? 'Saving...' : 'Save Analysis & Earn Points'}
                      </button>
                      <button
                        onClick={handleNewAnalysis}
                        className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-md font-medium"
                      >
                        Skip & Start New
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-4">✅</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis Saved!</h3>
                    <p className="text-gray-600 mb-4">
                      You earned {analysis.detectedItems?.length * 10 || 0} points for this analysis.
                    </p>
                    <button
                      onClick={handleNewAnalysis}
                      className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium"
                    >
                      Analyze Another Image
                    </button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <button
            onClick={() => router.push('/dashboard/profile/waste-analyzer/history')}
            className="text-left"
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis History</h3>
                <p className="text-sm text-gray-600">
                  View your saved analyses and track your environmental impact
                </p>
              </CardContent>
            </Card>
          </button>

          <button
            onClick={() => router.push('/leaderboard')}
            className="text-left"
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Leaderboard</h3>
                <p className="text-sm text-gray-600">
                  See how you rank against other environmental champions
                </p>
              </CardContent>
            </Card>
          </button>

          <button
            onClick={() => router.push('/marketplace')}
            className="text-left"
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🛒</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Marketplace</h3>
                <p className="text-sm text-gray-600">
                  Buy and sell eco-friendly products
                </p>
              </CardContent>
            </Card>
          </button>
        </div>
      </div>
    </div>
  )
}