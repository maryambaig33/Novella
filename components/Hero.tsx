import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative overflow-hidden bg-novella-dark text-white pt-16 pb-24 sm:pt-24 sm:pb-32">
        {/* Abstract Background pattern */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
            <svg width="400" height="400" viewBox="0 0 100 100" className="fill-current text-white w-96 h-96">
                <circle cx="50" cy="50" r="40" />
            </svg>
        </div>
        
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-white/20 bg-white/5 px-3 py-1 text-sm font-medium text-white/80 backdrop-blur-xl mb-6">
          <Sparkles className="mr-2 h-4 w-4 text-yellow-400" />
          <span>AI-Powered Discovery Engine</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
          Read what matches <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
            your soul.
          </span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
          Stop scrolling through endless lists. Tell Novella how you want to feel, 
          and let our intelligent engine curate your perfect reading list instantly.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button 
            onClick={onExplore}
            className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full text-novella-dark bg-white hover:bg-emerald-50 transition-all duration-300 shadow-lg shadow-emerald-900/20"
          >
            Find My Next Read
            <ArrowRight className="ml-2 h-5 w-5" />
          </button>
          <button className="inline-flex items-center justify-center px-8 py-3.5 border border-slate-600 text-base font-medium rounded-full text-white hover:bg-white/10 transition-all duration-300">
            Browse Best Sellers
          </button>
        </div>
      </div>
    </div>
  );
};