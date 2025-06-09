"use client";
import { useState, useEffect } from "react";

interface DynamicHeadingProps {
  names: string[]; // Accept the names array as a prop
}

const DynamicHeading: React.FC<DynamicHeadingProps> = ({ names }) => {
  const [currentName, setCurrentName] = useState(names[0]);
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before starting dynamic behavior
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return; // Don't start the interval until mounted

    let index = 0;

    const changeName = () => {
      setCurrentName(names[index]);
      index = (index + 1) % names.length;

      if (index === names.length - 1) {
        clearInterval(interval);
        setCurrentName(names[names.length - 1]);
      }
    };

    const interval = setInterval(
      () => {
        changeName();
      },
      hovered ? 300 : 1000
    );

    return () => clearInterval(interval);
  }, [hovered, names, mounted]);

  return (
    <h1
      className="text-xl font-light  "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {currentName}
    </h1>
  );
};

export default DynamicHeading;
