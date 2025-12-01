export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  price: number;
  rating: number; // 0-5
  description: string;
  genre: string;
  isBestSeller?: boolean;
}

export interface CartItem extends Book {
  quantity: number;
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
