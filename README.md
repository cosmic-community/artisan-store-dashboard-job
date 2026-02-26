# Artisan Store Dashboard

![Artisan Store Dashboard](https://imgix.cosmicjs.com/2321d9e0-12ce-11f1-87b4-a3b1ac0874fc-photo-1616046229478-9901c5536a45-1772081198175.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A comprehensive content management dashboard built with Next.js 16 and Cosmic. Browse and manage your artisan e-commerce store's products, collections, customer reviews, and blog posts from a beautifully designed interface.

## Features

- 📊 **Dashboard Overview** — At-a-glance statistics for all content types
- 🛍️ **Product Management** — Browse products with pricing, stock status, and collection details
- 🗂️ **Collection Browser** — Navigate curated product collections with hero imagery
- ⭐ **Review Tracker** — Monitor customer reviews with star ratings linked to products
- 📝 **Blog Manager** — Browse posts with author avatars and category badges
- 📄 **About Page** — View your store's about content with markdown rendering
- 🔗 **Deep Navigation** — Click through from any card to detailed individual views
- 📱 **Fully Responsive** — Works beautifully on mobile, tablet, and desktop
- ⚡ **Server-Side Rendered** — Lightning-fast loads with Next.js server components

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=699f8edaf276ae650676d539&clone_repository=699fdbebf276ae650676d5f7)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Design a content model for an e-commerce store with products, collections, and customer reviews"

### Code Generation Prompt

> "Create a React dashboard that displays and manages my existing content"

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS
- [react-markdown](https://github.com/remarkjs/react-markdown) — Markdown rendering

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) runtime installed
- A [Cosmic](https://www.cosmicjs.com) account with the e-commerce content model

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd artisan-store-dashboard

# Install dependencies
bun install

# Set up environment variables
# Add COSMIC_BUCKET_SLUG, COSMIC_READ_KEY, and COSMIC_WRITE_KEY to your environment

# Run the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

## Cosmic SDK Examples

### Fetching Products with Collection Data

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Reviews with Product Data

```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This dashboard connects to the following Cosmic object types:

| Object Type | Fields | Usage |
|---|---|---|
| **Products** | name, description, price, image, collection, in_stock | Product catalog |
| **Collections** | name, description, image | Product grouping |
| **Reviews** | product, reviewer_name, rating, comment | Customer feedback |
| **Posts** | content, featured_image, author, category | Blog content |
| **Authors** | name, bio, avatar | Post attribution |
| **Categories** | name, description | Post categorization |
| **About Page** | heading, content, hero_image | Store info (singleton) |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import in [Netlify](https://netlify.com)
3. Set build command to `bun run build` and publish directory to `.next`
4. Add environment variables and deploy

<!-- README_END -->