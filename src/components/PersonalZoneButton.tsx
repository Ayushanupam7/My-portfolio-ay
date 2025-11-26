import React from "react";
import { Lock } from "lucide-react";

interface PersonalZoneButtonProps {
  onClick: () => void;
}

export default function PersonalZoneButton({ onClick }: PersonalZoneButtonProps) {
  const images = [
    "https://images.unsplash.com/photo-1503264116251-35a269479413",
    "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
    "https://images.unsplash.com/photo-1503264116251-35a269479413",
    "https://images.unsplash.com/photo-1499084732479-de2c02d45fcc",
    "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
    "https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d",
  ];

  return (
    <div
      className="
        relative w-full 
        h-28 sm:h-32 md:h-40
        overflow-hidden
        rounded-3xl
        shadow-xl
      "
    >
      {/* Infinite Scroll Wrapper */}
      <div
        className="
          flex absolute inset-0
          w-[200%] 
          animate-scroll-carousel
        "
      >
        {/* Row 1 : 1234 */}
        <div className="flex">
          {images.map((src, i) => (
            <img
              key={`set1-${i}`}
              src={src}
              className="
                h-full object-cover w-auto
                min-w-[120px] sm:min-w-[160px] md:min-w-[200px]
              "
            />
          ))}
        </div>

        {/* Row 2 : 1234  (repeat for seamless loop) */}
        <div className="flex">
          {images.map((src, i) => (
            <img
              key={`set2-${i}`}
              src={src}
              className="
                h-full object-cover w-auto
                min-w-[120px] sm:min-w-[160px] md:min-w-[200px]
              "
            />
          ))}
        </div>
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

      {/* Button */}
      <button
        onClick={onClick}
        className="
          absolute left-1/2 top-1/2
          -translate-x-1/2 -translate-y-1/2
          flex items-center gap-2

          px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5
          rounded-xl

          bg-white/15 backdrop-blur-md text-white
          shadow-xl border border-white/20

          hover:bg-white/25 hover:shadow-2xl hover:scale-[1.05]
          transition-all duration-200
        "
      >
        <Lock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-200" />

        <span className="text-xs sm:text-sm md:text-base font-medium tracking-wide">
          Personal Zone
        </span>
      </button>
    </div>
  );
}
