import Image from 'next/image';

export default function ImpactSection() {
  return (
    <section className="py-16 md:py-24 bg-orange-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-orange-700">Our Collective Impact</h2>
        <p className="text-gray-600">See how our community is making a difference together.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <span className="text-4xl font-bold text-orange-600 mb-2">1,200,000+</span>
          <span className="text-gray-700">Plastics Recycled</span>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <span className="text-4xl font-bold text-orange-600 mb-2">850,000+</span>
          <span className="text-gray-700">Tokens Rewarded</span>
        </div>
        <div className="bg-white rounded-xl shadow p-8 flex flex-col items-center">
          <span className="text-4xl font-bold text-orange-600 mb-2">320+</span>
          <span className="text-gray-700">Drives Joined</span>
        </div>
      </div>
      <div className="max-w-2xl mx-auto text-center">
        <blockquote className="italic text-lg text-gray-700 border-l-4 border-orange-400 pl-4 mb-4">
          “PlastiMukto Mart helped our community recycle more than ever before. The leaderboards and rewards keep us motivated!”
        </blockquote>
        <span className="block text-gray-500">— Community Member</span>
      </div>
    </section>
  );
}
