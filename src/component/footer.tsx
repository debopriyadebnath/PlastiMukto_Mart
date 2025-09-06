import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white text-green-400 py-8 mt-12 border-t-4 border-orange-500">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2">
            <img src="/logo.png" alt="PlastiMukto Mart Logo" className="w-8 h-8 rounded-full border-2 border-green-500 bg-white" />
            <span className="text-2xl font-bold text-orange-400">PlastiMukto <span className='text-green-400'>Mart</span></span>
          </span>
          <span className="text-sm text-green-300 ml-4">© {new Date().getFullYear()} All rights reserved.</span>
        </div>
        <nav className="flex gap-6 text-sm font-medium">
          <Link href="#" className="hover:text-orange-400 transition">Home</Link>
          <Link href="#" className="hover:text-orange-400 transition">Features</Link>
          <Link href="#" className="hover:text-orange-400 transition">Impact</Link>
          <Link href="#" className="hover:text-orange-400 transition">Partners</Link>
          <Link href="#" className="hover:text-orange-400 transition">Contact</Link>
        </nav>
        <div className="flex gap-4">
          <a href="#" aria-label="Twitter" className="hover:text-orange-400 transition"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M20 3.924a8.19 8.19 0 0 1-2.357.646A4.118 4.118 0 0 0 19.448 2.3a8.224 8.224 0 0 1-2.605.996A4.107 4.107 0 0 0 9.85 6.03a11.65 11.65 0 0 1-8.457-4.287a4.106 4.106 0 0 0 1.27 5.482A4.073 4.073 0 0 1 .8 6.575v.052a4.108 4.108 0 0 0 3.292 4.025a4.095 4.095 0 0 1-1.853.07a4.108 4.108 0 0 0 3.834 2.85A8.233 8.233 0 0 1 0 17.542a11.616 11.616 0 0 0 6.29 1.844c7.547 0 11.675-6.155 11.675-11.49c0-.175-.004-.349-.012-.522A8.18 8.18 0 0 0 20 3.924z"/></svg></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-orange-400 transition"><svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20"><path d="M16.5 3A2.5 2.5 0 0 1 19 5.5v9A2.5 2.5 0 0 1 16.5 17h-13A2.5 2.5 0 0 1 1 14.5v-9A2.5 2.5 0 0 1 3.5 3h13zm-8.25 12V8.75H5.25V15h3zm-1.5-7.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5zm9.25 7.25v-3.25c0-1.1-.9-2-2-2s-2 .9-2 2V15h3zm-1.5-7.25a1.25 1.25 0 1 0 0-2.5a1.25 1.25 0 0 0 0 2.5z"/></svg></a>
        </div>
      </div>
    </footer>
  );
}
