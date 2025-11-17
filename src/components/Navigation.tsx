import { Moon, Sun, Menu, X, MessageCircle, MessageCircleOff } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';
import { personalInfo } from '../data/portfolio';

interface NavigationProps {
  onToggleNotifications?: (enabled: boolean) => void;
  notificationsEnabled?: boolean;
}

export default function Navigation({ onToggleNotifications, notificationsEnabled = true }: NavigationProps) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // ⭐ MOBILE DEFAULT OFF, DESKTOP DEFAULT ON
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const [localNotificationsEnabled, setLocalNotificationsEnabled] = useState(
    isMobile ? false : notificationsEnabled
  );

  // ⭐ FIX #1: Notify parent ONCE (mobile only)
  useEffect(() => {
    if (isMobile) {
      onToggleNotifications?.(false);
    }
  }, []);

  // Sync parent -> local (desktop only)
  useEffect(() => {
    if (!isMobile) {
      setLocalNotificationsEnabled(notificationsEnabled);
    }
  }, [notificationsEnabled, isMobile]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleToggleNotifications = () => {
    const newValue = !localNotificationsEnabled;
    setLocalNotificationsEnabled(newValue);

    // ⭐ FIX #2: Update parent
    onToggleNotifications?.(newValue);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'achievements', label: 'Achievements' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* Profile + Name */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            <div
              className="w-11 h-11 rounded-full cursor-pointer hover:scale-105 transition-transform"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <span className="text-base font-bold text-gray-900 dark:text-white">
              Ayush Anupam
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-[#00C9A7] dark:hover:text-[#00C9A7] transition-colors px-3 py-2 font-medium"
              >
                {item.label}
              </button>
            ))}

            {/* Notifications Toggle */}
            <button
              onClick={handleToggleNotifications}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label={localNotificationsEnabled ? "Disable notifications" : "Enable notifications"}
            >
              {localNotificationsEnabled ? (
                <MessageCircle size={20} className="text-green-500" />
              ) : (
                <MessageCircleOff size={20} className="text-gray-500" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          {/* Mobile Buttons */}
          <div className="md:hidden flex items-center space-x-2">

            {/* Notifications Toggle */}
            <button
              onClick={handleToggleNotifications}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {localNotificationsEnabled ? (
                <MessageCircle size={20} className="text-green-500" />
              ) : (
                <MessageCircleOff size={20} className="text-gray-500" />
              )}
            </button>

            {/* Theme Toggle */}
            <button
              id="theme-toggle-btn"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all hover:scale-105 active:scale-95"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            {/* Hamburger */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-800 dark:text-gray-200 hover:text-[#00C9A7] transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-4 space-y-3">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="block w-full text-left px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg font-medium transition-all"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
