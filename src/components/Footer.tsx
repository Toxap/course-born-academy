import { Code, Mail, Phone, MapPin, Github, MessageCircle, Play, ExternalLink, Heart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, useRef } from "react";

const Footer = () => {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { name: "Telegram", icon: MessageCircle, href: "#" },
    { name: "VKontakte", icon: ExternalLink, href: "#" },
    { name: "YouTube", icon: Play, href: "#" },
    { name: "GitHub", icon: Github, href: "#" }
  ];

  const navigationLinks = [
    { name: "Главная", section: "hero" },
    { name: "Курсы", section: "courses" },
    { name: "О нас", section: "about" },
    { name: "Контакты", section: "contacts" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            [0, 1, 2, 3].forEach((index) => {
              setTimeout(() => {
                setVisibleSections(prev => prev.includes(index) ? prev : [...prev, index]);
              }, index * 200);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={footerRef} id="contacts" className="bg-slate-900 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div className="absolute top-10 left-10 text-red-400/20 animate-pulse">
          <Code className="w-16 h-16 transform rotate-12" />
        </div>
        <div className="absolute bottom-10 right-10 text-red-400/20 animate-pulse delay-700">
          <Zap className="w-12 h-12 transform -rotate-12" />
        </div>
        
        {/* Floating pattern elements */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-red-600/5 rounded-full animate-pulse delay-500"></div>
        <div className="absolute bottom-1/4 left-1/3 w-24 h-24 bg-red-400/5 rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo and Description */}
          <div 
            className={`md:col-span-2 transition-all duration-700 ease-out ${
              visibleSections.includes(0) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <div className="group">
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-600 rounded-xl blur-md opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <div className="relative bg-red-600 p-3 rounded-xl border border-red-500">
                    <Code className="h-7 w-7 text-white" />
                  </div>
                </div>
                <span className="text-3xl font-bold text-gray-100 group-hover:text-white transition-colors duration-300">
                  CodeSchool
                </span>
              </div>
              
              <p className="text-gray-400 mb-8 max-w-md leading-relaxed text-lg">
                Онлайн-школа программирования с индивидуальным подходом. 
                Помогаем освоить IT-профессии с нуля до трудоустройства.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-4">
                {[
                  { icon: Mail, text: "info@codeschool.ru" },
                  { icon: Phone, text: "+7 (999) 123-45-67" },
                  { icon: MapPin, text: "Москва, Россия" }
                ].map((contact, index) => {
                  const Icon = contact.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-center space-x-4 group/contact cursor-pointer hover:bg-slate-800/30 p-2 rounded-lg transition-all duration-300"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-red-600 rounded-full blur-sm opacity-0 group-hover/contact:opacity-20 transition-opacity duration-300"></div>
                        <div className="relative w-10 h-10 bg-slate-800 border border-red-900/50 rounded-full flex items-center justify-center group-hover/contact:border-red-600/50 transition-colors duration-300">
                          <Icon className="h-5 w-5 text-red-400" />
                        </div>
                      </div>
                      <span className="text-gray-300 group-hover/contact:text-gray-100 transition-colors duration-300">
                        {contact.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div 
            className={`transition-all duration-700 ease-out ${
              visibleSections.includes(1) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h3 className="text-xl font-bold mb-6 text-gray-100 relative">
              Навигация
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-600 rounded-full"></div>
            </h3>
            <div className="space-y-3">
              {navigationLinks.map((link, index) => (
                <button 
                  key={index}
                  onClick={() => scrollToSection(link.section)}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="block w-full text-left group relative"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1 bg-red-600 transform transition-all duration-300 ${
                    hoveredLink === link.name ? 'scale-y-100' : 'scale-y-0'
                  } origin-top`}></div>
                  <span className={`pl-4 block py-2 transition-all duration-300 ${
                    hoveredLink === link.name 
                      ? 'text-gray-100 translate-x-2' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}>
                    {link.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div 
            className={`transition-all duration-700 ease-out ${
              visibleSections.includes(2) 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="text-xl font-bold mb-6 text-gray-100 relative">
              Социальные сети
              <div className="absolute bottom-0 left-0 w-8 h-0.5 bg-red-600 rounded-full"></div>
            </h3>
            <div className="space-y-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={index}
                    href={social.href}
                    className="flex items-center space-x-3 group/social hover:bg-slate-800/30 p-2 rounded-lg transition-all duration-300"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-red-600 rounded-full blur-sm opacity-0 group-hover/social:opacity-20 transition-opacity duration-300"></div>
                      <div className="relative w-8 h-8 bg-slate-800 border border-red-900/50 rounded-full flex items-center justify-center group-hover/social:border-red-600/50 transition-colors duration-300">
                        <Icon className="h-4 w-4 text-red-400" />
                      </div>
                    </div>
                    <span className="text-gray-400 group-hover/social:text-gray-100 transition-colors duration-300">
                      {social.name}
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          className={`border-t border-slate-700 mt-16 pt-8 transition-all duration-700 ease-out ${
            visibleSections.includes(3) 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-400">
              <span>© 2024 CodeSchool. Все права защищены.</span>
            </div>
            
            <div className="flex items-center gap-2 text-gray-400">
              <span>Сделано с</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse" />
              <span>для будущих программистов</span>
            </div>
          </div>
          
          {/* Bottom glow line */}
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;