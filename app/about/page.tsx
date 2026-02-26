import ReactMarkdown from 'react-markdown'
import { getAboutPage } from '@/lib/cosmic'

export default async function AboutPageRoute() {
  const aboutPage = await getAboutPage()

  if (!aboutPage) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="dashboard-card p-12 text-center">
          <span className="text-4xl mb-4 block">📄</span>
          <h3 className="text-lg font-semibold text-gray-900">About page not found</h3>
          <p className="text-gray-500 mt-1">
            Create an About Page object in your Cosmic dashboard.
          </p>
        </div>
      </div>
    )
  }

  const heroImageUrl = aboutPage.metadata.hero_image?.imgix_url

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">About</h1>
        <p className="text-gray-500 mt-1">Your store information</p>
      </div>

      <div className="dashboard-card overflow-hidden">
        {heroImageUrl && (
          <div className="aspect-[21/9] bg-gray-100">
            <img
              src={`${heroImageUrl}?w=1400&h=600&fit=crop&auto=format,compress`}
              alt={aboutPage.metadata.heading}
              width={700}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {aboutPage.metadata.heading}
          </h2>

          {aboutPage.metadata.content && (
            <div className="prose prose-gray max-w-none prose-headings:font-bold prose-a:text-brand-600">
              <ReactMarkdown>{aboutPage.metadata.content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}