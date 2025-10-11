import { ArrowUp, Sun, Moon } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import LikeButton from '../components/LikeButton';
import { useTheme } from '../context/ThemeContext';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);
  const feedbackTimeout = useRef<NodeJS.Timeout | null>(null);
  const [isFeedback, setIsFeedback] = useState(false); // visual feedback state

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePressStart = () => {
    // Show visual feedback after 2 seconds
    feedbackTimeout.current = setTimeout(() => {
      setIsFeedback(true);
    }, 100);

    // Trigger theme toggle after 3 seconds
    longPressTimeout.current = setTimeout(() => {
      toggleTheme();
      setIsFeedback(false); // reset feedback after theme change
    }, 2000);
  };

  const handlePressEnd = () => {
    // Clear timers
    if (feedbackTimeout.current) {
      clearTimeout(feedbackTimeout.current);
      feedbackTimeout.current = null;
    }
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
      longPressTimeout.current = null;
    }
    setIsFeedback(false); // reset visual feedback if released early
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 flex flex-col items-center gap-3 z-50">
          <LikeButton />

          <button
            onClick={scrollToTop}
            onMouseDown={handlePressStart}
            onMouseUp={handlePressEnd}
            onMouseLeave={handlePressEnd}
            onTouchStart={handlePressStart}
            onTouchEnd={handlePressEnd}
            className={`relative p-4 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] text-white rounded-full shadow-lg 
              transition-all duration-300 flex items-center justify-center
              ${isFeedback ? 'scale-110 ring-4 ring-white/30' : ''}`}
            aria-label="Scroll to top / Long press to toggle theme"
          >
            <ArrowUp size={24} />

            {/* Current theme icon */}
            <span className="absolute -top-3 right-0">
              {theme === 'light' ? (
                <Sun size={10} className="text-yellow-400" />
              ) : (
                <Moon size={10} className="text-gray-200" />
              )}
            </span>
          </button>
        </div>
      )}
    </>
  );
}
