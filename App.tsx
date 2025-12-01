import React, { useState, useEffect } from 'react';
import { Book, CartItem, ViewState } from './types';
import { MOCK_BOOKS, CATEGORIES } from './constants';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookCard } from './components/BookCard';
import { AISearch } from './components/AISearch';
import { BookDetailsModal } from './components/BookDetailsModal';
import { Trash2, ChevronRight, ArrowLeft, ShoppingBag } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter books based on category
  const filteredBooks = activeCategory === 'All' 
    ? MOCK_BOOKS 
    : MOCK_BOOKS.filter(b => b.genre.includes(activeCategory) || (activeCategory === 'Fiction' && b.genre === 'Historical Fiction')); 
    // Simplified category logic for mock data

  const handleAddToCart = (book: Book) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item => item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-novella-cream">
      <Navbar 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        setViewState={setViewState}
        onOpenSearch={() => setIsSearchOpen(true)}
      />

      <AISearch 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onAddToCart={(book) => {
            handleAddToCart(book);
            setIsSearchOpen(false);
        }}
        onSelectBook={(book) => {
            setSelectedBook(book);
            // Keep search open? Maybe better to close search if we open details, 
            // but details is a modal on top, so search can stay in bg.
            // Let's keep search open in background for better UX if they cancel details.
        }}
      />

      <BookDetailsModal 
        book={selectedBook} 
        onClose={() => setSelectedBook(null)} 
        onAddToCart={handleAddToCart}
      />

      {viewState === ViewState.HOME && (
        <main>
          <Hero onExplore={() => setIsSearchOpen(true)} />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            
            {/* Categories */}
            <div className="flex overflow-x-auto pb-4 mb-8 space-x-2 no-scrollbar">
              <button
                onClick={() => setActiveCategory('All')}
                className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === 'All' ? 'bg-novella-dark text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                All Books
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${activeCategory === cat ? 'bg-novella-dark text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-slate-800">
                    {activeCategory === 'All' ? 'Curated Selection' : `${activeCategory} Collection`}
                </h2>
                <button className="text-novella-green hover:text-emerald-700 text-sm font-medium flex items-center">
                    View all <ChevronRight className="h-4 w-4 ml-1" />
                </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6">
              {filteredBooks.map(book => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onSelect={setSelectedBook}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>

            {/* Banner Section */}
            <div className="mt-24 relative rounded-2xl overflow-hidden bg-slate-900 h-80 flex items-center px-6 md:px-12">
                <img 
                    src="https://images.unsplash.com/photo-1507842217121-9eac83eeb0e0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" 
                    alt="Library" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="relative z-10 max-w-lg">
                    <h3 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">Build Your Dream Library</h3>
                    <p className="text-slate-300 mb-6">Join our membership program for free shipping, exclusive deals, and early access to signed editions.</p>
                    <button className="bg-white text-novella-dark px-6 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors">
                        Join Novella+
                    </button>
                </div>
            </div>

          </div>
        </main>
      )}

      {viewState === ViewState.CART && (
        <div className="max-w-4xl mx-auto px-4 py-12 min-h-[80vh]">
          <button 
            onClick={() => setViewState(ViewState.HOME)}
            className="flex items-center text-slate-500 hover:text-novella-dark mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </button>
          
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Your Cart</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-xl border border-slate-100">
              <ShoppingBag className="h-16 w-16 text-slate-200 mx-auto mb-4" />
              <p className="text-lg text-slate-500 mb-4">Your cart is empty.</p>
              <button 
                onClick={() => setViewState(ViewState.HOME)}
                className="text-novella-green font-medium hover:underline"
              >
                Browse books
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <div className="divide-y divide-slate-100">
                {cart.map(item => (
                  <div key={item.id} className="p-6 flex items-center gap-6">
                    <img src={item.coverUrl} alt={item.title} className="h-24 w-16 object-cover rounded shadow-sm" />
                    <div className="flex-1">
                      <h3 className="font-bold text-slate-800">{item.title}</h3>
                      <p className="text-sm text-slate-500">{item.author}</p>
                      <div className="mt-1 text-xs bg-slate-100 inline-block px-2 py-1 rounded text-slate-600">
                        Qty: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900">${(item.price * item.quantity).toFixed(2)}</div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 mt-2 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-50 p-6 flex justify-between items-center border-t border-slate-100">
                <span className="text-lg text-slate-600">Total</span>
                <span className="text-2xl font-serif font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="p-6 flex justify-end">
                <button 
                    className="bg-novella-dark text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10"
                    onClick={() => alert("Checkout functionality is a mock!")}
                >
                    Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-serif text-2xl text-white mb-4">Novella</p>
            <div className="flex justify-center space-x-6 mb-8 text-sm">
                <a href="#" className="hover:text-white transition-colors">About</a>
                <a href="#" className="hover:text-white transition-colors">Careers</a>
                <a href="#" className="hover:text-white transition-colors">Press</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
            <p className="text-xs">&copy; 2024 Novella Books. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;