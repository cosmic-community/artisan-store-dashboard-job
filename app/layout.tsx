import type { Metadata } from 'next'
import Navigation from '@/components/Navigation'
import CosmicBadge from '@/components/CosmicBadge'
import './globals.css'

export const metadata: Metadata = {
  title: 'Artisan Store Dashboard',
  description: 'Manage your artisan e-commerce store content with Cosmic CMS',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className="font-sans">
        <div className="min-h-screen flex">
          <Navigation />
          <main className="flex-1 ml-64">
            <div className="p-8">{children}</div>
          </main>
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  )
}