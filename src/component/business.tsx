import Image from 'next/image';

const partners = [
  { name: 'GreenEarth NGO', logo: '/ngo.png' },
  { name: 'EcoCSR', logo: '/ecoscr.png' },
  { name: 'RecycleNow', logo: '/recycle.png' },
  { name: 'CleanFuture', logo: '/clean.png' },
];

export default function BusinessSection() {
  return (
    <section className="py-16 md:py-24 bg-black">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-green-400">Business & Partnerships</h2>
        <p className="text-green-200 mb-6">We collaborate with NGOs, CSR partners, and businesses to maximize our impact.</p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
        {partners.map((partner, idx) => (
          <div key={idx} className="flex flex-col items-center bg-green-950 rounded-xl p-4 shadow border border-green-900">
            <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain mb-2" />
            <span className="text-sm text-green-200 font-medium">{partner.name}</span>
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-orange-400 mb-2">
          <span className="font-semibold text-green-400">For NGOs & Businesses:</span> Partner with us to drive real-world change, boost your CSR impact, and engage your community in sustainability.
        </p>
        <p className="text-green-400">Contact us to learn more about partnership opportunities and shared revenue models.</p>
      </div>
    </section>
  );
}
