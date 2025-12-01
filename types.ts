export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  price: number;
  originalPrice: number;
  rating: number; // 0-5
  description: string;
  genre: string;
  condition: 'New' | 'Like New' | 'Very Good' | 'Good' | 'Acceptable';
  points: number;
  isBestSeller?: boolean;
}

export interface CartItem extends Book {
  quantity: number;
  selectedCondition?: string; // If we allow mixing conditions in cart in future
}

export enum ViewState {
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  CART = 'CART'
}

export interface AIRecommendationRequest {
  query: string;
  mood?: string;
}

export interface LoadingState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}