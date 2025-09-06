

import Link from 'next/link';
import Image from 'next/image';
import LandingPage from './landing';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
     <LandingPage/>
    </div>
  );
}
