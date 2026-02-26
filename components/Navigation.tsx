'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  { href: '/', label: 'Dashboard', icon: '📊' },
  { href: '/products', label: 'Products', icon: '🛍️' },
  { href: '/collections', label: 'Collections', icon: '🗂️' },
  { href: '/reviews', label: 'Reviews', icon: '⭐' },
  { href: '/posts', label: 'Posts', icon: '📝' },
  { href: '/about', label: 'About', icon: '📄' },
]

export default function Navigation() {
  const pathname = usePathname()

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 flex flex-col z-40">
      <div className="p-6 border-b border-gray-100">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg font-bold">A</span>
          </div>
          <div>
            <h1 className="text-base font-bold text-gray-900">Artisan Store</h1>
            <p className="text-xs text-gray-500">Content Dashboard</p>
          </div>
        </Link>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-150 ${
              isActive(item.href)
                ? 'bg-brand-50 text-brand-700'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="px-4 py-3 bg-gray-50 rounded-lg">
          <p className="text-xs text-gray-500 font-medium">Powered by</p>
          <p className="text-sm font-semibold text-gray-700">Cosmic CMS</p>
        </div>
      </div>
    </aside>
  )
}