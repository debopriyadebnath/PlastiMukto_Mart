
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Image from 'next/image';

const features = [
  {
    tag: 'AI-powered',
    title: 'AI-powered Plastic Detection',
    desc: 'Uses Gemini 2.0 Flash and Hugging Face vision-language models to classify plastics (e.g., PET, HDPE, PVC).',
    img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    tag: 'Camera',
    title: 'Camera Integration',
    desc: 'Snap and analyze waste in real time.',
    img: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    color: 'bg-orange-50 text-orange-500',
  },
  {
    tag: 'Guidance',
    title: 'Recycling Guidance',
    desc: 'Provides recyclability info, confidence scores, and item descriptions.',
    img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    tag: 'Engagement',
    title: 'User Engagement',
    desc: 'Gamified streaks, tokens, badges, and leaderboards to encourage eco-friendly habits.',
    img: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    color: 'bg-orange-50 text-orange-500',
  },
  {
    tag: 'Community',
    title: 'Community Hub',
    desc: 'Connects users with NGOs, campaigns, and nearby collection drives.',
    img: 'https://images.unsplash.com/photo-1468421870903-4df1664ac249?auto=format&fit=crop&w=400&q=80',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    tag: 'Marketplace',
    title: 'Marketplace Integration',
    desc: 'Offers eco-friendly and recycled products with revenue-sharing opportunities.',
    img: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    color: 'bg-orange-50 text-orange-500',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-orange-600">Key Features</h2>
        <p className="text-gray-500">Smart, fun, and community-driven waste management for everyone.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <Card key={idx} className="bg-white border-orange-100 shadow-md flex flex-col h-full">
            <CardHeader className="flex flex-col items-center gap-2 bg-transparent">
              <Badge className={`mb-2 ${feature.color}`}>{feature.tag}</Badge>
              <CardTitle className="text-lg md:text-xl text-orange-700 text-center">{feature.title}</CardTitle>
            </CardHeader>
            <div className="flex flex-col items-center px-6 pb-6">
              <img src={feature.img} alt={feature.title} className="rounded-xl border border-orange-100 bg-orange-50 w-full h-48 object-cover" />
              <p className="mt-4 text-gray-600 text-center">{feature.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
