import React, { useState } from 'react';
import { Book, CartItem, ViewState } from './types';
import { MOCK_BOOKS, CATEGORIES } from './constants';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BookCard } from './components/BookCard';
import { AISearch } from './components/AISearch';
import { BookDetailsModal } from './components/BookDetailsModal';
import { Trash2, ChevronRight, ArrowLeft, ShoppingBag, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  const [viewState, setViewState] = useState<ViewState>(ViewState.HOME);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Filter books based on category
  const filteredBooks = React.useMemo(() => {
    if (activeCategory === 'All') return MOCK_BOOKS;
    if (activeCategory === 'Thrift Deals') return MOCK_BOOKS.filter(b => (b.originalPrice - b.price) / b.originalPrice > 0.5);
    return MOCK_BOOKS.filter(b => b.genre.includes(activeCategory) || (activeCategory === 'Fiction' && b.genre === 'Historical Fiction'));
  }, [activeCategory]);

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
  const potentialSavings = cart.reduce((sum, item) => sum + ((item.originalPrice - item.price) * item.quantity), 0);
  const totalPoints = cart.reduce((sum, item) => sum + (item.points * item.quantity), 0);

  return (
    <div className="min-h-screen bg-novella-cream font-sans">
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
                className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${activeCategory === 'All' ? 'bg-novella-dark text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'}`}
              >
                All Books
              </button>
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full whitespace-nowrap text-sm font-bold transition-colors ${
                      activeCategory === cat 
                      ? 'bg-novella-dark text-white' 
                      : cat === 'Thrift Deals' ? 'bg-novella-red text-white hover:bg-red-600' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4">
                <h2 className="text-2xl font-serif font-bold text-slate-800">
                    {activeCategory === 'All' ? 'Fresh Arrivals' : `${activeCategory}`}
                </h2>
                <button className="text-novella-green hover:text-emerald-700 text-sm font-bold flex items-center">
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
            <div className="mt-20 relative rounded-xl overflow-hidden bg-emerald-900 h-72 flex items-center px-6 md:px-12 shadow-2xl">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')] bg-cover bg-center mix-blend-overlay"></div>
                <div className="relative z-10 max-w-lg">
                    <div className="inline-block bg-novella-accent text-white text-[10px] font-bold px-2 py-1 uppercase tracking-wider rounded mb-4">
                        ReadingRewards
                    </div>
                    <h3 className="font-serif text-3xl md:text-4xl text-white font-bold mb-4">Read More, Earn More.</h3>
                    <p className="text-emerald-100 mb-8 font-medium">Earn 8 points for every dollar you spend. Redeem points for free books. It's that simple.</p>
                    <button className="bg-white text-emerald-900 px-8 py-3 rounded-full font-bold hover:bg-emerald-50 transition-colors">
                        Join for Free
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
            className="flex items-center text-slate-500 hover:text-novella-dark mb-8 transition-colors font-medium"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Continue Shopping
          </button>
          
          <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8">Shopping Cart</h2>
          
          {cart.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-xl border border-slate-200 border-dashed">
              <ShoppingBag className="h-16 w-16 text-slate-200 mx-auto mb-4" />
              <p className="text-lg text-slate-500 mb-6">Your cart is currently empty.</p>
              <button 
                onClick={() => setViewState(ViewState.HOME)}
                className="bg-novella-green text-white px-6 py-2 rounded-full font-bold hover:bg-emerald-700 transition-colors"
              >
                Find Used Books
              </button>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items */}
                <div className="flex-1">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="divide-y divide-slate-100">
                        {cart.map(item => (
                        <div key={item.id} className="p-6 flex items-start gap-4 sm:gap-6">
                            <img src={item.coverUrl} alt={item.title} className="h-28 w-20 object-cover rounded shadow-sm flex-shrink-0" />
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                    <h3 className="font-bold text-slate-800 text-lg truncate pr-4">{item.title}</h3>
                                    <div className="font-bold text-slate-900 text-lg">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                                <p className="text-sm text-slate-500 mb-1">{item.author}</p>
                                <p className="text-xs text-emerald-600 font-bold mb-3">{item.condition} Condition</p>
                                
                                <div className="flex items-center justify-between mt-2">
                                    <div className="flex items-center border border-slate-200 rounded">
                                        <button className="px-3 py-1 text-slate-500 hover:bg-slate-50">-</button>
                                        <span className="px-3 py-1 text-sm font-medium border-x border-slate-200">{item.quantity}</span>
                                        <button className="px-3 py-1 text-slate-500 hover:bg-slate-50" onClick={() => handleAddToCart(item)}>+</button>
                                    </div>
                                    <button 
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-slate-400 hover:text-red-500 text-sm flex items-center transition-colors"
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Summary */}
                <div className="lg:w-80">
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 sticky top-24">
                        <h3 className="font-bold text-slate-800 mb-4 text-lg">Order Summary</h3>
                        
                        <div className="space-y-3 mb-6 pb-6 border-b border-slate-100 text-sm">
                            <div className="flex justify-between text-slate-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-slate-600">
                                <span>Shipping</span>
                                <span className="text-emerald-600 font-medium">FREE</span>
                            </div>
                             {potentialSavings > 0 && (
                                <div className="flex justify-between text-novella-red font-bold">
                                    <span>You Saved</span>
                                    <span>-${potentialSavings.toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-between items-center mb-6">
                            <span className="text-lg font-bold text-slate-900">Total</span>
                            <span className="text-2xl font-serif font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                        </div>

                        {totalPoints > 0 && (
                             <div className="mb-6 bg-yellow-50 p-3 rounded-lg border border-yellow-100 flex items-start gap-3">
                                <ShieldCheck className="h-5 w-5 text-novella-accent flex-shrink-0" />
                                <div className="text-xs text-yellow-800">
                                    You will earn <span className="font-bold">{totalPoints} points</span> with this order!
                                </div>
                             </div>
                        )}

                        <button 
                            className="w-full bg-novella-green text-white py-4 rounded-full font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-900/10 mb-4"
                            onClick={() => alert("Checkout functionality is a mock!")}
                        >
                            Checkout
                        </button>
                        
                        <div className="text-center">
                            <span className="text-xs text-slate-400">Secure Checkout powered by Stripe</span>
                        </div>
                    </div>
                </div>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="font-serif text-2xl text-white mb-4">Novella</p>
            <p className="text-sm text-slate-500 mb-8 max-w-md mx-auto">The best place to buy cheap used books online. High quality, huge selection, free shipping over $15.</p>
            <div className="flex justify-center space-x-6 mb-8 text-sm font-medium">
                <a href="#" className="hover:text-white transition-colors">Our Story</a>
                <a href="#" className="hover:text-white transition-colors">ReadingRewards</a>
                <a href="#" className="hover:text-white transition-colors">Wholesale</a>
                <a href="#" className="hover:text-white transition-colors">Help</a>
            </div>
            <p className="text-xs">&copy; 2024 Novella Books. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;