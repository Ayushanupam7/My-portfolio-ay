import { Code2, Palette, Database, Wrench } from 'lucide-react';
import { skills } from '../data/portfolio';

export default function Skills() {
  const skillCategories = [
    { title: 'Languages', items: skills.languages, icon: Code2, color: 'from-[#00C9A7] to-[#3B82F6]' },
    { title: 'Frontend', items: skills.frontend, icon: Palette, color: 'from-[#3B82F6] to-[#00C9A7]' },
    { title: 'Backend', items: skills.backend, icon: Database, color: 'from-[#00C9A7] to-[#3B82F6]' },
    { title: 'Database', items: skills.database, icon: Database, color: 'from-[#3B82F6] to-[#00C9A7]' },
    { title: 'Tools & Others', items: [...skills.tools, ...skills.other], icon: Wrench, color: 'from-[#00C9A7] to-[#3B82F6]' }
  ];

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Technical Skills
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 bg-gradient-to-br ${category.color} rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {category.title}
                  </h3>
                </div>
                
                {/* Scrollable Skills List */}
                <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="flex items-center gap-3 group"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] rounded-full group-hover:scale-150 transition-transform"></div>
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-[#00C9A7] transition-colors">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
