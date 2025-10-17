import { useState, useEffect, useRef } from 'react';
import { Trophy, Award, Briefcase, Calendar } from 'lucide-react';
import { achievements, certificates } from '../data/portfolio';

export default function Achievements() {
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      trophy: Trophy,
      award: Award,
      briefcase: Briefcase,
    };
    return icons[iconName] || Trophy;
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

  return (
    <section
      id="achievements"
      className="overflow-x-hidden mt-16 sm:mt-20 py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50 w-full transition-colors duration-500"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-4">
            Achievements & Recognition
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] mx-auto rounded-full"></div>
        </div>

        {/* Achievements Section */}
        <div className="mb-20 relative">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Achievements
          </h3>
          <SwipeableRow>
            {achievements.map((achievement) => {
              const Icon = getIcon(achievement.icon);
              return (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                  Icon={Icon}
                  formatDate={formatDate}
                />
              );
            })}
          </SwipeableRow>
        </div>

        {/* Certificates Section */}
        <div className="mt-20 relative">
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
            Certificates
          </h3>
          <SwipeableCertificates certificates={certificates} />
        </div>
      </div>
    </section>
  );
}

// ==============================
// Achievement Card
// ==============================
function AchievementCard({ achievement, Icon, formatDate }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!achievement.images || achievement.images.length === 0 || paused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievement.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [achievement.images, paused]);

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-900  hover:shadow-xl transition-all duration-500 flex-shrink-0 w-[260px] sm:w-[320px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {achievement.images && achievement.images.length > 0 ? (
        <>
          <div className="relative w-full h-40 sm:h-56 md:h-64 overflow-hidden">
            <div
              className="flex transition-transform duration-1000 ease-in-out"
              style={{
                width: `${achievement.images.length * 100}%`,
                transform: `translateX(-${currentIndex * (100 / achievement.images.length)}%)`,
              }}
            >
              {achievement.images.map((img: string, index: number) => (
                <img
                  key={index}
                  src={img}
                  alt={`${achievement.title} ${index + 1}`}
                  className="w-full h-40 sm:h-56 md:h-64 object-cover object-center flex-shrink-0"
                />
              ))}
            </div>
          </div>
          <div className="p-5 text-center">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
              {achievement.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2 line-clamp-3">
              {achievement.description}
            </p>
            <div className="flex justify-center items-center gap-2 text-gray-500 dark:text-gray-400 text-xs mb-3">
              <Calendar size={14} />
              {formatDate(achievement.date)}
            </div>
            <div className="flex justify-center items-center">
              <div className="p-3 bg-gradient-to-br from-[#00C9A7] to-[#3B82F6] rounded-xl shadow-md">
                <Icon className="text-white" size={24} />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center p-6 gap-4 text-center">
          <div className="p-12 bg-gradient-to-br from-[#00C9A7] to-[#3B82F6] rounded-full shadow-lg">
            <Icon className="text-white" size={40} />
          </div>
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
            {achievement.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">
            {achievement.description}
          </p>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs">
            <Calendar size={14} />
            {formatDate(achievement.date)}
          </div>
        </div>
      )}
    </div>
  );
}

// ==============================
// Swipeable Row (Achievements) with 5s delayed ping-pong scroll
// ==============================
function SwipeableRow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const scrollAmount = 1;
  const animationFrameId = useRef<number>();
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const step = () => {
      if (!container || paused) {
        animationFrameId.current = requestAnimationFrame(step);
        return;
      }

      container.scrollLeft += scrollAmount * direction;

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        setDirection(-1);
      } else if (container.scrollLeft <= 0) {
        setDirection(1);
      }

      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId.current!);
  }, [paused, direction]);

  const handlePause = () => {
    setPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  };

  const handleResumeWithDelay = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), 5000);
  };

  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    handlePause();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    containerRef.current.scrollLeft -= deltaX;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    handleResumeWithDelay();
  };

  return (
    <div
      ref={containerRef}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-none"
      onMouseEnter={handlePause}
      onMouseLeave={handleResumeWithDelay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ scrollBehavior: 'smooth' }}
    >
      {children}
    </div>
  );
}

// ==============================
// Swipeable Certificates Carousel with 5s delayed ping-pong scroll
// ==============================
function SwipeableCertificates({ certificates }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const scrollAmount = 1;
  const animationFrameId = useRef<number>();
  const resumeTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const step = () => {
      if (!container || paused) {
        animationFrameId.current = requestAnimationFrame(step);
        return;
      }

      container.scrollLeft += scrollAmount * direction;

      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        setDirection(-1);
      } else if (container.scrollLeft <= 0) {
        setDirection(1);
      }

      animationFrameId.current = requestAnimationFrame(step);
    };

    animationFrameId.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId.current!);
  }, [paused, direction]);

  const handlePause = () => {
    setPaused(true);
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
  };

  const handleResumeWithDelay = () => {
    if (resumeTimeout.current) clearTimeout(resumeTimeout.current);
    resumeTimeout.current = setTimeout(() => setPaused(false), 5000);
  };

  const touchStartX = useRef(0);
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isDragging.current = true;
    handlePause();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const deltaX = e.touches[0].clientX - touchStartX.current;
    containerRef.current.scrollLeft -= deltaX;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    handleResumeWithDelay();
  };

  return (
    <div
      ref={containerRef}
      className="flex gap-4 overflow-x-auto snap-x snap-mandatory py-4 scrollbar-none"
      onMouseEnter={handlePause}
      onMouseLeave={handleResumeWithDelay}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ scrollBehavior: 'smooth' }}
    >
      {certificates.map((certificate: any) => (
        <CertificateCard key={certificate.id} certificate={certificate} />
      ))}
    </div>
  );
}

function CertificateCard({ certificate }: any) {
  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] mx-2 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.03]">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={certificate.imageUrl}
          alt={certificate.title}
          className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
        />
      </div>
      <div className="p-4 text-center">
        <h4 className="text-base font-semibold text-gray-900 dark:text-white mb-1">
          {certificate.title}
        </h4>
        <p className="text-[#00C9A7] text-sm font-medium mb-1">{certificate.issuer}</p>
        <div className="flex justify-center items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar size={14} />
          {new Date(certificate.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })}
        </div>
      </div>
    </div>
  );
}
