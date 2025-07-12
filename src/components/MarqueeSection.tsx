const MarqueeSection = () => {
  const languages = [
    "JavaScript", "Python", "Java", "TypeScript", "C#", "PHP", "C++", "Go", 
    "Rust", "Swift", "Kotlin", "Ruby", "Scala", "R", "Dart", "HTML", "CSS", 
    "SQL", "React", "Vue.js", "Angular", "Node.js", "Django", "Spring"
  ];

  return (
    <section className="relative bg-background py-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-hero opacity-10" />
      
      {/* Animated scan lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-accent/60 to-transparent animate-scan" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-navy/40 to-transparent animate-scan" style={{animationDelay: '1s'}} />
      
      {/* Main marquee */}
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of languages */}
          {languages.map((language, index) => (
            <div
              key={`first-${index}`}
              className="group inline-flex items-center mx-6 px-6 py-3 rounded-xl bg-card/40 border border-blue-accent/20 backdrop-blur-sm transition-all duration-500 hover:bg-card/70 hover:border-blue-accent/50 hover:shadow-elegant hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-30 rounded-xl transition-opacity duration-500" />
              <span className="relative text-lg font-medium text-foreground group-hover:text-blue-accent transition-colors duration-300">
                {language}
              </span>
              <div className="absolute -inset-1 bg-gradient-accent opacity-0 group-hover:opacity-20 blur-sm rounded-xl transition-opacity duration-500 -z-10" />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {languages.map((language, index) => (
            <div
              key={`second-${index}`}
              className="group inline-flex items-center mx-6 px-6 py-3 rounded-xl bg-card/40 border border-blue-accent/20 backdrop-blur-sm transition-all duration-500 hover:bg-card/70 hover:border-blue-accent/50 hover:shadow-elegant hover:scale-105"
            >
              <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-30 rounded-xl transition-opacity duration-500" />
              <span className="relative text-lg font-medium text-foreground group-hover:text-blue-accent transition-colors duration-300">
                {language}
              </span>
              <div className="absolute -inset-1 bg-gradient-accent opacity-0 group-hover:opacity-20 blur-sm rounded-xl transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;