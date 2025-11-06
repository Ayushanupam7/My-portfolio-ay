// FloatingBubbles.tsx
import { useState, useEffect } from 'react';
import { Bell, BellOff } from 'lucide-react';
import { testimonials } from '../data/portfolio';

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

interface TestimonialModalProps {
  testimonial: Bubble;
  isOpen: boolean;
  onClose: () => void;
}

const generateRandomBubble = (id: number): Bubble => {
  const t = testimonials[Math.floor(Math.random() * testimonials.length)];
  return {
    id,
    name: t.name,
    image: t.image,
    role: t.role || 'Visitor',
    comment: t.comment,
    email: t.email,
    position: { x: Math.random() * 100 - 50, y: Math.random() * 200 + 50 },
    delay: Math.random() * 3,
    timestamp: new Date(t.timestamp || Date.now()),
  };
};

function TestimonialModal({ testimonial, isOpen, onClose }: TestimonialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <button
        aria-label="Close testimonial modal"
        className="absolute inset-0 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Card */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4 max-w-md w-full transform animate-scale-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex items-center gap-4 mb-6">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full border-4 border-[#00C9A7]"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.role}</p>
            {testimonial.email && (
              <a
                href={`mailto:${testimonial.email}`}
                className="text-gray-500 dark:text-gray-400 text-xs mt-1 block truncate hover:underline"
              >
                {testimonial.email}
              </a>
            )}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Comment</h4>
          <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-sm leading-relaxed">
            “{testimonial.comment}”
          </p>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-600 pt-4">
          <span>Received:</span>
          <span>
            {testimonial.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {' • '}
            {testimonial.timestamp.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Decorative pulses */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#00C9A7] rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#00C9A7] rounded-full opacity-20 animate-pulse" />
      </div>
    </div>
  );
}

export default function FloatingBubbles({
  enabled = true,
  onToggleNotifications,
}: FloatingBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(enabled);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Bubble | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // keep local notificationsEnabled in sync with parent prop
  useEffect(() => {
    setNotificationsEnabled(enabled);
  }, [enabled]);

  // scroll visibility
  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // bubble generator (latest 2 maintained)
  useEffect(() => {
    if (!notificationsEnabled) {
      setBubbles([]);
      return;
    }
    // start with one
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

  // toggle bell
  const handleToggle = () => {
    const newVal = !notificationsEnabled;
    setNotificationsEnabled(newVal);
    onToggleNotifications?.(newVal);
    if (!newVal) setBubbles([]);
  };

  // modal controls
  const handleBubbleClick = (bubble: Bubble) => {
    setSelectedTestimonial(bubble);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTestimonial(null), 300);
  };

  // touch/drag handlers for swipe-to-dismiss
  const handleTouchStart = (e: React.TouchEvent, bubbleId: number) => {
    const touchX = e.touches[0].clientX;
    setBubbles(prev => prev.map(b => (b.id === bubbleId ? { ...b, dragX: touchX, dragging: true } : b)));
  };

  const handleTouchMove = (e: React.TouchEvent, bubbleId: number) => {
    const currentX = e.touches[0].clientX;
    setBubbles(prev =>
      prev.map(b => {
        if (b.id === bubbleId && b.dragging && b.dragX !== undefined) {
          return { ...b, dragX: currentX - b.dragX };
        }
        return b;
      }),
    );
  };

  const handleTouchEnd = (_e: React.TouchEvent, bubbleId: number) => {
    setBubbles(prev =>
      prev.map(b => {
        if (b.id === bubbleId && b.dragging) {
          const threshold = 50;
          if (b.dragX && Math.abs(b.dragX) > threshold) {
            const direction = b.dragX > 0 ? 'right' : 'left';
            const animationDuration = 300;
            setTimeout(() => {
              setBubbles(curr => curr.filter(bb => bb.id !== bubbleId));
            }, animationDuration);
            return {
              ...b,
              removing: true,
              removeDirection: direction,
              animationDuration,
              dragging: false,
              dragX: 0,
            };
          }
          return { ...b, dragging: false, dragX: 0 };
        }
        return b;
      }),
    );
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Circular Notification Toggle Button */}
      <button
        onClick={handleToggle}
        className={`p-2 rounded-full shadow-lg hover:scale-110 transition-all duration-300 fixed bottom-20 right-1 sm:right-4 z-50 ${
          notificationsEnabled
            ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
        }`}
        aria-label={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
        title={notificationsEnabled ? 'Disable notifications' : 'Enable notifications'}
      >
        {notificationsEnabled ? <Bell size={14} fill="currentColor" /> : <BellOff size={14} />}
      </button>

      {/* Floating Bubbles */}
      {notificationsEnabled && (
        <div className="fixed bottom-20 sm:bottom-24 right-1 sm:right-4 w-48 sm:w-56 md:w-64 pointer-events-none z-40">
          {bubbles.map(bubble => (
            <div
              key={bubble.id}
              className={`absolute animate-float-up opacity-0 transition-transform ${
                bubble.animationDuration ? '' : 'duration-300'
              } ${
                bubble.removing
                  ? bubble.removeDirection === 'left'
                    ? '-translate-x-32 opacity-0'
                    : 'translate-x-32 opacity-0'
                  : ''
              }`}
              style={{
                left: `${bubble.position.x}px`,
                transform: bubble.dragX ? `translateX(${bubble.dragX}px)` : undefined,
                animationDelay: `${bubble.delay}s`,
                animationDuration: '20s',
                transitionDuration: bubble.animationDuration ? `${bubble.animationDuration}ms` : undefined,
              }}
              onTouchStart={e => handleTouchStart(e, bubble.id)}
              onTouchMove={e => handleTouchMove(e, bubble.id)}
              onTouchEnd={e => handleTouchEnd(e, bubble.id)}
            >
              <div
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-2 sm:p-3 mb-3 pointer-events-auto transform hover:scale-105 transition-transform duration-300 border border-gray-200 dark:border-gray-700 max-w-[150px] sm:max-w-[220px] cursor-pointer hover:shadow-xl active:scale-95"
                onClick={() => handleBubbleClick(bubble)}
              >
                <div className="flex items-start gap-1 sm:gap-2">
                  <img
                    src={bubble.image}
                    alt={bubble.name}
                    className="w-5 h-5 sm:w-8 sm:h-8 rounded-full border border-[#00C9A7] flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[10px] sm:text-xs text-gray-900 dark:text-white truncate">
                      {bubble.name}
                    </p>
                    <p className="text-[8px] sm:text-[9px] text-gray-400 mt-0.5 truncate">{bubble.role}</p>
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

      {selectedTestimonial && (
        <TestimonialModal
          testimonial={selectedTestimonial}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}
