import { Download, Mail, ArrowDown, Linkedin, Github, Instagram, Twitter, Folder } from 'lucide-react';
import { personalInfo } from '../data/portfolio';

export default function Hero() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-8">

          {/* Profile */}
          <div className="space-y-4">
            <div className="inline-block animate-fade-in">
              <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#00C9A7] to-[#3B82F6] p-1">
                <img
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white animate-slide-up">
              {personalInfo.name}
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 animate-slide-up animation-delay-200">
              {personalInfo.tagline}
            </p>

            <p className="text-xs text-gray-500 dark:text-gray-500 max-w-2xl mx-auto animate-slide-up animation-delay-400">
              {personalInfo.education}
            </p>
          </div>

          {/* BUTTONS (FIXED SIZE ON ALL DEVICES) */}
          <div className="flex flex-col gap-4 justify-center items-center md:flex-row md:gap-6 animate-slide-up animation-delay-600">

            {/* First two buttons (row on mobile) */}
            <div className="flex gap-3">
              {/* Hire Me */}
              <button
                onClick={scrollToContact}
                className="
                  group 
                  px-6 py-3 
                  min-w-[140px]
                  text-sm 
                  bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] 
                  text-white rounded-full font-semibold 
                  hover:shadow-lg hover:scale-105
                  transition-all duration-300 
                  flex items-center justify-center gap-2
                "
              >
                <Mail size={18} />
                Hire Me
              </button>

              {/* My Projects */}
              <button
                onClick={scrollToProjects}
                className="
                  group 
                  px-6 py-3 
                  min-w-[140px]
                  text-sm 
                  bg-gradient-to-r from-[#00C9A7] to-[#3B82F6]
                  text-white rounded-full font-semibold 
                  hover:shadow-lg hover:scale-105
                  transition-all duration-300 
                  flex items-center justify-center gap-2
                "
              >
                <Folder size={18} />
                My Projects
              </button>
            </div>

            {/* Third button (below on mobile, joins row on desktop) */}
            <a
              href={personalInfo.resume}
              download
              className="
                group 
                px-6 py-3 
                min-w-[140px]
                text-sm
                bg-white dark:bg-gray-800 text-gray-900 dark:text-white 
                border-2 border-gray-300 dark:border-gray-700 
                rounded-full font-semibold 
                hover:border-[#00C9A7] hover:scale-105 
                transition-all duration-300 
                flex items-center justify-center gap-2
              "
            >
              <Download size={18} />
              Download Resume
            </a>

          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 pt-0 animate-slide-up animation-delay-800">
            <a href={personalInfo.linkedin} className="text-gray-500 hover:text-[#0077b5] transition-colors">
              <Linkedin size={18} />
            </a>
            <a href={personalInfo.github} className="text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
              <Github size={18} />
            </a>
            <a href={personalInfo.instagram} className="text-gray-500 hover:text-[#E4405F] transition-colors">
              <Instagram size={18} />
            </a>
            <a href={personalInfo.twitter} className="text-gray-500 hover:text-[#1DA1F2] transition-colors">
              <Twitter size={18} />
            </a>
          </div>

          {/* Scroll Down */}
          <div className="pt-1 relative flex justify-center animate-bounce group">
            <button
              onClick={scrollToAbout}
              className="text-gray-400 hover:text-[#00C9A7] transition-colors relative flex flex-col items-center"
            >
              <span className="top-7 opacity-0 group-hover:opacity-100 text-gray-500 dark:text-gray-400 transition-opacity duration-300">
                Scroll to know more
              </span>
              <ArrowDown size={20} />
            </button>
          </div>

        </div>
      </div>

      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00C9A7]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#3B82F6]/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
      </div>
    </section>
  );
}
