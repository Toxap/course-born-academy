import { useState } from "react";
import { Menu, X, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-accent p-2 rounded-lg">
            <Code className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-primary">CodeSchool</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <button 
            onClick={() => scrollToSection('hero')}
            className="text-foreground hover:text-accent transition-colors"
          >
            Главная
          </button>
          <button 
            onClick={() => scrollToSection('courses')}
            className="text-foreground hover:text-accent transition-colors"
          >
            Курсы
          </button>
          <button 
            onClick={() => scrollToSection('about')}
            className="text-foreground hover:text-accent transition-colors"
          >
            О нас
          </button>
          <button 
            onClick={() => scrollToSection('contacts')}
            className="text-foreground hover:text-accent transition-colors"
          >
            Контакты
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-left text-foreground hover:text-accent transition-colors"
            >
              Главная
            </button>
            <button 
              onClick={() => scrollToSection('courses')}
              className="text-left text-foreground hover:text-accent transition-colors"
            >
              Курсы
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-left text-foreground hover:text-accent transition-colors"
            >
              О нас
            </button>
            <button 
              onClick={() => scrollToSection('contacts')}
              className="text-left text-foreground hover:text-accent transition-colors"
            >
              Контакты
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;