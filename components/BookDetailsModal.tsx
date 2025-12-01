import React, { useEffect, useState } from 'react';
import { X, Star, ShoppingBag, BookOpen, Quote } from 'lucide-react';
import { Book } from '../types';
import { explainBookVibe } from '../services/gemini';

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ book, onClose, onAddToCart }) => {
  const [vibe, setVibe] = useState<string>('');

  useEffect(() => {
    if (book) {
        setVibe('');
        explainBookVibe(book.title, book.author).then(setVibe);
    }
  }, [book]);

  if (!book) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row overflow-hidden">
        
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full backdrop-blur-md transition-all"
        >
            <X className="h-6 w-6 text-slate-800" />
        </button>

        {/* Left: Image */}
        <div className="w-full md:w-2/5 h-64 md:h-auto bg-slate-100 relative">
            <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-full h-full object-cover"
            />
        </div>

        {/* Right: Info */}
        <div className="flex-1 p-8 flex flex-col">
            <div className="mb-6">
                <div className="flex items-center space-x-2 text-novella-accent text-sm font-bold uppercase tracking-wider mb-2">
                    <span>{book.genre}</span>
                    <span>•</span>
                    <div className="flex items-center">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        {book.rating}
                    </div>
                </div>
                
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-slate-900 mb-2 leading-tight">
                    {book.title}
                </h2>
                <p className="text-lg text-slate-600 font-medium">by {book.author}</p>
            </div>

            {/* Generated Vibe Quote */}
            {vibe ? (
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100 mb-6 relative">
                    <Quote className="h-6 w-6 text-emerald-200 absolute top-2 left-2 -z-0" />
                    <p className="text-emerald-800 italic relative z-10 pl-6 text-sm md:text-base">"{vibe}"</p>
                </div>
            ) : (
                <div className="h-16 mb-6 animate-pulse bg-slate-50 rounded-lg"></div>
            )}

            <div className="prose prose-slate mb-8 flex-1 overflow-y-auto max-h-60 custom-scrollbar pr-2">
                <p className="text-slate-600 leading-relaxed">{book.description}</p>
            </div>

            <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-6">
                <div>
                    <span className="block text-sm text-slate-400">Price</span>
                    <span className="text-3xl font-serif font-bold text-slate-900">${book.price.toFixed(2)}</span>
                </div>
                
                <div className="flex space-x-3">
                    <button className="px-6 py-3 rounded-full border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors flex items-center">
                        <BookOpen className="h-5 w-5 mr-2" />
                        Preview
                    </button>
                    <button 
                        onClick={() => {
                            onAddToCart(book);
                            onClose();
                        }}
                        className="px-8 py-3 rounded-full bg-novella-dark text-white font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 flex items-center"
                    >
                        <ShoppingBag className="h-5 w-5 mr-2" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};