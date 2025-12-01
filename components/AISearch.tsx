import React, { useState, useEffect } from 'react';
import { X, Sparkles, Search, Loader2 } from 'lucide-react';
import { Book, LoadingState } from '../types';
import { getBookRecommendations } from '../services/gemini';
import { BookCard } from './BookCard';

interface AISearchProps {
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (book: Book) => void;
  onSelectBook: (book: Book) => void;
}

export const AISearch: React.FC<AISearchProps> = ({ isOpen, onClose, onAddToCart, onSelectBook }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState<LoadingState>({ status: 'idle' });

  // Reset when closed
  useEffect(() => {
    if (!isOpen) {
      setResults([]);
      setQuery('');
      setLoading({ status: 'idle' });
    }
  }, [isOpen]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading({ status: 'loading' });
    setResults([]);

    const books = await getBookRecommendations(query);
    
    if (books.length > 0) {
        setResults(books);
        setLoading({ status: 'success' });
    } else {
        setLoading({ status: 'error', message: "We couldn't find any specific matches. Try a different description." });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center space-x-2 text-novella-green">
            <Sparkles className="h-5 w-5" />
            <span className="font-serif font-bold text-lg">Novella AI</span>
        </div>
        <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all"
        >
            <X className="h-6 w-6" />
        </button>
      </div>

      {/* Search Input Section */}
      <div className="flex-none px-6 py-8 md:py-12 bg-slate-50 border-b border-slate-100">
        <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-serif font-bold text-slate-800 mb-3">Describe what you're craving</h2>
            <p className="text-slate-500 mb-6">"A mystery set in Victorian London," "Sci-fi that makes me optimistic," or "A cookbook for spicy food."</p>
            
            <form onSubmit={handleSearch} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your reading wish here..."
                    className="w-full pl-6 pr-14 py-4 text-lg rounded-full border border-slate-200 shadow-sm focus:border-novella-green focus:ring-2 focus:ring-novella-green/20 outline-none transition-all"
                    autoFocus
                />
                <button 
                    type="submit"
                    disabled={loading.status === 'loading'}
                    className="absolute right-2 top-2 p-2 bg-novella-green text-white rounded-full hover:bg-emerald-700 disabled:bg-emerald-300 transition-colors"
                >
                    {loading.status === 'loading' ? <Loader2 className="h-6 w-6 animate-spin" /> : <Search className="h-6 w-6" />}
                </button>
            </form>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto bg-white p-6">
        <div className="max-w-7xl mx-auto">
            {loading.status === 'loading' && (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400">
                    <Loader2 className="h-10 w-10 animate-spin mb-4 text-novella-green" />
                    <p className="animate-pulse">Consulting the literary archives...</p>
                </div>
            )}

            {loading.status === 'error' && (
                <div className="text-center py-20">
                    <p className="text-red-500 mb-2">{loading.message}</p>
                </div>
            )}

            {loading.status === 'success' && results.length === 0 && (
                <div className="text-center py-20 text-slate-500">
                    No results found.
                </div>
            )}

            {results.length > 0 && (
                <div>
                     <h3 className="text-lg font-semibold text-slate-700 mb-6">Recommended for you</h3>
                     <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                        {results.map(book => (
                            <BookCard 
                                key={book.id} 
                                book={book} 
                                onAddToCart={onAddToCart}
                                onSelect={onSelectBook}
                            />
                        ))}
                    </div>
                </div>
            )}
            
            {loading.status === 'idle' && (
                 <div className="text-center py-20 opacity-50">
                    <div className="inline-block p-4 bg-slate-50 rounded-full mb-4">
                        <Sparkles className="h-8 w-8 text-novella-green" />
                    </div>
                    <p className="text-slate-500">Enter a prompt to start exploring</p>
                 </div>
            )}
        </div>
      </div>
    </div>
  );
};