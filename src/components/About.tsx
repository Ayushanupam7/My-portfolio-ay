import { GraduationCap, Target, Star } from 'lucide-react';
import { personalInfo, softSkills } from '../data/portfolio';
import { useState, useEffect } from 'react';

export default function About() {
  const [activeEducation, setActiveEducation] = useState(0);
  
  const educationData = [
    {
      level: "College",
      degree: personalInfo.education,
      institution: personalInfo.college,
      details: `CGPA: ${personalInfo.cgpa}`,
      color: "from-[#00C9A7] to-[#3B82F6]"
    },
    {
      level: "12th Grade",
      degree: "Higher Secondary Education",
      institution: personalInfo.school12th || "School Name",
      details: `Percentage: ${personalInfo.percentage12th || "XX%"} | Year: ${personalInfo.year12th || "XXXX"}`,
      color: "from-[#3B82F6] to-[#00C9A7]"
    },
    {
      level: "10th Grade",
      degree: "Secondary Education",
      institution: personalInfo.school10th || "School Name",
      details: `Percentage: ${personalInfo.percentage10th || "XX%"} | Year: ${personalInfo.year10th || "XXXX"}`,
      color: "from-[#00C9A7] to-[#3B82F6]"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveEducation((prev) => (prev + 1) % educationData.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [educationData.length]);

  return (
    <section id="about" className="overflow-x-hidden py-16 sm:py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] mx-auto rounded-full"></div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start">

          {/* Left Column */}
          <div className="space-y-6">

            {/* Education Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className={`p-3 sm:p-4 bg-gradient-to-br ${educationData[activeEducation].color} rounded-lg transition-all duration-1000 ease-in-out`}>
                  <GraduationCap className="text-white" size={28} />
                </div>
                <div className="flex-1 w-full">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white">Education</h3>
                    <div className="flex gap-2">
                      {educationData.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveEducation(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-500 ease-in-out ${
                            index === activeEducation 
                              ? 'bg-gradient-to-r from-[#00C9A7] to-[#3B82F6]' 
                              : 'bg-gray-300 dark:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="relative h-28 sm:h-32 overflow-hidden">
                    {educationData.map((edu, index) => (
                      <div
                        key={index}
                        className={`absolute top-0 left-0 w-full transition-all duration-1000 ease-in-out ${
                          index === activeEducation
                            ? 'opacity-100 translate-x-0'
                            : index < activeEducation
                            ? 'opacity-0 -translate-x-6'
                            : 'opacity-0 translate-x-6'
                        }`}
                      >
                        <h4 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white mb-1">
                          {edu.level}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-1">{edu.degree}</p>
                        <p className="text-[#00C9A7] font-semibold text-sm sm:text-base">{edu.institution}</p>
                        <p className="text-gray-500 dark:text-gray-500 mt-1 text-xs sm:text-sm">{edu.details}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Goal Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="p-3 sm:p-4 bg-gradient-to-br from-[#3B82F6] to-[#00C9A7] rounded-lg transition-all duration-1000 ease-in-out">
                  <Target className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">Goal</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">{personalInfo.goal}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 sm:p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="p-2 sm:p-3 bg-gradient-to-br from-[#00C9A7] to-[#3B82F6] rounded-lg transition-all duration-1000 ease-in-out">
                <Star className="text-white" size={24} />
              </div>
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">Soft Skills</h3>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 sm:gap-4">
              {softSkills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gradient-to-r hover:from-[#00C9A7]/10 hover:to-[#3B82F6]/10 transition-all duration-500 ease-in-out"
                >
                  <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-r from-[#00C9A7] to-[#3B82F6] rounded-full transition-all duration-500 ease-in-out"></div>
                  <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
