'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login')
    }
  }, [user, loading, router])

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
            Manage your account and explore environmental tools
          </p>
        </div>

        {/* User Info */}
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
                    <label className="block text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-lg text-gray-900">
                      {new Date().toLocaleDateString()}
                    </p>
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

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/dashboard/profile/waste-analyzer">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Waste Analyzer</h3>
                <p className="text-sm text-gray-600">
                  Upload images of waste items to get detailed analysis and recycling information
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/dashboard/profile/waste-analyzer/history">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analysis History</h3>
                <p className="text-sm text-gray-600">
                  View your past waste analyses and track your environmental impact
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/leaderboard">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6 text-center">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Leaderboard</h3>
                <p className="text-sm text-gray-600">
                  See how you rank against other environmental champions
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Environmental Impact */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              Your Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{user.points}</div>
                <div className="text-sm text-green-800">Points Earned</div>
                <div className="text-xs text-green-600 mt-1">
                  {user.points > 0 ? 'Great job helping the environment!' : 'Start analyzing waste to earn points!'}
                </div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-blue-800">Items Analyzed</div>
                <div className="text-xs text-blue-600 mt-1">
                  Use the Waste Analyzer to start tracking
                </div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">0</div>
                <div className="text-sm text-purple-800">Categories Found</div>
                <div className="text-xs text-purple-600 mt-1">
                  Discover different waste types
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}