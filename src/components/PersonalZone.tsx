import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface PersonalZoneProps {
  onBack: () => void;
}

export default function PersonalZone({ onBack }: PersonalZoneProps) {
  const [activeTab, setActiveTab] = useState("notes");
  const { theme, toggleTheme } = useTheme();

  const dribbbleShots = [
    {
      id: 1,
      img: "https://cdn.dribbble.com/userupload/1611111/preview.png",
      link: "https://dribbble.com/shots/1611111",
    },
    {
      id: 2,
      img: "https://cdn.dribbble.com/userupload/2222222/preview.png",
      link: "https://dribbble.com/shots/2222222",
    },
    {
      id: 3,
      img: "https://cdn.dribbble.com/userupload/3333333/preview.png",
      link: "https://dribbble.com/shots/3333333",
    },
    {
      id: 4,
      img: "https://cdn.dribbble.com/userupload/4444444/preview.png",
      link: "https://dribbble.com/shots/4444444",
    },
    {
      id: 5,
      img: "https://cdn.dribbble.com/userupload/5555555/preview.png",
      link: "https://dribbble.com/shots/5555555",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500">
      {/* Top Navigation Bar - Responsive */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white/10 dark:bg-black/30 backdrop-blur-md rounded-b-2xl shadow-lg gap-3 sm:gap-0">
        <div className="flex items-center space-x-4 w-full sm:w-auto justify-center sm:justify-start">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="bg-white text-indigo-600 font-semibold px-4 py-1 rounded-xl shadow-md hover:bg-gray-100 transition-transform transform hover:scale-105 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600"
          >
            ⬅ Back
          </button>

          {/* Name */}
          <h2 className="text-xl font-semibold tracking-wide whitespace-nowrap">
            Ayush Anupam
          </h2>
        </div>

        <div className="flex items-center space-x-4 w-full sm:w-auto justify-center sm:justify-end">
          {/* Dark/Light Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
            title="Toggle dark mode"
            aria-label="Toggle dark mode"
          >
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          {/* Settings Button */}
          <button className="bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-all duration-300 whitespace-nowrap">
            ⚙️ Settings
          </button>
        </div>
      </div>

      {/* Gap between Nav and Dribbble Carousel */}
      <div className="mt-8" />

      {/* Infinite Dribbble Carousel */}
      <div className="overflow-hidden whitespace-nowrap px-6 pb-6">
        <div className="flex animate-infinite-scroll space-x-6">
          {[...Array(2)].map((_, idx) =>
            dribbbleShots.map((shot) => (
              <a
                key={`${idx}-${shot.id}`}
                href={shot.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={shot.img}
                  alt={`Dribbble shot ${shot.id}`}
                  className="w-72 h-48 rounded-2xl shadow-lg object-cover"
                />
              </a>
            ))
          )}
        </div>
      </div>

      {/* Nav Tabs */}
      <div className="flex justify-center mt-4 space-x-6 border-b border-white/30 dark:border-gray-500">
        {["notes", "links", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-lg font-medium transition-colors ${
              activeTab === tab
                ? "border-b-2 border-white text-white"
                : "text-white/70 hover:text-white"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-grow flex items-center justify-center p-6">
        {activeTab === "notes" && (
          <p className="text-center text-lg max-w-md">📝 Your personal notes appear here.</p>
        )}
        {activeTab === "links" && (
          <p className="text-center text-lg max-w-md">🔗 Your private links and bookmarks.</p>
        )}
        {activeTab === "settings" && (
          <p className="text-center text-lg max-w-md">⚙️ Manage your preferences and privacy.</p>
        )}
      </div>
    </div>
  );
}
