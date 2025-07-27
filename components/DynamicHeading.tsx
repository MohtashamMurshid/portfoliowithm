"use client";

import { useState, useEffect } from "react";

interface DynamicHeadingProps {
  names: string[];
}

const DynamicHeading = ({ names }: DynamicHeadingProps) => {
  const [currentNameIndex, setCurrentNameIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentNameIndex((prevIndex) => (prevIndex + 1) % names.length);
        setIsVisible(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [names.length]);

  return (
    <div className="flex items-center justify-center lg:justify-start mb-8">
      <div className="w-12 h-px bg-accent mx-6"></div>
      <h1 className="hero-name text-center lg:text-left hover-lift">
        <span
          className={`transition-all duration-300 ${
            isVisible
              ? "opacity-100 transform translate-y-0"
              : "opacity-0 transform -translate-y-2"
          }`}
        >
          {names[currentNameIndex]}
        </span>
      </h1>
      <div className="w-12 h-px bg-accent mx-6"></div>
    </div>
  );
};

export default DynamicHeading;
