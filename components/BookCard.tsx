import React from 'react';
import { Star, Plus } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onSelect, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden h-full">
      {/* Image Container */}
      <div 
        className="relative aspect-[2/3] overflow-hidden cursor-pointer bg-slate-200"
        onClick={() => onSelect(book)}
      >
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {book.isBestSeller && (
            <div className="absolute top-2 left-2 bg-novella-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded-sm shadow-sm">
                Bestseller
            </div>
        )}
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    onSelect(book);
                }}
                className="bg-white text-novella-dark px-4 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
            >
                View Details
            </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <div className="mb-1 flex items-center text-yellow-400">
            <Star className="h-3 w-3 fill-current" />
            <span className="ml-1 text-xs font-medium text-slate-500">{book.rating}</span>
        </div>
        
        <h3 
            className="font-serif font-bold text-lg text-slate-800 leading-snug mb-1 line-clamp-2 cursor-pointer hover:text-novella-green transition-colors"
            onClick={() => onSelect(book)}
        >
          {book.title}
        </h3>
        <p className="text-sm text-slate-500 mb-2">{book.author}</p>
        
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-50">
          <span className="font-bold text-slate-900">${book.price.toFixed(2)}</span>
          <button 
            onClick={(e) => {
                e.stopPropagation();
                onAddToCart(book);
            }}
            className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-novella-green hover:text-white transition-colors"
            aria-label="Add to cart"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};