import { useState } from "react";
import { Moon, Sun, Menu, X, Home } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { personalInfo } from "../data/portfolio";

interface PersonalZoneProps {
  onBack: () => void;
}

export default function PersonalZone({ onBack }: PersonalZoneProps) {
  const { theme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("notes");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Scroll smoothly to top (Home) and notify parent to navigate back
  const goToHome = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
    // Notify parent component (e.g., to close PersonalZone or navigate home)
    try {
      onBack();
    } catch (e) {
      // swallow errors to avoid breaking the UI if parent didn't provide the handler
      // (onBack is typed as required, but be defensive)
      // eslint-disable-next-line no-console
      console.warn("onBack handler failed:", e);
    }
  };

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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 text-white dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors duration-500 pt-16">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Profile & Name */}
            <div className="flex items-center space-x-3 flex-shrink-0 cursor-pointer" onClick={goToHome} title="Go to Home">
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-11 h-11 rounded-full object-cover hover:scale-105 transition-transform"
              />
              <span className="text-base font-bold text-gray-900 dark:text-white">Ayush Anupam</span>
            </div>

            {/* Desktop Right Side */}
            <div className="hidden md:flex items-center space-x-4">
              

              {/* Home button */}
              <button
                onClick={goToHome}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Go to Home"
                title="Go to Home"
              >
                <Home size={20} className="text-gray-700 dark:text-gray-300" />
              </button>
              {/* Theme toggle button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
                title="Toggle dark mode"
              >
                {theme === "light" ? <Moon size={20} className="text-gray-700 dark:text-gray-300" /> : <Sun size={20} />}
              </button>
            </div>

            {/* Mobile Buttons */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Toggle theme"
                title="Toggle dark mode"
              >
                {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
              </button>

              <button
                onClick={goToHome}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
                aria-label="Go to Home"
                title="Go to Home"
              >
                <Home size={20} className="text-gray-700 dark:text-gray-300" />
              </button>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-800 dark:text-gray-200 hover:text-[#00C9A7] transition-colors"
                aria-label="Toggle menu"
                title="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ${
            isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {/* Empty or add mobile menu items if any */}
          <div className="px-4 py-4 space-y-3"></div>
        </div>
      </nav>

      {/* Spacer below navbar */}
      <div className="pt-20" />

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
