// src/app/layout.tsx
import { Inter } from 'next/font/google';
import { CartProvider } from '../../context/CartContext';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'E-Commerce',
  description: 'Simple e-commerce app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/*  Add Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>

      <body className={inter.className}>
        <CartProvider>
          {/* Navigation bar */}
          <nav className="bg-white border-b shadow sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-8 text-gray-700 font-medium text-base">
                <Link href="/" className="hover:text-blue-600 transition flex items-center gap-1">
                  🏠 <span>Products</span>
                </Link>
                <Link href="/cart" className="hover:text-blue-600 transition flex items-center gap-1">
                  🛒 <span>Cart</span>
                </Link>
                <Link href="/orders" className="hover:text-blue-600 transition flex items-center gap-1">
                  📜 <span>Orders</span>
                </Link>
              </div>
              <span className="text-sm text-gray-400 hidden sm:inline">Owend By Rushikesh Patil</span>
            </div>
          </nav>

          {/*  Page content */}
          <main className="p-6">{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
