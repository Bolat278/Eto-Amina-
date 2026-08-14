import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { MapPin, Clock, Heart, ArrowRight, Frown } from 'lucide-react';

const ScreenWrapper = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.95 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -20, scale: 0.95 }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className={`absolute inset-0 flex flex-col items-center justify-center p-4 ${className}`}
  >
    {children}
  </motion.div>
);

const CardContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white/60 backdrop-blur-md p-8 md:p-12 rounded-3xl shadow-xl w-full max-w-md text-center ruffle-border relative z-10">
    <div className="absolute -top-6 -left-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">🎀</div>
    <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">🎀</div>
    {children}
  </div>
);

const Monchhichi = () => (
  <img 
    src="/monchhichi.jpg" 
    alt="Cute Monchhichi" 
    className="w-24 h-24 object-cover rounded-full mx-auto mb-6 shadow-md border-4 border-white"
  />
);

export default function App() {
  const [screen, setScreen] = useState<number | 'crying-cat'>(0);

  const nextScreen = () => {
    if (typeof screen === 'number') {
      setScreen(screen + 1);
    }
  };

  const handleConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      }));
      confetti(Object.assign({}, defaults, { particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      }));
    }, 250);
  };

  useEffect(() => {
    if (screen === 4) {
      handleConfetti();
    }
  }, [screen]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-pink-100 to-pink-200">
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white rounded-full mix-blend-overlay filter blur-xl"></div>
      </div>

      <AnimatePresence mode="wait">
        
        {/* Screen 1: Hero */}
        {screen === 0 && (
          <ScreenWrapper key="hero">
            <CardContainer>
              <Monchhichi />
              <h1 className="text-3xl md:text-4xl font-bold text-pink-500 mb-8 leading-tight">
                Приглашаю тебя <br/>на мой день рождения
              </h1>
              <button 
                onClick={nextScreen}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center justify-center mx-auto"
              >
                Далее <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </CardContainer>
          </ScreenWrapper>
        )}

        {/* Screen 2: Decision */}
        {screen === 1 && (
          <ScreenWrapper key="decision">
            <CardContainer>
              <Monchhichi />
              <h2 className="text-2xl font-bold text-pink-600 mb-8 leading-snug">
                Ты можешь прийти 23 августа на мой день рождения?
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={nextScreen}
                  className="flex-1 bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-lg"
                >
                  Да! 💖
                </button>
                <button 
                  onClick={() => setScreen('crying-cat')}
                  className="flex-1 bg-white hover:bg-gray-50 text-pink-400 font-bold py-3 px-6 rounded-full transition-all transform hover:scale-105 shadow-md border-2 border-pink-200"
                >
                  Нет 🥺
                </button>
              </div>
            </CardContainer>
          </ScreenWrapper>
        )}

        {/* Screen: Crying Cat */}
        {screen === 'crying-cat' && (
          <ScreenWrapper key="crying-cat" className="bg-pink-100">
            <div className="text-center">
              <img src="/crying-cat.jpg" alt="Crying Cat" className="w-64 h-64 md:w-96 md:h-96 object-cover rounded-3xl mx-auto mb-8 shadow-2xl border-8 border-white" />
              <h2 className="text-3xl font-bold text-pink-500 mb-6">Очень жаль...</h2>
              <button 
                onClick={() => setScreen(1)}
                className="bg-white text-pink-500 font-bold py-2 px-6 rounded-full shadow hover:bg-pink-50 transition-colors"
              >
                Я передумал(а)! Вернуться назад
              </button>
            </div>
          </ScreenWrapper>
        )}

        {/* Screen 3: Map */}
        {screen === 2 && (
          <ScreenWrapper key="map">
            <CardContainer>
              <Monchhichi />
              <h2 className="text-xl font-bold text-pink-600 mb-4 flex items-center justify-center">
                <MapPin className="mr-2" /> Адрес
              </h2>
              <p className="text-gray-700 mb-6 font-medium">
                Проспект Абая, 103А, город Уральск, ЗКО, Казахстан
              </p>
              <div className="w-full h-48 bg-gray-200 rounded-xl mb-6 overflow-hidden shadow-inner relative border-2 border-pink-100">
                <iframe 
                  src="https://maps.google.com/maps?q=Проспект%20Абая,%20103А,%20Уральск&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                  width="100%" 
                  height="100%" 
                  style={{border:0}} 
                  allowFullScreen={true} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                  className="absolute inset-0"
                ></iframe>
              </div>
              <button 
                onClick={nextScreen}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg w-full flex justify-center items-center"
              >
                Далее <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </CardContainer>
          </ScreenWrapper>
        )}

        {/* Screen 4: Time */}
        {screen === 3 && (
          <ScreenWrapper key="time">
            <CardContainer>
              <Monchhichi />
              <h2 className="text-2xl font-bold text-pink-600 mb-4 flex items-center justify-center">
                <Clock className="mr-2" /> Время встречи
              </h2>
              <div className="text-4xl font-extrabold text-pink-400 mb-8 my-6 py-4 border-y-2 border-pink-100 border-dashed">
                16:00 <span className="text-xl text-pink-300">(4 часа дня)</span>
              </div>
              <button 
                onClick={nextScreen}
                className="bg-pink-400 hover:bg-pink-500 text-white font-bold py-3 px-8 rounded-full transition-all transform hover:scale-105 shadow-lg w-full flex justify-center items-center"
              >
                Далее <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </CardContainer>
          </ScreenWrapper>
        )}

        {/* Screen 5: Celebration */}
        {screen === 4 && (
          <ScreenWrapper key="celebration">
            <CardContainer>
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <Monchhichi />
              </motion.div>
              <h1 className="text-4xl font-extrabold text-pink-500 mb-4 flex items-center justify-center gap-2">
                <Heart className="fill-pink-400 text-pink-400" /> Очень жду! <Heart className="fill-pink-400 text-pink-400" />
              </h1>
              <p className="text-pink-400 font-medium mt-4">До скорой встречи! 🎀</p>
            </CardContainer>
          </ScreenWrapper>
        )}

      </AnimatePresence>
    </div>
  );
}
