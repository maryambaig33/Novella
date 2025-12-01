import React from 'react';
import { Star, Plus, CheckCircle2 } from 'lucide-react';
import { Book } from '../types';

interface BookCardProps {
  book: Book;
  onSelect: (book: Book) => void;
  onAddToCart: (book: Book) => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onSelect, onAddToCart }) => {
  const discountPercent = Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100);
  
  const getConditionColor = (c: string) => {
    switch(c) {
        case 'New': return 'bg-blue-100 text-blue-700';
        case 'Like New': return 'bg-emerald-100 text-emerald-700';
        default: return 'bg-slate-100 text-slate-600';
    }
  };

  return (
    <div className="group relative flex flex-col bg-white rounded-lg hover:shadow-xl transition-all duration-300 border border-slate-200 overflow-hidden h-full">
      {/* Image Container */}
      <div 
        className="relative aspect-[2/3] overflow-hidden cursor-pointer bg-slate-100 p-4 flex items-center justify-center"
        onClick={() => onSelect(book)}
      >
        <img 
          src={book.coverUrl} 
          alt={book.title} 
          className="h-full w-auto object-contain shadow-md transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {discountPercent > 0 && (
            <div className="absolute top-0 left-0 bg-novella-red text-white text-xs font-bold px-2 py-1 rounded-br-lg shadow-sm">
                SAVE {discountPercent}%
            </div>
        )}
        
        {/* Quick Add Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3">
        <div className="mb-1 flex items-center justify-between">
            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wide ${getConditionColor(book.condition)}`}>
                {book.condition}
            </span>
            <div className="flex items-center text-yellow-400">
                <Star className="h-3 w-3 fill-current" />
                <span className="ml-0.5 text-xs font-medium text-slate-500">{book.rating}</span>
            </div>
        </div>
        
        <h3 
            className="font-bold text-base text-slate-900 leading-tight mb-1 line-clamp-2 cursor-pointer hover:underline decoration-novella-green"
            onClick={() => onSelect(book)}
        >
          {book.title}
        </h3>
        <p className="text-xs text-slate-500 mb-2">by {book.author}</p>
        
        <div className="mt-auto">
             <div className="flex items-baseline space-x-2">
                <span className="font-bold text-lg text-slate-900">${book.price.toFixed(2)}</span>
                {discountPercent > 0 && (
                    <span className="text-xs text-slate-400 line-through">${book.originalPrice.toFixed(2)}</span>
                )}
             </div>
             
             <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-novella-accent font-semibold flex items-center">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Earn {book.points} pts
                </span>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToCart(book);
                    }}
                    className="p-1.5 rounded bg-novella-green text-white hover:bg-emerald-700 transition-colors flex items-center text-xs font-bold px-3"
                >
                    <Plus className="h-3 w-3 mr-1" />
                    ADD
                </button>
             </div>
        </div>
      </div>
    </div>
  );
};