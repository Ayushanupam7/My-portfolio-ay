import { useState, useEffect } from 'react';
import { testimonials } from '../data/portfolio';

interface Bubble {
  id: number;
  name: string;
  image: string;
  comment: string;
  position: { x: number; y: number };
  delay: number;
  timestamp: Date;
}

interface FloatingBubblesProps {
  enabled?: boolean;
}

interface TestimonialModalProps {
  testimonial: Bubble;
  isOpen: boolean;
  onClose: () => void;
}

const generateRandomBubble = (id: number): Bubble => {
  const randomTestimonial = testimonials[Math.floor(Math.random() * testimonials.length)];

  return {
    id,
    name: randomTestimonial.name,
    image: randomTestimonial.image,
    comment: randomTestimonial.comment,
    position: {
      x: Math.random() * 100 - 50,
      y: Math.random() * 200 + 50,
    },
    delay: Math.random() * 3,
    timestamp: new Date(),
  };
};

// Testimonial Modal Component
function TestimonialModal({ testimonial, isOpen, onClose }: TestimonialModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 mx-4 max-w-md w-full transform animate-scale-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors duration-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-16 h-16 rounded-full border-4 border-[#00C9A7]"
          />
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{testimonial.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Visitor</p>
          </div>
        </div>

        {/* Comment Section */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Comment</h4>
          <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-sm leading-relaxed">
            "{testimonial.comment}"
          </p>
        </div>

        {/* Timestamp */}
        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 border-t dark:border-gray-600 pt-4">
          <span>Received:</span>
          <span>
            {testimonial.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            {' • '}
            {testimonial.timestamp.toLocaleDateString([], { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -top-2 -right-2 w-8 h-8 bg-[#00C9A7] rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-[#00C9A7] rounded-full opacity-20 animate-pulse"></div>
      </div>
    </div>
  );
}

export default function FloatingBubbles({ enabled = true }: FloatingBubblesProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Bubble | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBubbleClick = (bubble: Bubble) => {
    setSelectedTestimonial(bubble);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTestimonial(null), 300);
  };

  useEffect(() => {
    const toggleVisibility = () => setIsVisible(window.pageYOffset > 300);
    toggleVisibility();
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  useEffect(() => {
    if (!enabled) return setBubbles([]);

    const initialBubbles = Array.from({ length: 1 }, (_, i) => generateRandomBubble(i));
    setBubbles(initialBubbles);

    const interval = setInterval(() => {
      setBubbles((prev) => {
        const latest = prev.slice(-2);
        latest.push(generateRandomBubble(Date.now()));
        return latest.length > 2 ? latest.slice(-2) : latest;
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [enabled]);

  if (!isVisible || !enabled) return null;

  return (
    <>
      <div className="fixed bottom-20 sm:bottom-24 right-1 sm:right-4 w-48 sm:w-56 md:w-64 pointer-events-none z-40">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute animate-float-up opacity-0"
            style={{
              left: `${bubble.position.x}px`,
              animationDelay: `${bubble.delay}s`,
              animationDuration: '20s',
            }}
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
                  <p className="text-[9px] sm:text-[10px] text-gray-600 dark:text-gray-300 mt-0.5 break-words line-clamp-2">
                    {bubble.comment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

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
