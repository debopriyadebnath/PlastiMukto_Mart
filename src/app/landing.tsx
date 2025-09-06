
import Image from 'next/image';
import Link from 'next/link';

import FeatureSection from '../component/feature';
import ImpactSection from '../component/impact';

import Footer from '../component/footer';
import BusinessSection from '@/component/business';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">{/* Logo SVG */}
           
              
          </span>
          <span className="ml-2 text-xl font-semibold text-green-700">WastWise</span>
        </div>
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">
          <Link href="#" className="text-green-700">Home</Link>
          <Link href="#">Services</Link>
          <Link href="#">Resources</Link>
          <Link href="#">Community</Link>
          <Link href="#">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <input type="text" placeholder="Search" className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-200" />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Log In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24 gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Make Daily Choices That <br />
            <span className="text-green-600">Shape a Greener Future</span>
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Join WasteWise to reduce, recycle, and manage waste effortlessly.
          </p>
          <div className="flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded font-semibold hover:bg-green-700 transition">Start Sorting Now</button>
            <button className="border border-green-600 text-green-700 px-6 py-3 rounded font-semibold hover:bg-green-50 transition">Learn More</button>
          </div>
        </div>
        <div className="flex-1 flex justify-center">
          {/* Replace with your own SVG or image */}
          <Image src="/landingimg.png" alt="Waste Management Illustration" width={420} height={320} />
        </div>
      </section>

  {/* Feature Section */}
  <FeatureSection />

  {/* Impact Section */}
  <ImpactSection />

  {/* Business & Partnerships Section */}
  <BusinessSection />
      <Footer />
    </div>
  );
}
