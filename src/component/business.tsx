import Image from 'next/image';

const partners = [
  { name: 'GreenEarth NGO', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Greenpeace.svg' },
  { name: 'EcoCSR', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2d/UNDP_logo.svg' },
  { name: 'RecycleNow', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/WWF_logo.svg' },
  { name: 'CleanFuture', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Red_Cross_Logo.svg' },
];

export default function BusinessSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-2 text-orange-700">Business & Partnerships</h2>
        <p className="text-gray-600 mb-6">We collaborate with NGOs, CSR partners, and businesses to maximize our impact.</p>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 mb-10">
        {partners.map((partner, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain mb-2" />
            <span className="text-sm text-gray-700 font-medium">{partner.name}</span>
          </div>
        ))}
      </div>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-lg text-gray-700 mb-2">
          <span className="font-semibold text-orange-700">For NGOs & Businesses:</span> Partner with us to drive real-world change, boost your CSR impact, and engage your community in sustainability.
        </p>
        <p className="text-gray-500">Contact us to learn more about partnership opportunities and shared revenue models.</p>
      </div>
    </section>
  );
}
