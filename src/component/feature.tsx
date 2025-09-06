
import { Card, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import Image from 'next/image';

const features = [
  {
    tag: 'AI-powered',
    title: 'AI-powered Plastic Detection',
    desc: 'Uses Gemini 2.0 Flash and Hugging Face vision-language models to classify plastics (e.g., PET, HDPE, PVC).',
    img: '/ai powered plastic.png',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    tag: 'Camera',
    title: 'Camera Integration',
    desc: 'Snap and analyze waste in real time.',
    img: '/camera integration.png',
    color: 'bg-orange-50 text-orange-500',
  },
  {
    tag: 'Guidance',
    title: 'Recycling Guidance',
    desc: 'Provides recyclability info, confidence scores, and item descriptions.',
    img: '/recycling guidance.png',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    tag: 'Engagement',
    title: 'User Engagement',
    desc: 'Gamified streaks, tokens, badges, and leaderboards to encourage eco-friendly habits.',
    img: '/user.png',
    color: 'bg-orange-50 text-orange-500',
  },
  {
    tag: 'Community',
    title: 'Community Hub',
    desc: 'Connects users with NGOs, campaigns, and nearby collection drives.',
    img: '/community.png',
    color: 'bg-orange-100 text-orange-700',
  },
  {
    tag: 'Marketplace',
    title: 'Marketplace Integration',
    desc: 'Offers eco-friendly and recycled products with revenue-sharing opportunities.',
    img: '/marketplace.png',
    color: 'bg-orange-50 text-orange-500',
  },
];

export default function FeatureSection() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-green-400">Key Features</h2>
        <p className="text-green-200">Smart, fun, and community-driven waste management for everyone.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, idx) => (
          <Card key={idx} className="bg-black border-green-700 shadow-md flex flex-col h-full">
            <CardHeader className="flex flex-col items-center gap-2 bg-transparent">
              <Badge className={`mb-2 bg-green-900 text-green-300`}>{feature.tag}</Badge>
              <CardTitle className="text-lg md:text-xl text-green-400 text-center">{feature.title}</CardTitle>
            </CardHeader>
            <div className="flex flex-col items-center px-6 pb-6">
              <Image 
                width={240} 
                height={340} 
                src={feature.img} 
                alt={feature.title} 
                className="rounded-xl border border-green-900 bg-green-950 w-full max-w-[240px] h-[340px] object-cover object-center" 
                style={{ aspectRatio: '3/4' }}
              />
              <p className="mt-4 text-green-200 text-center">{feature.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
