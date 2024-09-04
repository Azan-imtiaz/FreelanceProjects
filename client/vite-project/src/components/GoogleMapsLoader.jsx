// src/components/GoogleMapsLoader.jsx
import { useEffect, useState } from 'react';

const GoogleMapsLoader = ({ apiKey, libraries, onLoad }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      setIsLoaded(true);
      if (onLoad) onLoad();
      return;
    }

    // Create script element to load Google Maps API
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=${libraries.join(',')}`;
    script.async = true;
    script.onload = () => {
      setIsLoaded(true);
      if (onLoad) onLoad();
    };
    script.onerror = () => {
      console.error("Failed to load Google Maps script");
    };

    // Append the script to the document
    document.head.appendChild(script);

    // Cleanup script on component unmount
    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, libraries, onLoad]);

  return null;
};

export default GoogleMapsLoader;
