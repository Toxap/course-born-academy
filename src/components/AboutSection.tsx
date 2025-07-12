import { useState, useEffect } from "react";
import { Shield, Sword, Crown, Code2, Zap, Star, Lock, Key, Users, Target, Award } from "lucide-react";

const AboutSection = () => {
  const [gateOpen, setGateOpen] = useState(false);
  const [bricksAnimated, setBricksAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setBricksAnimated(true);
    }, 500);

    const gateTimer = setTimeout(() => {
      setGateOpen(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(gateTimer);
    };
  }, []);

  return (
    <section id="about" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Diagonal split overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-slate-900 transform origin-top-left" 
             style={{
               clipPath: 'polygon(0 0, 65% 0, 55% 100%, 0 100%)'
             }}>
        </div>
      </div>


      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-200 mb-4">
            О нас
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Онлайн-школа программирования с индивидуальным подходом
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative">
          {/* Left side - Company info */}
          <div className="space-y-8 relative z-20">
            <div className={`transform transition-all duration-1000 ${bricksAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="bg-slate-800 rounded-2xl border-2 border-red-900/50 p-8 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-red-900 rounded-lg">
                    <Code2 className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-200">CodeSchool</h3>
                    <p className="text-red-400">Онлайн-школа программирования</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Мы помогаем людям освоить IT-профессии с нуля и найти работу в сфере 
                  технологий. Наша цель — дать качественное образование и практические 
                  навыки, которые востребованы на рынке труда.
                </p>
              </div>
            </div>
            
            <div className={`transform transition-all duration-1000 delay-300 ${bricksAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="bg-slate-800 rounded-2xl border-2 border-red-900/50 p-8 shadow-xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="p-3 bg-red-900 rounded-lg">
                    <Target className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-200">Наша миссия</h3>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Превращаем новичков в уверенных разработчиков через практическое 
                  обучение, менторскую поддержку и создание реальных проектов.
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className={`grid grid-cols-3 gap-4 transform transition-all duration-1000 delay-500 ${bricksAnimated ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-red-400 mb-2">
                  <Users className="w-5 h-5" />
                  <span className="text-2xl font-bold">5000+</span>
                </div>
                <p className="text-gray-400 text-sm">Студентов</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-red-400 mb-2">
                  <Award className="w-5 h-5" />
                  <span className="text-2xl font-bold">85%</span>
                </div>
                <p className="text-gray-400 text-sm">Трудоустройство</p>
              </div>
              <div className="bg-slate-700/50 rounded-lg p-4 text-center">
                <div className="flex items-center justify-center space-x-1 text-red-400 mb-2">
                  <Star className="w-5 h-5" />
                  <span className="text-2xl font-bold">4.8</span>
                </div>
                <p className="text-gray-400 text-sm">Рейтинг</p>
              </div>
            </div>
          </div>

          {/* Right side - Video background */}
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-1/2 h-full">
            {/* Video container with diagonal mask */}
            <div className="relative h-full min-h-[600px] overflow-hidden"
                 style={{
                   clipPath: 'polygon(10% 0, 100% 0, 100% 100%, 0% 100%)'
                 }}>
              
              {/* Background video */}
              <video
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
                style={{ minHeight: '600px' }}
              >
                <source src="/videos/background-ai.mp4" type="video/mp4" />
                Ваш браузер не поддерживает видео.
              </video>
              
              {/* Video overlay for better text readability */}
              <div className="absolute inset-0 bg-slate-900/40"></div>
              
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;