import { Button } from "@/components/ui/button";
import { Sparkles, Stars, Wand2 } from "lucide-react";

const FantasyMascotSection = () => {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500 to-blue-600"></div>
      
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating magical elements */}
        <div className="absolute top-10 left-10 text-white/20">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <div className="absolute top-20 right-20 text-white/15">
          <Stars className="w-6 h-6 animate-bounce" />
        </div>
        <div className="absolute bottom-32 left-20 text-white/10">
          <Wand2 className="w-10 h-10 animate-float" />
        </div>
        
        {/* Magical sparkles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-bounce"></div>
        
        {/* Abstract shapes */}
        <div className="absolute top-16 right-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/5 w-32 h-32 bg-white/3 rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Думаешь, что магия IT
              <br />
              <span className="text-yellow-300">недоступна новичкам?</span>
            </h2>
            
            <p className="text-xl text-blue-100 leading-relaxed">
              Наш мудрый маскот развеет все мифы! Даже без предыдущего опыта можно 
              освоить волшебство программирования. Присоединяйся к нашей гильдии 
              разработчиков и открой портал в мир IT-технологий.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Развеять миф
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-full transition-all duration-300"
              >
                Узнать больше
              </Button>
            </div>
          </div>

          {/* Right side - Fantasy Mascot */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main mascot container */}
              <div className="relative bg-white/10 backdrop-blur-sm rounded-full p-8 border border-white/20 shadow-2xl">
                {/* Fantasy wizard mascot */}
                <div className="text-8xl animate-float text-center">
                  🧙‍♂️
                </div>
                
                {/* Magic effects around mascot */}
                <div className="absolute -top-4 -right-4 text-yellow-300 animate-spin-slow">
                  <Sparkles className="w-8 h-8" />
                </div>
                <div className="absolute -bottom-2 -left-2 text-purple-300 animate-pulse">
                  <Stars className="w-6 h-6" />
                </div>
                <div className="absolute top-1/2 -right-8 text-cyan-300 animate-bounce">
                  <Wand2 className="w-6 h-6" />
                </div>
              </div>
              
              {/* Floating magical orbs */}
              <div className="absolute -top-8 left-8 w-4 h-4 bg-yellow-300/60 rounded-full animate-float blur-sm"></div>
              <div className="absolute -bottom-6 right-12 w-3 h-3 bg-purple-300/50 rounded-full animate-float-delayed blur-sm"></div>
              <div className="absolute top-1/3 -left-6 w-5 h-5 bg-cyan-300/40 rounded-full animate-bounce blur-sm"></div>
              
              {/* Magic spell text floating around */}
              <div className="absolute -top-12 right-4 text-white/30 text-sm font-mono animate-float transform rotate-12">
                &lt;magic/&gt;
              </div>
              <div className="absolute -bottom-8 left-2 text-white/25 text-xs font-mono animate-float-delayed transform -rotate-12">
                console.log('✨')
              </div>
              
              {/* Magical aura */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-pink-400/20 to-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FantasyMascotSection;