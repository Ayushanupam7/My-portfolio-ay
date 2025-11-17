import { useState } from 'react';
import { ExternalLink, Github, Star } from 'lucide-react';
import { projects } from '../data/portfolio';

export default function Projects() {
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A showcase of my work and passion for creating innovative web solutions
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {project.featured && (
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                    <Star size={14} fill="white" />
                    Featured
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.map((tech, index) => (
                    <span
  key={index}
  className="animated-border px-3 py-1 rounded-full text-sm font-medium 
             text-gray-700 dark:text-gray-300"
>
  <span>{tech}</span>
</span>

                  ))}
                </div>


                {/* ⭐ Updated Buttons Section */}
                <div className="flex gap-4">

                  {/* Live Link */}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="live-link"
                    >
                      <ExternalLink size={18} />
                      Live Link
                    </a>
                  )}

                  {/* GitHub Code */}
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 
                               rounded-lg font-semibold
                               bg-gray-900 text-white
                               dark:bg-gray-800 dark:text-white
                               transition-all hover:shadow-lg active:scale-95"
                  >
                    <Github size={18} />
                    Code
                  </a>

                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Show More / Less Button */}
        {projects.length > 4 && (
          <div className="text-center mt-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="px-6 py-3 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] text-white rounded-full font-semibold hover:shadow-lg transition-shadow"
            >
              {showAll ? 'Show Less' : 'Show More'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
