'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'

// Define type for translations
interface AnnouncementBarProps {
  translations?: {
    preorderMessage: string;
  };
  position?: 'top' | 'bottom';
}

export default function AnnouncementBar({ translations, position = 'top' }: AnnouncementBarProps) {
  const params = useParams();
  const locale = params?.locale || 'nl';
  
  // Default translations (fallback to Dutch if no translations provided)
  const t = translations || {
    preorderMessage: "Pre-order nu! We gaan live binnen 4 weken."
  };
  
  // State to track if the announcement is visible
  const [isVisible, setIsVisible] = useState(true);
  
  // State for entrance animation
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Check localStorage for user preference on announcement visibility
  useEffect(() => {
    const hasHiddenAnnouncement = localStorage.getItem('hideAnnouncement');
    if (hasHiddenAnnouncement === 'true') {
      setIsVisible(false);
    }
    
    // Add animation after component mounts
    setIsLoaded(true);
  }, []);
  
  // Handle closing the announcement
  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('hideAnnouncement', 'true');
  };
  
  if (!isVisible) return null;
  
  return (
    <div 
      className={`bg-lumora-gold-500 text-white py-4 px-4 transition-all duration-500 ${
        position === 'top' 
          ? `fixed top-0 left-0 right-0 w-full shadow-lg z-50 border-b border-lumora-gold-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
            }`
          : `relative w-full shadow-lg z-30 border-t border-lumora-gold-600 ${
              isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'
            }`
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center justify-center w-full animate-pulse-subtle">
          <span className="mr-3 text-2xl">🔔</span>
          <span className="font-bold text-lg md:text-xl tracking-tight">{t.preorderMessage}</span>
        </div>
        
        <button 
          onClick={handleClose}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/80 hover:text-white transition-colors"
          aria-label="Close announcement"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
}
