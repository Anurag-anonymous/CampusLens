import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="mt-12 border-t border-gray-200 bg-gray-900 text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2 text-lg font-bold text-white">
              <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-sm text-white">
                C
              </div>
              CampusLens
            </div>
            <p className="text-sm">
              Discover your perfect college with comprehensive data and comparisons.
            </p>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Features</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition hover:text-white">Browse Colleges</a></li>
              <li><a href="#" className="transition hover:text-white">Compare Colleges</a></li>
              <li><a href="#" className="transition hover:text-white">Save Favorites</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="transition hover:text-white">About Us</Link></li>
              <li><a href="#" className="transition hover:text-white">Contact</a></li>
              <li><a href="#" className="transition hover:text-white">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 font-semibold text-white">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="transition hover:text-white">Privacy</a></li>
              <li><a href="#" className="transition hover:text-white">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>© 2024 CampusLens. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
