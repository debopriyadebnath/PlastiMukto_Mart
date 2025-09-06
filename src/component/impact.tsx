import Image from 'next/image';

export default function ImpactSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-pink-50 via-white to-green-50">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-green-700 drop-shadow tracking-wide">
          🌍 Our Collective Impact
        </h2>
        <p className="text-pink-600 font-medium italic">
          See how our community is making a difference together.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12 px-6">
        <div className="bg-white rounded-2xl border-2 border-pink-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-8 flex flex-col items-center">
          <span className="text-4xl font-extrabold text-pink-600 mb-2 drop-shadow">
            1,200,000+
          </span>
          <span className="text-green-700 font-medium">Plastics Recycled</span>
        </div>

        <div className="bg-white rounded-2xl border-2 border-green-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-8 flex flex-col items-center">
          <span className="text-4xl font-extrabold text-green-600 mb-2 drop-shadow">
            850,000+
          </span>
          <span className="text-pink-700 font-medium">Tokens Rewarded</span>
        </div>

        <div className="bg-white rounded-2xl border-2 border-lavender-200 shadow-md hover:shadow-xl transition transform hover:-translate-y-1 p-8 flex flex-col items-center">
          <span className="text-4xl font-extrabold text-purple-500 mb-2 drop-shadow">
            320+
          </span>
          <span className="text-green-700 font-medium">Drives Joined</span>
        </div>
      </div>

      {/* Testimonial */}
      <div className="max-w-2xl mx-auto text-center">
        <blockquote className="italic text-lg text-pink-700 border-l-4 border-green-400 pl-4 mb-4">
          “PlastiMukto Mart helped our community recycle more than ever before.  
          The leaderboards and rewards keep us motivated!”
        </blockquote>
        <span className="block text-green-700 font-semibold">
          — Community Member
        </span>
      </div>
    </section>
  );
}
