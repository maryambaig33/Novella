import React from 'react';
import { ArrowRight, Sparkles, Tag } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative overflow-hidden bg-novella-dark text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
        {/* Abstract Background pattern */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
            <svg width="400" height="400" viewBox="0 0 100 100" className="fill-current text-white w-96 h-96">
                <circle cx="50" cy="50" r="40" />
            </svg>
        </div>
        
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/90 backdrop-blur-xl mb-8">
          <Tag className="mr-2 h-4 w-4 text-novella-red" />
          <span>Over 1 Million Used Books in Stock</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Spend less. <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            Read more.
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed font-light">
          Discover your next favorite story at unbeatable prices. From rare collectibles to everyday reads, 
          let our AI help you find the hidden gems on our shelves.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <button 
            onClick={onExplore}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-bold rounded-full text-white bg-novella-green hover:bg-emerald-600 transition-all duration-300 shadow-lg shadow-emerald-900/30"
          >
            <Sparkles className="mr-2 h-5 w-5" />
            Find Me a Book
          </button>
          <button className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-600 text-base font-medium rounded-full text-white hover:bg-white/10 transition-all duration-300">
            Browse Best Sellers
          </button>
        </div>
        
        <div className="mt-12 flex items-center space-x-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Trust indicators/Logos could go here */}
             <div className="text-xs font-bold tracking-widest uppercase">Trusted by 1M+ Readers</div>
        </div>
      </div>
    </div>
  );
};