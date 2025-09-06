'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AuroraText } from '@/components/magicui/aurora-text';

export default function RewardsPage() {
  const rewards = [
    { title: 'Eco Badge', desc: 'Earned by recycling 10+ plastics 🌱' },
    { title: 'Discount Coupon', desc: 'Flat 20% off on eco products 🛍️' },
    { title: 'Marketplace Token', desc: 'Redeemable in eco marketplace ♻️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-100 via-white to-green-50 p-10">
      {/* Header */}
      <h1> Your</h1>
      <AuroraText className="text-3xl text-green-700  mb-6 text-center">
         Rewards
      </AuroraText>
      <p className="text-center text-pink-700 font-medium mb-10 italic">
        Small steps for you, big steps for the planet 🌍
      </p>

      {/* Reward Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {rewards.map((reward, i) => (
          <Card
            key={i}
            className="bg-purple border-2 border-green-200 rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <CardContent className="p-6 flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-pink-600 mb-2 drop-shadow-sm">
                {reward.title}
              </h2>
              <p className="text-green-700 text-sm font-medium mb-4">
                {reward.desc}
              </p>
              <Button className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-full px-6">
                Redeem
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-16 text-center">
        <p className="text-xs text-green-500 tracking-wider uppercase font-semibold">
          Keep recycling • Keep earning • Keep growing 🌿
        </p>
      </div>
    </div>
  );
}
