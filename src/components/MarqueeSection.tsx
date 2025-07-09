const MarqueeSection = () => {
  const languages = [
    "JavaScript", "Python", "Java", "TypeScript", "C#", "PHP", "C++", "Go", 
    "Rust", "Swift", "Kotlin", "Ruby", "Scala", "R", "Dart", "HTML", "CSS", 
    "SQL", "React", "Vue.js", "Angular", "Node.js", "Django", "Spring"
  ];

  return (
    <section className="relative bg-gradient-to-r from-primary/10 to-accent/10 py-4 overflow-hidden border-y border-border/20">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* First set of languages */}
        {languages.map((language, index) => (
          <span
            key={`first-${index}`}
            className="inline-block mx-8 text-lg font-medium text-foreground/80 hover:text-accent transition-colors"
          >
            {language}
          </span>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {languages.map((language, index) => (
          <span
            key={`second-${index}`}
            className="inline-block mx-8 text-lg font-medium text-foreground/80 hover:text-accent transition-colors"
          >
            {language}
          </span>
        ))}
      </div>
    </section>
  );
};

export default MarqueeSection;