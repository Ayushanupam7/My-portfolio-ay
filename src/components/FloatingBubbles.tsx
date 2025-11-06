import { useState, useEffect } from 'react';
import { testimonials } from '../data/portfolio';
import { Bell, BellOff } from 'lucide-react';

interface Bubble {
  id: number;
  name: string;
  image: string;
  comment: string;
  position: { x: number; y: number };
  delay: number;
  timestamp: Date;
  role: string;
  email?: string;
  removing?: boolean;
  removeDirection?: 'left' | 'right';
  animationDuration?: number;
  dragX?: number;
  dragging?: boolean;
}

interface FloatingBubblesProps {
  enabled?: boolean;
  onToggleNotifications?: (enabled: boolean) => void;
}

const generateRandomBubble = (id: number): Bubble => {
  const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];
  return {
    id,
    name: randomTestimonial.name,
    image: randomTestimonial.image,
    role: randomTestimonial.role || 'Visitor',
    comment: randomTestimonial.comment,
    email: randomTestimonial.email,
    position: { x: Math.random() * 100 - 50, y: Math.random() * 200 + 50 },
    delay: Math.random() * 3,
    timestamp: new Date(randomTestimonial.timestamp || Date.now()),
  };
};

export default function FloatingBubbles({
  enabled = true,
  onToggleNotifications,
}: FloatingBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(enabled);

  // Sync local state with parent
  useEffect(() => {
    setNotificationsEnabled(enabled);
  }, [enabled]);

  const handleToggle = () => {
    const newValue = !notificationsEnabled;
    setNotificationsEnabled(newValue);
    onToggleNotifications?.(newValue);
  };

  // Show after scroll
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Generate bubbles when enabled
  useEffect(() => {
    if (!notificationsEnabled) return setBubbles([]);
    setBubbles([generateRandomBubble(0)]);
    const interval = setInterval(() => {
      setBubbles(prev => {
        const latest = prev.slice(-2);
        latest.push(generateRandomBubble(Date.now()));
        return latest.length > 2 ? latest.slice(-2) : latest;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [notificationsEnabled]);

  if (!isVisible) return null;

  return (
    <>
      {/* ✅ Circular Notification Toggle Button */}
      <button
        onClick={handleToggle}
        className={`p-2 rounded-full shadow-lg hover:shadow- hover:scale-110 transition-all duration-300 fixed  bottom-20 right-1 z-50 ${notificationsEnabled
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
          }`}
        aria-label={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
      >
        {notificationsEnabled ? <Bell size={10} fill="currentColor" /> : <BellOff size={10} />}
      </button>

      {/* Floating Bubbles */}
      {notificationsEnabled && (
        <div className="fixed bottom-20 sm:bottom-24 right-1 sm:right-4 w-48 sm:w-56 md:w-64 pointer-events-none z-40">
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              className="absolute animate-float-up opacity-0 transition-transform duration-300"
              style={{
                left: `${bubble.position.x}px`,
                animationDelay: `${bubble.delay}s`,
                animationDuration: '20s',
              }}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 sm:p-3 mb-3 pointer-events-auto transform hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700 max-w-[150px] sm:max-w-[220px] cursor-pointer hover:shadow-xl active:scale-95"
              >
                <div className="flex items-start gap-1 sm:gap-2">
                  <img
                    src={bubble.image}
                    alt={bubble.name}
                    className="w-5 h-5 sm:w-8 sm:h-8 rounded-full border border-[#00C9A7]"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[10px] sm:text-xs text-gray-900 dark:text-white truncate">
                      {bubble.name}
                    </p>
                    <p className="text-[8px] sm:text-[9px] text-gray-400 mt-0.5 truncate">
                      {bubble.role}
                    </p>
                    <p className="text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-300 mt-0.5 break-words line-clamp-2">
                      {bubble.comment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
