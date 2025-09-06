import Image from 'next/image';
import Link from 'next/link';

import FeatureSection from '../component/feature';
import ImpactSection from '../component/impact';
import Footer from '../component/footer';
import BusinessSection from '@/component/business';
import { MorphingText } from '@/components/magicui/morphing-text';
import { SparklesText } from '@/components/magicui/sparkles-text';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-green-100">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-6 bg-lavender-100/80 shadow-lg rounded-b-2xl border-b-4 border-pink-300">
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="PlastiMukto Mart Logo"
            className="w-30 h-30 rounded-full border-2 border-green-400 shadow-lg"
          />
          <SparklesText className='text-4xl'> PlastiMukto Mart</SparklesText>   
            
    
        </div>
        <div className="hidden md:flex gap-8 text-pink-600 font-semibold">
          <Link href="#" className="hover:text-green-500 transition">Home</Link>
          <Link href="#" className="hover:text-green-500 transition">Services</Link>
          <Link href="#" className="hover:text-green-500 transition">Resources</Link>
          <Link href="#" className="hover:text-green-500 transition">Community</Link>
          <Link href="#" className="hover:text-green-500 transition">About</Link>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search"
            className="border border-pink-400 bg-white/70 text-pink-700 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
          <button className="bg-pink-500 text-white px-4 py-2 rounded shadow hover:bg-pink-600 transition">
            Log In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-8 md:px-20 py-16 md:py-24 gap-12">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-extrabold text-green-700 mb-4 drop-shadow-lg leading-snug">
            Make Daily Choices That <br />
            <span className="text-pink-600">Shape a Greener Future</span>
          </h1>
          <p className="text-lg text-lavender-700 mb-8 max-w-lg italic tracking-wide">
            Join <span className="text-green-600 font-bold">PlastiMukto Mart</span> to reduce, recycle, and manage waste effortlessly.
          </p>
          <div className="flex gap-4">
            <Link href="/dashboard">
              <button className="bg-green-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-600 transition flex items-center gap-2">
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <circle cx="10" cy="10" r="10" fill="#EC4899" />
                  <path
                    d="M7 10l3-3 3 3"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 13h6"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                Go to Dashboard
              </button>
            </Link>
            <button className="border-2 border-pink-400 text-pink-600 px-6 py-3 rounded-full font-semibold bg-white hover:bg-pink-400 hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>
        <div className="flex-1 flex justify-center relative">
          <span className="absolute -top-8 -left-8 w-32 h-32 bg-pink-400 rounded-full blur-2xl opacity-30 animate-pulse" />
          <span className="absolute -bottom-8 -right-8 w-32 h-32 bg-green-400 rounded-full blur-2xl opacity-30 animate-pulse" />
          <div className="relative z-10">
            <Image
              src="/landingimg.png"
              alt="Waste Management Illustration"
              width={420}
              height={320}
              className="rounded-2xl shadow-2xl border-4 border-pink-400"
            />
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <FeatureSection />

      {/* Impact Section */}
      <ImpactSection />

      {/* Business & Partnerships Section */}
      <BusinessSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
