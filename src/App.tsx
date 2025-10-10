import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import FloatingBubbles from './components/FloatingBubbles';

function App() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleToggleNotifications = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
  };

  return (
    <ThemeProvider>
      {/* Prevent horizontal scrolling and ensure full responsiveness */}
      <div className="overflow-x-hidden min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <Navigation 
          onToggleNotifications={handleToggleNotifications}
          notificationsEnabled={notificationsEnabled}
        />
        
        <main className="flex flex-col items-center justify-center">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Achievements />
          <Contact />
        </main>

        <Footer />
        <ScrollToTop />
        <FloatingBubbles enabled={notificationsEnabled} />
      </div>
    </ThemeProvider>
  );
}

export default App;
