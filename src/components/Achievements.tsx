import { useState, useEffect, useRef } from "react";
import { Trophy, Award, Briefcase, Calendar, ExternalLink } from "lucide-react";
import { achievements, certificates } from "../data/portfolio";
import { motion, AnimatePresence } from "framer-motion";

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
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
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

        {/* Achievements */}
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

        {/* Certificates */}
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

/* ============================================================
   Achievement Card — WITH LINKS
============================================================ */
function AchievementCard({ achievement, Icon, formatDate }: any) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!achievement.images || achievement.images.length === 0 || isHovered)
      return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % achievement.images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [achievement.images, isHovered]);

  const hasImages = achievement.images && achievement.images.length > 0;

  return (
    <motion.div
      className="relative flex-shrink-0 w-[280px] sm:w-[340px] group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="h-full bg-white dark:bg-gray-900/60 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl border border-gray-200 dark:border-gray-700/50 transition-all duration-500 flex flex-col">

        {/* Image Section */}
        <div className="relative h-48 sm:h-56 overflow-hidden">

          {/* Floating Link Icon */}
          {achievement.link && (
            <a
              href={achievement.link}
              target="_blank"
              className="absolute top-3 left-3 z-20 bg-white/90 dark:bg-gray-900/80 
              p-2 rounded-full shadow-lg hover:scale-110 transition"
            >
              <ExternalLink size={18} className="text-[#00C9A7]" />
            </a>
          )}

          {hasImages ? (
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={achievement.images[currentIndex]}
                alt={achievement.title}
                className="absolute inset-0 w-full h-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
              />
            </AnimatePresence>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className="text-gray-300 opacity-40" size={80} />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

          {/* Icon Badge */}
          <div className="absolute top-4 right-4 p-2 bg-white/90 rounded-xl shadow-lg">
            <Icon className="text-[#00C9A7]" size={18} />
          </div>

          {/* Date */}
          <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-full">
            <Calendar size={14} className="text-white" />
            <span className="text-white text-xs">{formatDate(achievement.date)}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-1">
            {achievement.title}
          </h4>

          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed flex-grow line-clamp-3">
            {achievement.description}
          </p>

          {/* Main "View Link" Button */}

        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   SwipeableRow — Dot Sync + Clickable Dots
============================================================ */
function SwipeableRow({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = Array.from(children as any);
  const [activeIndex, setActiveIndex] = useState(0);

  const itemWidth = 320;
  const scrollAmount = 1;

  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const frame = useRef<number>();
  const timeout = useRef<any>(null);

  // Sync dots on scroll
  const syncDots = () => {
    if (!containerRef.current) return;
    const index = Math.round(containerRef.current.scrollLeft / itemWidth);
    setActiveIndex(index);
  };

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.addEventListener("scroll", syncDots);
    return () => c.removeEventListener("scroll", syncDots);
  }, []);

  // Auto scroll
  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const animate = () => {
      if (!paused) {
        c.scrollLeft += scrollAmount * direction;
        if (c.scrollLeft + c.clientWidth >= c.scrollWidth) setDirection(-1);
        if (c.scrollLeft <= 0) setDirection(1);
      }
      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current!);
  }, [paused, direction]);

  const pause = () => {
    setPaused(true);
    if (timeout.current) clearTimeout(timeout.current);
  };

  const resume = () => {
    timeout.current = setTimeout(() => setPaused(false), 5000);
  };

  // Touch drag
  const startX = useRef(0);
  const dragging = useRef(false);

  const start = (e: any) => {
    startX.current = e.touches[0].clientX;
    dragging.current = true;
    pause();
  };

  const move = (e: any) => {
    if (!dragging.current || !containerRef.current) return;
    const dx = e.touches[0].clientX - startX.current;
    containerRef.current.scrollLeft -= dx;
    startX.current = e.touches[0].clientX;
  };

  const end = () => {
    dragging.current = false;
    resume();
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto py-4 scrollbar-none"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={end}
        style={{ scrollBehavior: "smooth" }}
      >
        {children}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() =>
              containerRef.current?.scrollTo({
                left: i * itemWidth,
                behavior: "smooth",
              })
            }
            className={`h-3 w-3 rounded-full transition-all 
            ${i === activeIndex
                ? "bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] scale-125 shadow-md"
                : "bg-gray-400 dark:bg-gray-500 opacity-60"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   SwipeableCertificates — WITH LINKS + DOT SYNC
============================================================ */
function SwipeableCertificates({ certificates }: any) {
  const containerRef = useRef<HTMLDivElement>(null);
  const items = certificates;
  const itemWidth = 260;

  const scrollAmount = 1;
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [direction, setDirection] = useState(1);
  const frame = useRef<number>();
  const timeout = useRef<any>(null);

  const syncDots = () => {
    if (!containerRef.current) return;
    setActiveIndex(Math.round(containerRef.current.scrollLeft / itemWidth));
  };

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;
    c.addEventListener("scroll", syncDots);
    return () => c.removeEventListener("scroll", syncDots);
  }, []);

  useEffect(() => {
    const c = containerRef.current;
    if (!c) return;

    const animate = () => {
      if (!paused) {
        c.scrollLeft += scrollAmount * direction;
        if (c.scrollLeft + c.clientWidth >= c.scrollWidth) setDirection(-1);
        if (c.scrollLeft <= 0) setDirection(1);
      }
      frame.current = requestAnimationFrame(animate);
    };

    frame.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame.current!);
  }, [paused, direction]);

  const pause = () => {
    setPaused(true);
    if (timeout.current) clearTimeout(timeout.current);
  };

  const resume = () => {
    timeout.current = setTimeout(() => setPaused(false), 5000);
  };

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto py-4 scrollbar-none"
        onMouseEnter={pause}
        onMouseLeave={resume}
        style={{ scrollBehavior: "smooth" }}
      >
        {items.map((certificate: any) => (
          <CertificateCard key={certificate.id} certificate={certificate} />
        ))}
      </div>

      <div className="flex justify-center mt-4 gap-3">
        {items.map((_: any, i: number) => (
          <button
            key={i}
            onClick={() =>
              containerRef.current?.scrollTo({
                left: i * itemWidth,
                behavior: "smooth",
              })
            }
            className={`h-3 w-3 rounded-full transition-all 
            ${i === activeIndex
                ? "bg-gradient-to-r from-[#3B82F6] to-[#00C9A7] scale-125 shadow-md"
                : "bg-gray-400 dark:bg-gray-500 opacity-60"
              }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ============================================================
   Certificate Card WITH LINK
============================================================ */
function CertificateCard({ certificate }: any) {
  return (
    <div className="flex-shrink-0 w-[200px] sm:w-[240px] md:w-[280px] mx-2 bg-white 
    dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 
    dark:border-gray-700 shadow-md hover:shadow-xl transition-transform duration-500 
    hover:-translate-y-2 hover:scale-[1.03]">

      <div className="relative aspect-video overflow-hidden">

        {/* Floating link icon */}
        {certificate.link && (
          <a
            href={certificate.link}
            target="_blank"
            className="absolute top-2 right-2 z-20 bg-white/90 dark:bg-gray-900/80 
            p-2 rounded-full shadow hover:scale-110 transition"
          >
            <ExternalLink size={18} className="text-[#3B82F6]" />
          </a>
        )}

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
          {new Date(certificate.date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
          })}
        </div>

        {/* Main button */}
        {certificate.link && (
          <a
            href={certificate.link}
            target="_blank"
            className="mt-3 inline-flex items-center justify-center gap-2 
            px-4 py-2 text-xs font-semibold text-white 
            bg-gradient-to-r from-[#3B82F6] to-[#00C9A7] 
            rounded-full shadow hover:shadow-lg transition"
          >
            View Certificate
            <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}
