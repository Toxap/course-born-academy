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
    <section id="about" className="py-20 bg-slate-900">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 left-10 text-red-400/30">
          <Shield className="w-12 h-12 transform rotate-12 animate-pulse" />
        </div>
        <div className="absolute top-40 right-20 text-red-400/30">
          <Sword className="w-10 h-10 transform -rotate-12 animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-20 text-red-400/30">
          <Crown className="w-14 h-14 transform rotate-45 animate-pulse" />
        </div>
        <div className="absolute bottom-40 right-10 text-red-400/30">
          <Star className="w-10 h-10 transform -rotate-45 animate-pulse" />
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Company info */}
          <div className="space-y-8">
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

          {/* Right side - Interactive portal */}
          <div className="relative">
            <div className="relative w-full h-96 flex items-center justify-center">
              
              {/* Main portal container */}
              <div className="relative">
                {/* Portal frame */}
                <div className="relative w-80 h-80 bg-slate-800 rounded-full border-4 border-red-900/50 shadow-2xl">
                  
                  {/* Portal doors */}
                  <div className="absolute inset-4 rounded-full overflow-hidden">
                    <div className={`flex h-full transition-all duration-2000 ease-in-out ${gateOpen ? 'transform' : ''}`}>
                      {/* Left door */}
                      <div className={`w-1/2 h-full bg-slate-700 border-r-2 border-red-900/30 transition-transform duration-2000 ${gateOpen ? 'transform -translate-x-full' : ''}`}>
                        <div className="p-4 space-y-2">
                          <div className="w-8 h-8 bg-red-400/20 rounded-full mx-auto mt-8"></div>
                          <div className="w-6 h-1 bg-red-400/30 mx-auto"></div>
                        </div>
                      </div>
                      
                      {/* Right door */}
                      <div className={`w-1/2 h-full bg-slate-700 border-l-2 border-red-900/30 transition-transform duration-2000 ${gateOpen ? 'transform translate-x-full' : ''}`}>
                        <div className="p-4 space-y-2">
                          <div className="w-8 h-8 bg-red-400/20 rounded-full mx-auto mt-8"></div>
                          <div className="w-6 h-1 bg-red-400/30 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Portal content (revealed when gates open) */}
                    <div className={`absolute inset-0 bg-slate-700/30 transition-all duration-1000 ${gateOpen ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-6">
                        {/* Code symbols */}
                        <div className="relative">
                          <div className="text-4xl font-mono text-red-400 animate-pulse">{'<Code/>'}</div>
                          <div className="absolute -top-2 -right-2">
                            <Star className="w-4 h-4 text-red-400 animate-spin" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-gray-300 font-mono text-sm">
                            {'> learning.start()'}
                          </div>
                          <div className="text-green-400 font-mono text-xs">
                            {'✓ Status: READY'}
                          </div>
                          <div className="text-red-400 font-mono text-xs">
                            {'🚀 Portal opened'}
                          </div>
                        </div>

                        {/* Tech icons */}
                        <div className="flex space-x-4 text-2xl">
                          <Shield className="w-6 h-6 text-red-400 animate-pulse" />
                          <Sword className="w-6 h-6 text-gray-300 animate-pulse" />
                          <Crown className="w-6 h-6 text-red-400 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Portal top decoration */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Crown className="w-8 h-8 text-red-400" />
                  </div>
                  
                  {/* Side elements */}
                  <div className="absolute top-8 -left-6">
                    <div className="w-4 h-12 bg-red-600 rounded-sm"></div>
                    <div className="w-6 h-4 bg-red-500 rounded-full mx-auto -mt-1 animate-pulse"></div>
                  </div>
                  <div className="absolute top-8 -right-6">
                    <div className="w-4 h-12 bg-red-600 rounded-sm"></div>
                    <div className="w-6 h-4 bg-red-500 rounded-full mx-auto -mt-1 animate-pulse"></div>
                  </div>
                </div>

                {/* Base */}
                <div className="w-96 h-8 bg-slate-700 mx-auto rounded-sm border-2 border-red-900/30 shadow-lg"></div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-0 left-0 transform -translate-x-8 -translate-y-8 animate-float">
                <div className="w-12 h-12 bg-slate-800 backdrop-blur-sm rounded-lg border border-red-400/30 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-red-400" />
                </div>
              </div>

              <div className="absolute bottom-0 right-0 transform translate-x-8 translate-y-8 animate-float-delayed">
                <div className="w-10 h-10 bg-slate-800 backdrop-blur-sm rounded-full border border-red-400/30 flex items-center justify-center">
                  <Key className="w-5 h-5 text-red-400" />
                </div>
              </div>

              {/* Additional particles */}
              <div className="absolute top-16 right-12 text-red-400/40 animate-pulse">
                <Star className="w-6 h-6 transform rotate-12" />
              </div>
              <div className="absolute bottom-16 left-12 text-red-400/40 animate-pulse">
                <Zap className="w-5 h-5 transform -rotate-12" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;