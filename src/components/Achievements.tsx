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
      className="py-20 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500"
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
          <InfiniteScrollRowWithControls>
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
          </InfiniteScrollRowWithControls>
        </div>

        {/* Certificates Section */}
        <div>
          <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            Certificates
          </h3>
          <div className="overflow-x-auto overflow-y-hidden pb-5">
            <div className="flex gap-6 min-w-full">
              {certificates.map((certificate) => (
                <div
                  key={certificate.id}
                  className="flex-shrink-0 w-[260px] sm:w-[320px] bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-transform duration-500 hover:-translate-y-2 hover:scale-[1.02]"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={certificate.imageUrl}
                      alt={certificate.title}
                      className="w-full h-full object-cover object-center transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-5 text-center">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {certificate.title}
                    </h4>
                    <p className="text-[#00C9A7] font-medium mb-2">{certificate.issuer}</p>
                    <div className="flex justify-center items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar size={16} />
                      {formatDate(certificate.date)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ==============================
// 🖼️ AchievementCard Component
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
      className="relative rounded-2xl overflow-hidden bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-500 flex-shrink-0 w-[260px] sm:w-[320px]"
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
          <h4 className="text-lg font-bold text-gray-900 dark:text-white">{achievement.title}</h4>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-4">{achievement.description}</p>
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
// 🌀 InfiniteScrollRowWithControls Component
// ==============================
function InfiniteScrollRowWithControls({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let scrollAmount = 0;
    const speed = 0.7;
    let rafId: number;

    const scrollStep = () => {
      if (!container || isHovered) {
        rafId = requestAnimationFrame(scrollStep);
        return;
      }
      scrollAmount += speed;
      if (scrollAmount >= container.scrollWidth / 2) scrollAmount = 0;
      container.scrollLeft = scrollAmount;
      rafId = requestAnimationFrame(scrollStep);
    };

    rafId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(rafId);
  }, [isHovered]);

  return (
    <div className="relative">
      {/* Scrollable Row */}
      <div
        ref={containerRef}
        className="overflow-x-auto overflow-y-hidden flex gap-4 touch-pan-x snap-x snap-mandatory"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
