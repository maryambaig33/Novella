import React from 'react';
import { ShoppingBag, Search, BookOpen, Heart, Gift } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  setViewState: (view: ViewState) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, setViewState, onOpenSearch }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      {/* Top Banner for Rewards/Free Shipping like ThriftBooks */}
      <div className="bg-novella-dark text-white text-xs py-1.5 px-4 text-center">
        <span className="font-semibold">FREE SHIPPING</span> on US orders over $15! • Join <span className="text-yellow-400 font-bold">ReadingRewards</span> to earn free books.
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group flex-shrink-0"
            onClick={() => setViewState(ViewState.HOME)}
          >
            <div className="bg-novella-green p-1.5 rounded-lg mr-2 group-hover:bg-emerald-700 transition-colors">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-novella-dark tracking-tight leading-none">Novella</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold">Thrift & New</span>
            </div>
          </div>

          {/* Center Search Trigger (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="w-full relative group">
                <input 
                    type="text" 
                    readOnly
                    onClick={onOpenSearch}
                    placeholder="Search by Title, Author, ISBN or Keyword..."
                    className="w-full bg-slate-100 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-l-full border border-r-0 border-slate-300 focus:border-novella-green focus:ring-0 outline-none cursor-text transition-all"
                />
                <button 
                    onClick={onOpenSearch}
                    className="absolute right-0 top-0 h-full bg-novella-green text-white px-6 rounded-r-full hover:bg-emerald-700 transition-colors"
                >
                    <Search className="h-5 w-5" />
                </button>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-2 sm:space-x-6">
             <div className="hidden lg:flex flex-col items-end text-xs text-slate-600 mr-2 cursor-pointer hover:text-novella-green">
                <span className="flex items-center font-bold text-novella-accent">
                    <Gift className="h-3 w-3 mr-1" />
                    ReadingRewards
                </span>
                <span>0 Points</span>
             </div>

             <button className="p-2 text-slate-500 hover:text-novella-red transition-colors hidden sm:block">
              <Heart className="h-6 w-6" />
            </button>

            <button 
                onClick={onOpenSearch}
                className="p-2 text-slate-500 hover:text-novella-green md:hidden"
            >
              <Search className="h-6 w-6" />
            </button>

            <div 
              className="relative p-2 text-slate-500 hover:text-novella-green cursor-pointer transition-colors"
              onClick={() => setViewState(ViewState.CART)}
            >
              <ShoppingBag className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-novella-red rounded-full shadow-sm">
                  {cartCount}
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};