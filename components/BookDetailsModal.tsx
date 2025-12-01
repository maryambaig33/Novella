import React, { useEffect, useState } from 'react';
import { X, Star, ShoppingBag, Quote, CheckCircle2 } from 'lucide-react';
import { Book } from '../types';
import { explainBookVibe } from '../services/gemini';

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
}

// Helper component for the checkmark - defined before usage
const CheckCircle = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);

export const BookDetailsModal: React.FC<BookDetailsModalProps> = ({ book, onClose, onAddToCart }) => {
  const [vibe, setVibe] = useState<string>('');

  useEffect(() => {
    if (book) {
        setVibe('');
        explainBookVibe(book.title, book.author).then(setVibe);
    }
  }, [book]);

  if (!book) return null;

  // Mock available copies logic
  const conditions = [
    { type: 'New', price: book.originalPrice, desc: 'Brand new, never read.' },
    { type: 'Like New', price: book.originalPrice * 0.8, desc: 'Used. No visible wear.' },
    { type: 'Very Good', price: book.originalPrice * 0.6, desc: 'Used. Minimal wear.' },
    { type: 'Good', price: book.originalPrice * 0.45, desc: 'Used. Spine creases, wear.' },
  ].filter(c => c.price >= book.price); // Filter to make sure the "main" price is the lowest or logical

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      <div className="relative bg-white rounded-lg shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row">
        
        <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full text-slate-500 hover:text-slate-800 transition-all"
        >
            <X className="h-6 w-6" />
        </button>

        {/* Left: Image & Vibe */}
        <div className="w-full md:w-1/3 bg-slate-50 p-6 flex flex-col items-center border-r border-slate-100 overflow-y-auto">
            <img 
                src={book.coverUrl} 
                alt={book.title} 
                className="w-48 shadow-lg rounded mb-6"
            />
            
            {/* Vibe Section */}
            <div className="w-full bg-white p-4 rounded-lg border border-emerald-100 shadow-sm">
                 <h4 className="text-xs font-bold text-emerald-600 uppercase mb-2 flex items-center">
                    <Quote className="h-3 w-3 mr-1" />
                    Novella AI Vibe Check
                 </h4>
                {vibe ? (
                    <p className="text-slate-700 italic text-sm leading-relaxed">"{vibe}"</p>
                ) : (
                    <div className="h-10 animate-pulse bg-slate-100 rounded"></div>
                )}
            </div>
            
            <div className="mt-6 w-full">
                <h4 className="font-bold text-slate-800 mb-2">Details</h4>
                <div className="text-sm text-slate-600 space-y-1">
                    <div className="flex justify-between"><span>ISBN:</span> <span>978-0583920</span></div>
                    <div className="flex justify-between"><span>Format:</span> <span>Paperback</span></div>
                    <div className="flex justify-between"><span>Publisher:</span> <span>Penguin</span></div>
                </div>
            </div>
        </div>

        {/* Right: Info & Buying Options */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
            <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="mb-1 text-sm font-semibold text-novella-accent uppercase tracking-wider">
                    {book.genre}
                </div>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mb-2">
                    {book.title}
                </h2>
                <div className="flex items-center space-x-4 mb-6">
                    <span className="text-lg text-slate-600">by <span className="underline decoration-slate-300">{book.author}</span></span>
                    <div className="flex items-center text-yellow-400 bg-yellow-50 px-2 py-0.5 rounded-full">
                        <Star className="h-4 w-4 fill-current mr-1" />
                        <span className="text-sm font-bold text-slate-700">{book.rating}</span>
                    </div>
                </div>

                <div className="prose prose-slate prose-sm mb-8">
                    <p>{book.description}</p>
                </div>

                {/* Copies Section (ThriftBooks style) */}
                <h3 className="font-bold text-lg text-slate-800 mb-4 flex items-center">
                    Select a Copy
                    <span className="ml-2 text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">3 Available</span>
                </h3>
                
                <div className="space-y-3">
                    {/* The specific copy user clicked */}
                    <div className="flex items-center justify-between p-4 rounded-lg border-2 border-novella-green bg-emerald-50/30">
                        <div className="flex items-start gap-3">
                            <div className="mt-1">
                                <CheckCircle className="h-5 w-5 text-novella-green" />
                            </div>
                            <div>
                                <div className="font-bold text-slate-900">{book.condition}</div>
                                <div className="text-xs text-slate-500">Ships from Novella Warehouse</div>
                            </div>
                        </div>
                        <div className="text-right">
                             <div className="text-xl font-bold text-novella-green">${book.price.toFixed(2)}</div>
                             <div className="text-xs text-novella-accent font-bold">+{book.points} pts</div>
                        </div>
                    </div>

                    {/* Other Mock Conditions */}
                    {conditions.map((c, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors opacity-70 hover:opacity-100">
                             <div>
                                <div className="font-bold text-slate-700">{c.type}</div>
                                <div className="text-xs text-slate-500">{c.desc}</div>
                            </div>
                            <div className="text-right">
                                <div className="font-bold text-slate-700">${c.price.toFixed(2)}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div>
                    <span className="text-xs text-slate-500 block">Total</span>
                    <span className="text-2xl font-bold text-slate-900">${book.price.toFixed(2)}</span>
                </div>
                <button 
                    onClick={() => {
                        onAddToCart(book);
                        onClose();
                    }}
                    className="px-8 py-3 rounded bg-novella-red text-white font-bold hover:bg-red-600 transition-colors shadow-lg shadow-red-900/20 flex items-center"
                >
                    <ShoppingBag className="h-5 w-5 mr-2" />
                    Add to Cart
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};