import Image from 'next/image';

const partners = [
  { name: 'GreenEarth NGO', logo: '/ngo.png' },
  { name: 'EcoCSR', logo: '/ecoscr.png' },
  { name: 'RecycleNow', logo: '/recycle.png' },
  { name: 'CleanFuture', logo: '/clean.png' },
];

export default function BusinessSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-pink-50 via-white to-green-50">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-3 text-green-700 drop-shadow tracking-wide">
          🤝 Business & Partnerships
        </h2>
        <p className="text-pink-600 italic font-medium">
          We collaborate with NGOs, CSR partners, and businesses to maximize our impact.
        </p>
      </div>

      {/* Partners Grid */}
      <div className="flex flex-wrap justify-center items-center gap-8 mb-12 px-6">
        {partners.map((partner, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center bg-white rounded-2xl p-6 shadow-md border-2 border-pink-200 hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-16 w-auto object-contain mb-3"
            />
            <span className="text-sm text-green-700 font-semibold">{partner.name}</span>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-green-700 mb-3">
          <span className="font-bold text-pink-600">For NGOs & Businesses:</span>{' '}
          Partner with us to drive real-world change, boost your CSR impact, and
          engage your community in sustainability.
        </p>
        <p className="text-pink-700 font-medium">
          Contact us to learn more about partnership opportunities and shared revenue models.
        </p>
      </div>
    </section>
  );
}
