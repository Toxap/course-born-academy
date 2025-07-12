const MarqueeSection = () => {
  const languages = [
    "JavaScript", "Python", "Java", "TypeScript", "C#", "PHP", "C++", "Go", 
    "Rust", "Swift", "Kotlin", "Ruby", "Scala", "R", "Dart", "HTML", "CSS", 
    "SQL", "React", "Vue.js", "Angular", "Node.js", "Django", "Spring"
  ];

  return (
    <section className="relative bg-background py-16 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-background pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.1),transparent_70%)]" />
      
      {/* Animated scan lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent animate-scan" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-scan" style={{animationDelay: '1s'}} />
      
      {/* Main marquee */}
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {/* First set of languages */}
          {languages.map((language, index) => (
            <div
              key={`first-${index}`}
              className="group inline-flex items-center mx-6 px-4 py-2 rounded-lg bg-card/30 border border-border/20 backdrop-blur-sm transition-all duration-500 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {language}
              </span>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
            </div>
          ))}
          
          {/* Duplicate set for seamless loop */}
          {languages.map((language, index) => (
            <div
              key={`second-${index}`}
              className="group inline-flex items-center mx-6 px-4 py-2 rounded-lg bg-card/30 border border-border/20 backdrop-blur-sm transition-all duration-500 hover:bg-card/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/20"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <span className="relative text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {language}
              </span>
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Secondary marquee with reversed direction */}
      <div className="relative mt-8">
        <div className="flex animate-marquee-reverse whitespace-nowrap">
          {languages.slice().reverse().map((language, index) => (
            <div
              key={`reverse-first-${index}`}
              className="group inline-flex items-center mx-6 px-3 py-1.5 rounded-md bg-secondary/20 border border-border/10 backdrop-blur-sm transition-all duration-500 hover:bg-secondary/40 hover:border-secondary/30"
            >
              <span className="relative text-xs font-medium text-muted-foreground/80 group-hover:text-secondary-foreground transition-colors duration-300">
                {language}
              </span>
            </div>
          ))}
          
          {languages.slice().reverse().map((language, index) => (
            <div
              key={`reverse-second-${index}`}
              className="group inline-flex items-center mx-6 px-3 py-1.5 rounded-md bg-secondary/20 border border-border/10 backdrop-blur-sm transition-all duration-500 hover:bg-secondary/40 hover:border-secondary/30"
            >
              <span className="relative text-xs font-medium text-muted-foreground/80 group-hover:text-secondary-foreground transition-colors duration-300">
                {language}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarqueeSection;