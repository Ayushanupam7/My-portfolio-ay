import React from "react";

interface PersonalZoneButtonProps {
  onClick: () => void;
}

export default function PersonalZoneButton({ onClick }: PersonalZoneButtonProps) {
  // Images for decoration inside the button
  const images = [
    "/images/pz1.png",
    "/images/pz2.png",
    "/images/pz3.png",
    "/images/pz4.png",
  ];

  return (
    <button
      onClick={onClick}
      className="
        relative
        w-full max-w-4xl
        h-28 md:h-10
        flex items-center justify-center
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        shadow-lg
        hover:scale-105
        transition-transform duration-300
      "
    >
     

      {/* Button Text */}
      <span className="relative z-10 text-white text-lg md:text-2xl font-bold">Enter Personal Zone
      </span>

      
    </button>
  );
}
