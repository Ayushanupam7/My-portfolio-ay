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
        h-28 md:h-32
        flex items-center justify-center
        overflow-hidden
        rounded-3xl
        bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600
        shadow-lg
        hover:scale-105
        transition-transform duration-300
      "
    >
      {/* Images inside button */}
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`decor-${index}`}
          className={`
            absolute
            w-16 h-16 md:w-20 md:h-20
            rounded-full
            object-cover
            opacity-70
            animate-[float_6s_ease-in-out_infinite]
            ${index % 2 === 0 ? "top-2 left-4" : "bottom-2 right-4"}
          `}
        />
      ))}

      {/* Button Text */}
      <span className="relative z-10 text-white text-lg md:text-2xl font-bold">
        🔒 Enter Personal Zone
      </span>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
          100% { transform: translateY(0); }
        }
        .animate-[float_6s_ease-in-out_infinite] {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
}
