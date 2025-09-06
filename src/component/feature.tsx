import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Image from 'next/image';

const features = [
  {
    tag: 'AI-powered',
    title: 'AI-powered Plastic Detection',
    desc: 'Uses Gemini 2.0 Flash and Hugging Face vision-language models to classify plastics (e.g., PET, HDPE, PVC).',
    img: '/ai powered plastic.png',
    color: 'bg-pink-100 text-pink-700',
  },
  {
    tag: 'Camera',
    title: 'Camera Integration',
    desc: 'Snap and analyze waste in real time.',
    img: '/camera integration.png',
    color: 'bg-green-100 text-green-700',
  },
  {
    tag: 'Guidance',
    title: 'Recycling Guidance',
    desc: 'Provides recyclability info, confidence scores, and item descriptions.',
    img: '/recycling guidance.png',
    color: 'bg-lavender-100 text-lavender-700',
  },
  {
    tag: 'Engagement',
    title: 'User Engagement',
    desc: 'Gamified streaks, tokens, badges, and leaderboards to encourage eco-friendly habits.',
    img: '/user.png',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    tag: 'Community',
    title: 'Community Hub',
    desc: 'Connects users with NGOs, campaigns, and nearby collection drives.',
    img: '/community.png',
    color: 'bg-green-50 text-green-600',
  },
  {
    tag: 'Marketplace',
    title: 'Marketplace Integration',
    desc: 'Offers eco-friendly and recycled products with revenue-sharing opportunities.',
    img: '/marketplace.png',
    color: 'bg-pink-50 text-pink-700',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white via-pink-50 to-green-50">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-pink-600 drop-shadow tracking-wide">
          ✨ Key Features
        </h2>
        <p className="text-green-700 font-medium italic">
          Smart, fun, and community-driven waste management for everyone.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
        {features.map((feature, idx) => (
          <Card
            key={idx}
            className="bg-white border-2 border-pink-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 rounded-2xl flex flex-col h-full"
          >
            <CardHeader className="flex flex-col items-center gap-2 bg-transparent">
              <Badge className={`${feature.color} font-semibold px-3 py-1 rounded-full text-xs uppercase tracking-wide`}>
                {feature.tag}
              </Badge>
              <CardTitle className="text-lg md:text-xl text-green-700 text-center font-bold">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <div className="flex flex-col items-center px-6 pb-6">
              <Image
                width={240}
                height={340}
                src={feature.img}
                alt={feature.title}
                className="rounded-xl border-2 border-green-200 bg-white w-full max-w-[240px] h-[340px] object-cover object-center shadow-sm"
                style={{ aspectRatio: '3/4' }}
              />
              <p className="mt-4 text-pink-700 text-center font-medium">
                {feature.desc}
              </p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
