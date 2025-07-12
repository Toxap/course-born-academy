const MarqueeSection = () => {
  const languages = [
    "JavaScript", "Python", "Java", "TypeScript", "C#", "PHP", "C++", "Go", 
    "Rust", "Swift", "Kotlin", "Ruby", "Scala", "R", "Dart", "HTML", "CSS", 
    "SQL", "React", "Vue.js", "Angular", "Node.js", "Django", "Spring"
  ];

  return (
    <section className="relative bg-slate-900 py-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-slate-900/90" />
      
      {/* Animated scan lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-400/60 to-transparent animate-scan" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-900/40 to-transparent animate-scan" style={{animationDelay: '1s'}} />
      
      {/* Main marquee */}
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of languages */}
          {languages.map((language, index) => (
            <div
              key={`first-${index}`}
              className="group inline-flex items-center mx-6 px-6 py-3 rounded-xl bg-slate-800/60 border border-red-900/30 backdrop-blur-sm transition-all duration-500 hover:bg-slate-800 hover:border-red-400/50 hover:shadow-2xl hover:shadow-red-900/20 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-red-700/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
              <span className="relative text-lg font-medium text-gray-200 group-hover:text-red-400 transition-colors duration-300">
                {language}
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-900/30 to-red-700/30 opacity-0 group-hover:opacity-100 blur-sm rounded-xl transition-opacity duration-500 -z-10" />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {languages.map((language, index) => (
            <div
              key={`second-${index}`}
              className="group inline-flex items-center mx-6 px-6 py-3 rounded-xl bg-slate-800/60 border border-red-900/30 backdrop-blur-sm transition-all duration-500 hover:bg-slate-800 hover:border-red-400/50 hover:shadow-2xl hover:shadow-red-900/20 hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/20 to-red-700/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-500" />
              <span className="relative text-lg font-medium text-gray-200 group-hover:text-red-400 transition-colors duration-300">
                {language}
              </span>
              <div className="absolute -inset-1 bg-gradient-to-r from-red-900/30 to-red-700/30 opacity-0 group-hover:opacity-100 blur-sm rounded-xl transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;