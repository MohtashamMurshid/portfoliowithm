"use client";
import { useState, useEffect } from "react";

interface DynamicHeadingProps {
  primaryName: string;
  names: string[];
}

const DynamicHeading: React.FC<DynamicHeadingProps> = ({
  primaryName,
  names,
}) => {
  const [currentName, setCurrentName] = useState(names[0]);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
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
  }, [hovered, names]);

  return (
    <h1
      className="text-xl font-light  "
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span>{primaryName}</span>
      <span className="text-gray-400" dir="auto">
        {" "}
        / {currentName}
      </span>
    </h1>
  );
};

export default DynamicHeading;
