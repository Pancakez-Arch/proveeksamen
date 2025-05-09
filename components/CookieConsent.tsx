'use client';

import { useState, useEffect } from 'react';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          Vi bruker cookies for å gi deg en bedre opplevelse på nettstedet vårt. 
          Ved å fortsette å bruke nettstedet godtar du vår bruk av cookies.
          <a href="/privacy-policy" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
            Les mer om vår personvernpolicy
          </a>
        </div>
        <button
          onClick={handleAccept}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md text-sm font-medium"
        >
          Godta
        </button>
      </div>
    </div>
  );
} 