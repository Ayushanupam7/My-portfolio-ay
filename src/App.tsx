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
import AuthenticationModal from './components/AuthenticationModal';
import PersonalZone from './components/PersonalZone';
import PersonalZoneButton from './components/PersonalZoneButton';

function App() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const handleToggleNotifications = (enabled: boolean) => {
    setNotificationsEnabled(enabled);
  };

  const handleOpenAuth = () => setShowAuthModal(true);
  const handleCloseAuth = () => setShowAuthModal(false);

  const handleAuthSuccess = () => {
    setAuthenticated(true);
    setShowAuthModal(false);
  };

  const handleBackToHome = () => {
    setAuthenticated(false);
  };

  return (
    <ThemeProvider>
      <div className="overflow-x-hidden min-h-screen w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        {!authenticated ? (
          <>
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

              <div className="my-10 px-4 md:px-0 w-full flex justify-center">
                <PersonalZoneButton onClick={handleOpenAuth} />
              </div>
            </main>

            <Footer />
            <ScrollToTop />
            
            {/* ✅ Pass setNotificationsEnabled directly */}
            <FloatingBubbles
              enabled={notificationsEnabled}
              onToggleNotifications={handleToggleNotifications}
            />

            {showAuthModal && (
              <AuthenticationModal
                onClose={handleCloseAuth}
                onSuccess={handleAuthSuccess}
              />
            )}
          </>
        ) : (
          <PersonalZone onBack={handleBackToHome} />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
