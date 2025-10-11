import { ArrowUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import LikeButton from '../components/LikeButton';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-8 right-8 flex flex-col gap-3 z-50">
          <LikeButton />

          <button
            onClick={scrollToTop}
            className="p-4 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={24} />
          </button>
        </div>
      )}
    </>
  );
}