import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameSession } from "./contexts/GameSessionProvider";
import { HEROES } from "./constants/heroes";
import type { HeroType } from "./constants/heroes";

function HomePage() {
  const navigate = useNavigate();
  const { createGameSession } = useGameSession();
  const [selectedHero, setSelectedHero] = useState<HeroType | null>(null);

  const handleStart = (): void => {
    if (selectedHero) {
      createGameSession(1, selectedHero);
      navigate("/game/1");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="bg-white rounded-lg shadow-xl p-12 text-center max-w-4xl w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Select Your Hero
        </h1>
        <p className="text-gray-600 mb-8">
          Choose a hero to begin your battle
        </p>

        {/* Hero Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {Object.entries(HEROES).map(([heroType, hero]) => (
            <div
              key={heroType}
              onClick={() => setSelectedHero(heroType as HeroType)}
              className={`
                border-4 rounded-lg p-6 cursor-pointer transition-all duration-200
                ${selectedHero === heroType 
                  ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105' 
                  : 'border-gray-300 hover:border-indigo-400 hover:shadow-md'
                }
              `}
            >
              <div className="w-32 h-64 mx-auto mb-4 rounded-full flex items-center justify-center">
                <img 
                  src={hero.portraitImage}
                  alt={`${hero.name} portrait image`}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                {hero.name}
              </h3>

              {/* Selected Indicator */}
              {selectedHero === heroType && (
                <div className="mt-4 flex items-center justify-center gap-2 text-indigo-600 font-semibold">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Selected
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button
          onClick={handleStart}
          disabled={!selectedHero}
          className={`
            px-8 py-4 rounded-lg text-xl font-semibold transition-all duration-200 shadow-lg
            ${selectedHero
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-xl cursor-pointer'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }
          `}
        >
          {selectedHero ? 'Start Battle' : 'Select a Hero'}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
