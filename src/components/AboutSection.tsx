import { useState, useEffect } from "react";
import { Shield, Sword, Crown, Code2, Zap, Star, Lock, Key } from "lucide-react";

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
    <section id="about" className="relative py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 overflow-hidden">
      {/* Medieval fantasy background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating magical runes */}
        <div className="absolute top-20 left-10 text-amber-400/20 animate-pulse">
          <Shield className="w-16 h-16 transform rotate-12" />
        </div>
        <div className="absolute top-40 right-20 text-cyan-300/20 animate-bounce">
          <Sword className="w-12 h-12 transform -rotate-12" />
        </div>
        <div className="absolute bottom-20 left-20 text-purple-400/20 animate-pulse">
          <Crown className="w-20 h-20 transform rotate-45" />
        </div>
        <div className="absolute bottom-40 right-10 text-amber-300/20 animate-bounce">
          <Star className="w-12 h-12 transform -rotate-45" />
        </div>

        {/* Mystical grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-amber-400 to-transparent"></div>
          <div className="absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-purple-400 to-transparent"></div>
          <div className="absolute left-0 top-1/4 w-full h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Animated brick text assembly */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="relative">
                <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-purple-300 to-cyan-300">
                  О нас
                </h2>
                {/* Magical sparkles */}
                <div className="absolute -top-2 -right-2">
                  <Star className="w-6 h-6 text-amber-400 animate-spin" />
                </div>
              </div>
              <div className="w-20 h-1 bg-gradient-to-r from-amber-400 via-purple-500 to-cyan-400 rounded-full shadow-lg shadow-purple-500/50"></div>
            </div>
            
            {/* Animated text blocks that build like castle bricks */}
            <div className="space-y-6">
              <div className={`transform transition-all duration-1000 ${bricksAnimated ? 'translate-x-0 opacity-100' : 'translate-x-[-100px] opacity-0'}`}>
                <div className="relative p-6 bg-gradient-to-r from-slate-800/90 to-purple-900/90 backdrop-blur-sm rounded-xl border-2 border-amber-400/30 shadow-xl">
                  <div className="absolute -top-2 -left-2">
                    <Code2 className="w-6 h-6 text-amber-400" />
                  </div>
                  <p className="text-xl text-gray-300 leading-relaxed">
                    <span className="text-amber-400 font-bold">Course Born</span> — магическая IT гильдия,
                    где обучают древнему искусству кодинга и современным заклинаниям программирования.
                  </p>
                </div>
              </div>
              
              <div className={`transform transition-all duration-1000 delay-300 ${bricksAnimated ? 'translate-x-0 opacity-100' : 'translate-x-[100px] opacity-0'}`}>
                <div className="relative bg-gradient-to-br from-purple-800/50 to-slate-800/50 backdrop-blur-sm rounded-xl p-6 border-2 border-purple-400/30 shadow-2xl">
                  <div className="absolute -top-2 -right-2">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-300 mb-4">
                    Наша <span className="text-cyan-400">МИССИЯ</span>
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    Превращаем новичков в могущественных волшебников кода, 
                    обучая их создавать цифровые миры и воплощать самые 
                    смелые идеи в реальность через силу программирования!
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Castle gate with magical portal */}
          <div className="relative">
            <div className="relative w-full h-96 flex items-center justify-center">
              
              {/* Castle gate structure */}
              <div className="relative">
                {/* Gate frame */}
                <div className="relative w-80 h-80 bg-gradient-to-b from-slate-700 to-slate-800 rounded-t-full border-4 border-amber-400/50 shadow-2xl">
                  
                  {/* Gate doors */}
                  <div className="absolute inset-4 rounded-t-full overflow-hidden">
                    <div className={`flex h-full transition-all duration-2000 ease-in-out ${gateOpen ? 'transform' : ''}`}>
                      {/* Left door */}
                      <div className={`w-1/2 h-full bg-gradient-to-r from-slate-600 to-slate-700 border-r-2 border-amber-400/30 transition-transform duration-2000 ${gateOpen ? 'transform -translate-x-full' : ''}`}>
                        <div className="p-4 space-y-2">
                          {/* Door decorations */}
                          <div className="w-8 h-8 bg-amber-400/20 rounded-full mx-auto mt-8"></div>
                          <div className="w-6 h-1 bg-amber-400/30 mx-auto"></div>
                        </div>
                      </div>
                      
                      {/* Right door */}
                      <div className={`w-1/2 h-full bg-gradient-to-l from-slate-600 to-slate-700 border-l-2 border-amber-400/30 transition-transform duration-2000 ${gateOpen ? 'transform translate-x-full' : ''}`}>
                        <div className="p-4 space-y-2">
                          {/* Door decorations */}
                          <div className="w-8 h-8 bg-amber-400/20 rounded-full mx-auto mt-8"></div>
                          <div className="w-6 h-1 bg-amber-400/30 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Magical portal content (revealed when gates open) */}
                    <div className={`absolute inset-0 bg-gradient-to-br from-purple-600/20 via-cyan-500/20 to-amber-500/20 backdrop-blur-sm transition-all duration-1000 ${gateOpen ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="h-full flex flex-col items-center justify-center text-center space-y-4 p-6">
                        {/* Floating code symbols */}
                        <div className="relative">
                          <div className="text-4xl font-mono text-cyan-400 animate-pulse">{'<Code/>'}</div>
                          <div className="absolute -top-2 -right-2">
                            <Star className="w-4 h-4 text-amber-400 animate-spin" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="text-purple-300 font-mono text-sm animate-pulse">
                            {'> Guild.learn()'}
                          </div>
                          <div className="text-green-400 font-mono text-xs">
                            {'✓ Wizard status: ACTIVE'}
                          </div>
                          <div className="text-amber-400 font-mono text-xs">
                            {'🏰 Portal opened'}
                          </div>
                        </div>

                        {/* Magical elements */}
                        <div className="flex space-x-4 text-2xl">
                          <Shield className="w-6 h-6 text-amber-400 animate-bounce" />
                          <Sword className="w-6 h-6 text-purple-400 animate-pulse" />
                          <Crown className="w-6 h-6 text-cyan-400 animate-bounce" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gate top decorations */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Crown className="w-8 h-8 text-amber-400" />
                  </div>
                  
                  {/* Side torches */}
                  <div className="absolute top-8 -left-6">
                    <div className="w-4 h-12 bg-amber-600 rounded-sm"></div>
                    <div className="w-6 h-4 bg-orange-500 rounded-full mx-auto -mt-1 animate-pulse"></div>
                  </div>
                  <div className="absolute top-8 -right-6">
                    <div className="w-4 h-12 bg-amber-600 rounded-sm"></div>
                    <div className="w-6 h-4 bg-orange-500 rounded-full mx-auto -mt-1 animate-pulse"></div>
                  </div>
                </div>

                {/* Castle base */}
                <div className="w-96 h-8 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-600 mx-auto rounded-sm border-2 border-amber-400/30 shadow-lg"></div>
              </div>

              {/* Floating magical elements */}
              <div className="absolute top-0 left-0 transform -translate-x-8 -translate-y-8 animate-float">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 backdrop-blur-sm rounded-lg border border-purple-400/30 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-purple-400" />
                </div>
              </div>

              <div className="absolute bottom-0 right-0 transform translate-x-8 translate-y-8 animate-float-delayed">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-orange-500/20 backdrop-blur-sm rounded-full border border-amber-400/30 flex items-center justify-center">
                  <Key className="w-5 h-5 text-amber-400" />
                </div>
              </div>

              {/* Mystical particles */}
              <div className="absolute top-16 right-12 text-purple-400/40 animate-pulse">
                <Star className="w-6 h-6 transform rotate-12" />
              </div>
              <div className="absolute bottom-16 left-12 text-cyan-400/40 animate-pulse">
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