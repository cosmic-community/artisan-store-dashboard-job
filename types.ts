// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type?: string;
  created_at?: string;
  modified_at?: string;
}

// File/Image metafield
export interface CosmicImage {
  url: string;
  imgix_url: string;
}

// Product
export interface Product extends CosmicObject {
  metadata: {
    name: string;
    description?: string;
    price: number;
    image?: CosmicImage;
    collection?: Collection;
    in_stock: boolean;
  };
}

// Collection
export interface Collection extends CosmicObject {
  metadata: {
    name: string;
    description?: string;
    image?: CosmicImage;
  };
}

// Review rating select-dropdown
export interface RatingOption {
  key: string;
  value: string;
}

// Review
export interface Review extends CosmicObject {
  metadata: {
    product?: Product;
    reviewer_name: string;
    rating: RatingOption;
    comment?: string;
  };
}

// Author
export interface Author extends CosmicObject {
  metadata: {
    name: string;
    bio?: string;
    avatar?: CosmicImage;
  };
}

// Category
export interface Category extends CosmicObject {
  metadata: {
    name: string;
    description?: string;
  };
}

// Post
export interface Post extends CosmicObject {
  metadata: {
    content: string;
    featured_image?: CosmicImage;
    author?: Author;
    category?: Category;
  };
}

// About Page (singleton)
export interface AboutPage extends CosmicObject {
  metadata: {
    heading: string;
    content?: string;
    hero_image?: CosmicImage;
  };
}

// API response
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
}