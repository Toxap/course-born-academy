import { Code, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Footer = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer id="contacts" className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-accent p-2 rounded-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold">CodeSchool</span>
            </div>
            <p className="text-primary-foreground/80 mb-6 max-w-md leading-relaxed">
              Онлайн-школа программирования с индивидуальным подходом. 
              Помогаем освоить IT-профессии с нуля до трудоустройства.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">info@codeschool.ru</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-accent" />
                <span className="text-primary-foreground/80">Москва, Россия</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Навигация</h3>
            <div className="space-y-2">
              <button 
                onClick={() => scrollToSection('hero')}
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Главная
              </button>
              <button 
                onClick={() => scrollToSection('courses')}
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Курсы
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                О нас
              </button>
              <button 
                onClick={() => scrollToSection('contacts')}
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Контакты
              </button>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Социальные сети</h3>
            <div className="space-y-2">
              <a 
                href="#" 
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                Telegram
              </a>
              <a 
                href="#" 
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                VKontakte
              </a>
              <a 
                href="#" 
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                YouTube
              </a>
              <a 
                href="#" 
                className="block text-primary-foreground/80 hover:text-accent transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center">
          <p className="text-primary-foreground/60">
            © 2024 CodeSchool. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;