'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface DetectedItem {
  name: string;
  category: string;
  material?: string;
  confidence: number;
  description?: string;
  analysisDate: string;
  imageName: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  points: number;
  rank?: number;
  position: number;
  totalRecycledItems: number;
  totalBountiesCompleted: number;
  totalBountyRewards: number;
  categoriesCount: number;
  materialsCount: number;
  categories: string[];
  materials: string[];
  recentActivity: any[];
  allDetectedItems: DetectedItem[];
  createdAt: string;
}

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboard, setLeaderboard] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [filter, setFilter] = useState<'all' | 'recent' | 'bounties'>('all');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard');
      const data = await response.json();
      
      if (data.success) {
        setLeaderboard(data.leaderboard);
      } else {
        setLeaderboard(getSampleLeaderboardData());
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      setLeaderboard(getSampleLeaderboardData());
    } finally {
      setLoading(false);
    }
  };

  const getSampleLeaderboardData = (): User[] => [
    {
      id: '1',
      name: 'Eco Warrior',
      email: 'eco@example.com',
      points: 2450,
      position: 1,
      totalRecycledItems: 28,
      totalBountiesCompleted: 12,
      totalBountyRewards: 850,
      categoriesCount: 6,
      materialsCount: 8,
      categories: ['Plastic', 'Paper', 'Metal', 'Glass', 'Organic', 'Electronic'],
      materials: ['PET', 'HDPE', 'Aluminum', 'Steel', 'Glass', 'Cardboard', 'Wood', 'Copper'],
      recentActivity: [],
      allDetectedItems: [
        { name: 'Plastic Bottle', category: 'Plastic', material: 'PET', confidence: 0.95, description: 'Clear plastic water bottle', analysisDate: new Date().toISOString(), imageName: 'bottle.jpg' },
        { name: 'Cardboard Box', category: 'Paper', material: 'Cardboard', confidence: 0.88, description: 'Amazon shipping box', analysisDate: new Date().toISOString(), imageName: 'box.jpg' },
        { name: 'Aluminum Can', category: 'Metal', material: 'Aluminum', confidence: 0.92, description: 'Soda can', analysisDate: new Date().toISOString(), imageName: 'can.jpg' }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Green Thumb',
      email: 'green@example.com',
      points: 1890,
      position: 2,
      totalRecycledItems: 22,
      totalBountiesCompleted: 8,
      totalBountyRewards: 650,
      categoriesCount: 5,
      materialsCount: 6,
      categories: ['Plastic', 'Paper', 'Organic', 'Glass', 'Metal'],
      materials: ['PET', 'HDPE', 'Cardboard', 'Glass', 'Aluminum', 'Steel'],
      recentActivity: [],
      allDetectedItems: [
        { name: 'Glass Jar', category: 'Glass', material: 'Glass', confidence: 0.90, description: 'Mason jar', analysisDate: new Date().toISOString(), imageName: 'jar.jpg' },
        { name: 'Newspaper', category: 'Paper', material: 'Newsprint', confidence: 0.85, description: 'Daily newspaper', analysisDate: new Date().toISOString(), imageName: 'newspaper.jpg' }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: '3',
      name: 'Recycle Master',
      email: 'recycle@example.com',
      points: 1650,
      position: 3,
      totalRecycledItems: 18,
      totalBountiesCompleted: 6,
      totalBountyRewards: 480,
      categoriesCount: 4,
      materialsCount: 5,
      categories: ['Plastic', 'Paper', 'Metal', 'Glass'],
      materials: ['PET', 'HDPE', 'Cardboard', 'Aluminum', 'Steel'],
      recentActivity: [],
      allDetectedItems: [
        { name: 'Plastic Bag', category: 'Plastic', material: 'LDPE', confidence: 0.87, description: 'Grocery bag', analysisDate: new Date().toISOString(), imageName: 'bag.jpg' },
        { name: 'Tin Can', category: 'Metal', material: 'Steel', confidence: 0.91, description: 'Food can', analysisDate: new Date().toISOString(), imageName: 'tin.jpg' }
      ],
      createdAt: new Date().toISOString()
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl text-green-600 mb-4">Loading leaderboard...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-green-100 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-600 drop-shadow-lg mb-4">
          🏆 Eco Leaderboard
        </h1>
        <p className="text-xl text-pink-600 italic font-medium">
          Top environmental champions making a difference 🌍
        </p>
      </div>

      {/* Stats Overview */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-2 border-pink-300 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">{leaderboard.length}</div>
              <div className="text-pink-600 italic">Total Champions</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-pink-300 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {leaderboard.reduce((sum, user) => sum + user.totalRecycledItems, 0)}
              </div>
              <div className="text-pink-600 italic">Items Recycled</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-pink-300 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {leaderboard.reduce((sum, user) => sum + user.totalBountiesCompleted, 0)}
              </div>
              <div className="text-pink-600 italic">Bounties Completed</div>
            </CardContent>
          </Card>
          <Card className="bg-white border-2 border-pink-300 rounded-2xl shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {leaderboard.reduce((sum, user) => sum + user.points, 0)}
              </div>
              <div className="text-pink-600 italic">Total Points Earned</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="max-w-6xl mx-auto">
        <div className="space-y-6">
          {leaderboard.map((userData, index) => (
            <Card
              key={userData.id}
              className={`bg-white border-2 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${
                userData.id === user?.id ? 'border-green-500 ring-2 ring-green-200' : 'border-pink-300'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl font-bold px-4 py-2 rounded-full bg-yellow-100 text-yellow-600">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-green-600 mb-1">
                        {userData.name}
                        {userData.id === user?.id && <span className="text-sm text-pink-600 ml-2">(You)</span>}
                      </h3>
                      <p className="text-gray-600 text-sm">{userData.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-600">{userData.points}</div>
                    <div className="text-pink-600 italic">Points</div>
                  </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{userData.totalRecycledItems}</div>
                    <div className="text-xs text-green-800">Items Recycled</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{userData.totalBountiesCompleted}</div>
                    <div className="text-xs text-blue-800">Bounties Done</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{userData.categoriesCount}</div>
                    <div className="text-xs text-purple-800">Categories</div>
                  </div>
                  <div className="text-center p-3 bg-orange-50 rounded-lg">
                    <div className="text-xl font-bold text-orange-600">{userData.materialsCount}</div>
                    <div className="text-xs text-orange-800">Materials</div>
                  </div>
                </div>

                {/* Categories and Materials */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2 mb-2">
                    <span className="text-sm font-semibold text-gray-700">Categories:</span>
                    {userData.categories.map((category, idx) => (
                      <Badge key={idx} variant="secondary" className="bg-green-100 text-green-700">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm font-semibold text-gray-700">Materials:</span>
                    {userData.materials.map((material, idx) => (
                      <Badge key={idx} variant="outline" className="border-pink-300 text-pink-700">
                        {material}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Recent Recycled Items */}
                {userData.allDetectedItems.length > 0 && (
                  <div>
                    <h4 className="text-lg font-semibold text-green-600 mb-3">Recent Recycled Items:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {userData.allDetectedItems.slice(0, 6).map((item, idx) => (
                        <div key={idx} className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-semibold text-gray-900 text-sm">{item.name}</h5>
                            <span className="text-xs text-gray-500">
                              {Math.round(item.confidence * 100)}%
                            </span>
                          </div>
                          <div className="text-xs text-gray-600 mb-1">
                            <span className="font-medium">Category:</span> {item.category}
                          </div>
                          {item.material && (
                            <div className="text-xs text-gray-600 mb-1">
                              <span className="font-medium">Material:</span> {item.material}
                            </div>
                          )}
                          {item.description && (
                            <div className="text-xs text-gray-500 italic">
                              {item.description}
                            </div>
                          )}
                          <div className="text-xs text-gray-400 mt-2">
                            {new Date(item.analysisDate).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                    {userData.allDetectedItems.length > 6 && (
                      <p className="text-sm text-gray-500 mt-2 text-center">
                        +{userData.allDetectedItems.length - 6} more items...
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-sm text-green-500 tracking-wider uppercase font-semibold">
          Every action counts • Every champion matters • Every day is Earth Day 🌍
        </p>
      </div>
    </div>
  );
}
