import { Button } from "@/components/ui/button";
import { Code, Rocket, Star, Zap } from "lucide-react";

const FantasyMascotSection = () => {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-20 right-20 text-red-400/30">
          <Star className="w-8 h-8 transform rotate-12 animate-pulse" />
        </div>
        <div className="absolute bottom-20 left-20 text-red-400/30">
          <Zap className="w-10 h-10 transform -rotate-12 animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-200 leading-tight">
                Думаешь, что магия IT
                <br />
                <span className="text-red-400">недоступна новичкам?</span>
              </h2>
              
              <div className="w-24 h-1 bg-red-600 rounded-full"></div>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Даже без предыдущего опыта можно освоить программирование. 
                Присоединяйся к нашему сообществу разработчиков и открой 
                мир IT-технологий.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => {
                  const element = document.getElementById('contact-form');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                size="lg" 
                className="bg-red-900 hover:bg-red-800 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Начать обучение
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-red-600 text-red-400 hover:bg-red-900/20 hover:text-red-300 font-semibold py-4 px-8 rounded-lg transition-all duration-300"
              >
                Узнать больше
              </Button>
            </div>
          </div>

          {/* Right side - Code/Tech illustration */}
          <div className="relative">
            <div className="bg-slate-800 rounded-3xl border-2 border-red-900/50 p-8 shadow-xl">
              <div className="space-y-6">
                {/* Code window header */}
                <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 text-sm ml-2">new_developer.js</span>
                </div>
                
                {/* Code content */}
                <div className="space-y-3 font-mono text-sm">
                  <div className="text-gray-400">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">newbie</span>{" "}
                    <span className="text-gray-400">=</span>{" "}
                    <span className="text-green-400">"absolute beginner"</span>
                    <span className="text-gray-400">;</span>
                  </div>
                  
                  <div className="text-gray-400">
                    <span className="text-purple-400">const</span>{" "}
                    <span className="text-blue-400">timeToLearn</span>{" "}
                    <span className="text-gray-400">=</span>{" "}
                    <span className="text-orange-400">3</span>{" "}
                    <span className="text-gray-400">months;</span>
                  </div>
                  
                  <div className="text-gray-400 mt-4">
                    <span className="text-purple-400">if</span>{" "}
                    <span className="text-gray-400">(</span>
                    <span className="text-blue-400">motivation</span>{" "}
                    <span className="text-gray-400">&&</span>{" "}
                    <span className="text-blue-400">practice</span>
                    <span className="text-gray-400">) {"{"}</span>
                  </div>
                  
                  <div className="text-gray-400 ml-4">
                    <span className="text-blue-400">newbie</span>
                    <span className="text-gray-400">.</span>
                    <span className="text-yellow-400">transform</span>
                    <span className="text-gray-400">(</span>
                    <span className="text-green-400">"developer"</span>
                    <span className="text-gray-400">);</span>
                  </div>
                  
                  <div className="text-gray-400">
                    <span className="text-gray-400">{"}"}</span>
                  </div>
                  
                  <div className="text-green-400 mt-4">
                    // ✨ Magic happens here!
                  </div>
                </div>
                
                {/* Floating icons */}
                <div className="flex justify-center space-x-6 pt-4">
                  <div className="p-3 bg-red-900/50 rounded-lg">
                    <Code className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="p-3 bg-red-900/50 rounded-lg">
                    <Rocket className="w-6 h-6 text-red-400" />
                  </div>
                  <div className="p-3 bg-red-900/50 rounded-lg">
                    <Star className="w-6 h-6 text-red-400" />
                  </div>
                </div>
              </div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-red-600/5 pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FantasyMascotSection;