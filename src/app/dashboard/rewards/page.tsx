'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function RewardsPage() {
  const wasteCategories = [
    {
      category: 'Plastic Bottles',
      icon: '🥤',
      description: 'Single-use plastic bottles and containers',
      useCase: 'Recycled into new bottles, clothing fibers, and construction materials',
      rewards: [
        { title: 'Eco Warrior Badge', points: 50, desc: 'Earned by recycling 10+ plastic bottles' },
        { title: 'Bottle Redemption Token', points: 25, desc: 'Redeemable for eco-friendly alternatives' },
        { title: 'Ocean Saver Certificate', points: 100, desc: 'Contributed to ocean plastic cleanup' }
      ]
    },
    {
      category: 'Cardboard & Paper',
      icon: '📦',
      description: 'Cardboard boxes, newspapers, and paper products',
      useCase: 'Recycled into new paper products, packaging, and insulation materials',
      rewards: [
        { title: 'Tree Hugger Badge', points: 30, desc: 'Saved trees by recycling paper products' },
        { title: 'Paper Saver Token', points: 15, desc: 'Redeemable for digital subscriptions' },
        { title: 'Forest Guardian Certificate', points: 75, desc: 'Protected forest resources' }
      ]
    },
    {
      category: 'Glass Containers',
      icon: '🍶',
      description: 'Glass bottles, jars, and containers',
      useCase: 'Recycled into new glass products, road construction, and decorative items',
      rewards: [
        { title: 'Crystal Clean Badge', points: 40, desc: 'Earned by recycling 15+ glass items' },
        { title: 'Glass Art Token', points: 20, desc: 'Redeemable for art supplies' },
        { title: 'Sustainable Living Certificate', points: 90, desc: 'Promoted circular economy' }
      ]
    },
    {
      category: 'Metal Cans',
      icon: '🥫',
      description: 'Aluminum cans, tin cans, and metal containers',
      useCase: 'Recycled into new metal products, automotive parts, and construction materials',
      rewards: [
        { title: 'Metal Master Badge', points: 35, desc: 'Earned by recycling 20+ metal cans' },
        { title: 'Metal Magic Token', points: 18, desc: 'Redeemable for kitchen tools' },
        { title: 'Industrial Recycler Certificate', points: 85, desc: 'Reduced mining impact' }
      ]
    },
    {
      category: 'Electronic Waste',
      icon: '📱',
      description: 'Old phones, computers, and electronic devices',
      useCase: 'Recycled for precious metals, rare earth elements, and new electronic components',
      rewards: [
        { title: 'Tech Guardian Badge', points: 100, desc: 'Earned by recycling electronic devices' },
        { title: 'Digital Detox Token', points: 50, desc: 'Redeemable for nature experiences' },
        { title: 'Future Tech Certificate', points: 150, desc: 'Advanced sustainable technology' }
      ]
    },
    {
      category: 'Organic Waste',
      icon: '🍌',
      description: 'Food scraps, yard waste, and biodegradable materials',
      useCase: 'Composted into nutrient-rich soil, biogas production, and natural fertilizers',
      rewards: [
        { title: 'Compost Champion Badge', points: 25, desc: 'Earned by composting organic waste' },
        { title: 'Garden Growth Token', points: 12, desc: 'Redeemable for plant seeds' },
        { title: 'Earth Nurturer Certificate', points: 60, desc: 'Promoted soil health' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-green-100 p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-green-600 drop-shadow-lg mb-4">
          Your Rewards
        </h1>
        <p className="text-xl text-pink-600 italic font-medium">
          Small steps for you, big steps for the planet ��
        </p>
      </div>

      {/* Waste Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {wasteCategories.map((category, categoryIndex) => (
          <Card
            key={categoryIndex}
            className="bg-white border-2 border-pink-300 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105"
          >
            <CardContent className="p-6">
              {/* Category Header */}
              <div className="text-center mb-6">
                <div className="text-4xl mb-3">{category.icon}</div>
                <h2 className="text-2xl font-bold text-green-600 mb-2 drop-shadow-sm">
                  {category.category}
                </h2>
                <p className="text-pink-600 italic text-sm mb-3">
                  {category.description}
                </p>
                <div className="bg-green-100 rounded-lg p-3 mb-4">
                  <p className="text-green-700 text-sm font-medium">
                    <span className="font-bold">Use Case:</span> {category.useCase}
                  </p>
                </div>
              </div>

              {/* Rewards List */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-green-600 mb-3">Available Rewards:</h3>
                {category.rewards.map((reward, rewardIndex) => (
                  <div
                    key={rewardIndex}
                    className="bg-gradient-to-r from-green-50 to-pink-50 rounded-xl p-4 border border-green-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-green-600 font-bold text-sm">{reward.title}</h4>
                      <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                        {reward.points} pts
                      </span>
                    </div>
                    <p className="text-pink-600 italic text-xs mb-3">{reward.desc}</p>
                    <Button className="w-full bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-full text-sm transition-colors duration-200">
                      Redeem Now
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Progress Section */}
      <div className="mt-16 max-w-4xl mx-auto">
        <Card className="bg-white border-2 border-pink-300 rounded-2xl shadow-lg">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold text-green-600 mb-4 drop-shadow-sm">
              Your Recycling Journey
            </h2>
            <p className="text-pink-600 italic text-lg mb-6">
              Track your progress and unlock new achievements
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-green-100 to-pink-100 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">1,247</div>
                <div className="text-pink-600 italic">Items Recycled</div>
              </div>
              <div className="bg-gradient-to-br from-pink-100 to-green-100 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">23</div>
                <div className="text-pink-600 italic">Badges Earned</div>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-pink-100 rounded-xl p-6">
                <div className="text-3xl font-bold text-green-600 mb-2">4.2kg</div>
                <div className="text-pink-600 italic">CO₂ Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center">
        <p className="text-sm text-green-500 tracking-wider uppercase font-semibold">
          Keep recycling • Keep earning • Keep growing ��
        </p>
      </div>
    </div>
  );
}