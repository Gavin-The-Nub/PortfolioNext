"use client";

import { useState, useEffect } from "react";

export function LoadingScreen({ isLoading }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Start fade out transition
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 500); // Small delay before starting fade
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-1000 ease-out ${
        !isLoading ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="card">
        <div className="loader text-sm font-extralight">
          <p>loading</p>
          <div className="words">
            <span className="word">crashout</span>
            <span className="word">braincells</span>
            <span className="word">bugs</span>
            <span className="word">coffee</span>
            <span className="word">magic</span>
          </div>
        </div>
      </div>
    </div>
  );
}
