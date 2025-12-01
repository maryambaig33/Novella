import React from 'react';
import { ShoppingBag, Search, BookOpen, Heart } from 'lucide-react';
import { ViewState } from '../types';

interface NavbarProps {
  cartCount: number;
  setViewState: (view: ViewState) => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, setViewState, onOpenSearch }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div 
            className="flex items-center cursor-pointer group"
            onClick={() => setViewState(ViewState.HOME)}
          >
            <div className="bg-novella-green p-1.5 rounded-lg mr-2 group-hover:bg-novella-dark transition-colors">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
            <span className="font-serif text-2xl font-bold text-novella-dark tracking-tight">Novella</span>
          </div>

          {/* Center Search Trigger (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <button 
              onClick={onOpenSearch}
              className="w-full flex items-center bg-slate-100 hover:bg-slate-200 text-slate-500 px-4 py-2.5 rounded-full transition-all duration-200 border border-transparent focus:border-novella-green/50 outline-none"
            >
              <Search className="h-4 w-4 mr-3" />
              <span className="text-sm">Find your next favorite book...</span>
            </button>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
             <button className="p-2 text-slate-500 hover:text-novella-accent transition-colors hidden sm:block">
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
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-novella-accent rounded-full">
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