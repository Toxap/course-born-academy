const AboutSection = () => {
  return (
    <section id="about" className="relative py-20 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating code symbols */}
        <div className="absolute top-20 left-10 text-cyan-400/20 animate-pulse">
          <div className="text-4xl font-mono transform rotate-12">{'< />'}</div>
        </div>
        <div className="absolute top-40 right-20 text-blue-400/20 animate-bounce">
          <div className="text-3xl font-mono transform -rotate-12">{'{ }'}</div>
        </div>
        <div className="absolute bottom-20 left-20 text-cyan-400/20 animate-pulse">
          <div className="text-5xl font-mono transform rotate-45">{'[ ]'}</div>
        </div>
        <div className="absolute bottom-40 right-10 text-blue-400/20 animate-bounce">
          <div className="text-3xl font-mono transform -rotate-45">{'( )'}</div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-5xl md:text-6xl font-bold text-white">
                О нас
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
            </div>
            
            <div className="space-y-6">
              <p className="text-xl text-gray-300 leading-relaxed">
                <span className="text-cyan-400 font-semibold">Course Born</span> — IT онлайн-школа 
                с первоклассными образовательными 
                продуктами, которая выпускает 
                разработчиков с гибким мышлением 
                и мощным стеком.
              </p>
              
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Наша <span className="text-cyan-400">МИССИЯ</span>
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  Помогаем реализовать амбиции, 
                  стать профессиональными 
                  разработчиками и получить работу 
                  мечты в лучших IT-компаниях 
                  в кратчайшие сроки!
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Animated tech elements */}
          <div className="relative">
            <div className="relative w-full h-96 flex items-center justify-center">
              {/* Monitor */}
              <div className="relative group">
                <div className="w-80 h-48 bg-gray-700 rounded-t-lg border-4 border-cyan-400/50 group-hover:border-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-400/20">
                  <div className="w-full h-full bg-slate-900 rounded-t-md flex items-center justify-center overflow-hidden">
                    <div className="text-center space-y-2">
                      <div className="text-cyan-400 font-mono text-sm animate-pulse">
                        {'> npm start'}
                      </div>
                      <div className="text-green-400 font-mono text-xs">
                        {'✓ Server running on port 3000'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-20 h-4 bg-gray-600 mx-auto rounded-b-lg border-2 border-cyan-400/50 group-hover:border-cyan-400 transition-all duration-300"></div>
                <div className="w-32 h-2 bg-gray-800 mx-auto rounded-full shadow-lg"></div>
              </div>

              {/* Keyboard */}
              <div className="absolute bottom-0 left-0 transform -translate-x-4 translate-y-4 group">
                <div className="w-32 h-20 bg-gray-700 rounded-lg border-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300 shadow-lg">
                  <div className="p-2 space-y-1">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400/50 rounded-sm animate-pulse"></div>
                      <div className="w-2 h-2 bg-cyan-400/30 rounded-sm"></div>
                      <div className="w-2 h-2 bg-cyan-400/50 rounded-sm animate-pulse"></div>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-cyan-400/30 rounded-sm"></div>
                      <div className="w-2 h-2 bg-cyan-400/50 rounded-sm animate-pulse"></div>
                      <div className="w-2 h-2 bg-cyan-400/30 rounded-sm"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mouse */}
              <div className="absolute bottom-0 right-0 transform translate-x-4 translate-y-4 group">
                <div className="w-8 h-12 bg-gray-700 rounded-full border-2 border-cyan-400/30 group-hover:border-cyan-400/60 transition-all duration-300 shadow-lg">
                  <div className="w-1 h-4 bg-cyan-400/50 mx-auto mt-2 rounded-full animate-pulse"></div>
                </div>
              </div>

              {/* Floating documents */}
              <div className="absolute top-0 left-0 transform -translate-x-8 -translate-y-8 animate-float">
                <div className="w-16 h-20 bg-white rounded-sm shadow-lg transform rotate-12 hover:rotate-6 transition-transform duration-300">
                  <div className="p-2 space-y-1">
                    <div className="w-full h-1 bg-gray-300 rounded"></div>
                    <div className="w-3/4 h-1 bg-gray-300 rounded"></div>
                    <div className="w-full h-1 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Magnifying glass */}
              <div className="absolute bottom-0 left-0 transform -translate-x-12 animate-float-delayed">
                <div className="w-8 h-8 rounded-full border-4 border-cyan-400/60 relative">
                  <div className="absolute -bottom-2 -right-2 w-4 h-1 bg-cyan-400/60 rounded-full transform rotate-45"></div>
                </div>
              </div>

              {/* Code brackets floating */}
              <div className="absolute top-10 right-10 text-cyan-400/40 animate-pulse">
                <div className="text-2xl font-mono transform rotate-12">{'{ }'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;