export interface Admin {
  id: string;
  email: string;
}

export interface Deal {
  id: string;
  title: string;
  slug: string;
  store: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage?: number;
  affiliateLink: string;
  imageUrl: string;
  description?: string;
  categoryId: string;
  isActive?: boolean;
  isTrending?: boolean;
  authorId: string;
  createdAt: number;
  updatedAt: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Coupon {
  id: string;
  store: string;
  code: string;
  description: string;
  expiryDate?: number;
  isActive?: boolean;
  authorId: string;
  createdAt: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  imageUrl?: string;
  authorId: string;
  createdAt: number;
  updatedAt: number;
}
