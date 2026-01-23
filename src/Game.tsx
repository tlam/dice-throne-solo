import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGameSession } from "./App";

type DiceSymbol = "SWORD" | "BANG" | "HEART";

export interface DiceFace {
  value: number;
  symbol: DiceSymbol;
}

interface DiceResult {
  face: DiceFace;
  index: number;
}

function GamePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGameSession } = useGameSession();

  const gameSession = id ? getGameSession(parseInt(id)) : undefined;
  const [diceResults, setDiceResults] = useState<DiceResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const diceFaces: DiceFace[] = [
    { value: 1, symbol: "SWORD" },
    { value: 2, symbol: "SWORD" },
    { value: 3, symbol: "BANG" },
    { value: 4, symbol: "HEART" },
    { value: 5, symbol: "HEART" },
    { value: 6, symbol: "BANG" }
  ];

  const rollDice = (): void => {
    setIsRolling(true);
    
    // Roll 5 dice
    const results: DiceResult[] = [];
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * 6);
      results.push({
        face: diceFaces[randomIndex],
        index: i
      });
    }
    
    // Simulate rolling animation
    setTimeout(() => {
      setDiceResults(results);
      setIsRolling(false);
    }, 500);
  };

  const getSymbolIcon = (symbol: DiceSymbol)  => {
    switch (symbol) {
      case 'SWORD':
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <g transform="rotate(-45 50 50)">
              {/* Blade */}
              <rect x="45" y="10" width="10" height="50" fill="currentColor" />
              <polygon points="50,5 55,10 45,10" fill="currentColor" />
              {/* Guard */}
              <rect x="35" y="60" width="30" height="5" fill="currentColor" />
              {/* Handle */}
              <rect x="47" y="65" width="6" height="20" fill="currentColor" />
              {/* Pommel */}
              <circle cx="50" cy="88" r="5" fill="currentColor" />
            </g>
          </svg>
        );
      case 'BANG':
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <circle cx="50" cy="50" r="20" fill="currentColor" />
            <path
              d="M50 15 L55 35 M50 85 L55 65 M15 50 L35 45 M85 50 L65 55 M25 25 L40 40 M75 75 L60 60 M75 25 L60 40 M25 75 L40 60"
              stroke="currentColor"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </svg>
        );
      case 'HEART':
        return (
          <svg viewBox="0 0 100 100" className="w-12 h-12">
            <path
              d="M50 85 C25 65, 10 50, 10 35 C10 20, 20 10, 32 10 C40 10, 47 15, 50 22 C53 15, 60 10, 68 10 C80 10, 90 20, 90 35 C90 50, 75 65, 50 85 Z"
              fill="currentColor"
            />
          </svg>
        );
      default:
        return <span>?</span>;
    }
  };

  const getSymbolColor = (symbol: DiceSymbol): string => {
    switch (symbol) {
      case 'SWORD':
        return 'text-white';
      case 'BANG':
        return 'text-yellow-400';
      case 'HEART':
        return 'text-red-300';
      default:
        return 'text-gray-400';
    }
  };

  const getValueColor = (symbol: DiceSymbol): string => {
    switch (symbol) {
      case 'SWORD':
        return 'text-white';
      case 'BANG':
        return 'text-yellow-400';
      case 'HEART':
        return 'text-red-300';
      default:
        return 'text-gray-400';
    }
  };

  const handleBackHome = (): void => {
    navigate('/');
  };

  if (!gameSession) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="bg-white rounded-lg shadow-xl p-12 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Game Session Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            No game session exists with ID: {id}
          </p>
          <button
            onClick={handleBackHome}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const bossHealthPercentage = (gameSession.bossHealth / 50) * 100;
  const heroHealthPercentage = (gameSession.hero.health / 25) * 100;

  return (
    <div className="w-full max-w-[1800px] mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-2 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 pb-2 border-b border-slate-700">
          <div>
            <h1 className="text-2xl font-bold">Battle Arena</h1>
          </div>
          <div className="flex gap-6 text-sm">
            <div>
              <span className="text-slate-400">Turn:</span>
              <span className="font-bold ml-1">{gameSession.turn}</span>
            </div>
            <div>
              <span className="text-slate-400">Session:</span>
              <span className="font-bold ml-1">#{gameSession.id}</span>
            </div>
            <div>
              <span className="text-slate-400">Status:</span>
              <span className="font-bold text-yellow-400 ml-1">{gameSession.status}</span>
            </div>
          </div>
        </div>

        {/* Battle Display */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-4 border-2 border-blue-500">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">{gameSession.hero.name}</h2>
              <span className="px-2 py-1 bg-blue-600 rounded-full text-xs font-semibold">
                HERO
              </span>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Health</span>
                  <span className="font-bold">{gameSession.hero.health} / 25</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-green-400 h-full transition-all duration-500"
                    style={{ width: `${heroHealthPercentage}%` }}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center pt-1">
                <span className="text-xs text-slate-300">Rolls Available</span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < gameSession.hero.rolls ? 'bg-yellow-400' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-1">
                <span className="text-xs text-slate-300">Status: </span>
                <span className="font-semibold text-sm text-blue-300">{gameSession.hero.status}</span>
              </div>
            </div>
          </div>

          {/* Boss Card */}
          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-4 border-2 border-red-500">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold">{gameSession.bossName}</h2>
              <span className="px-2 py-1 bg-red-600 rounded-full text-xs font-semibold">
                BOSS
              </span>
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>Health</span>
                  <span className="font-bold">{gameSession.bossHealth} / 50</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-red-500 to-red-400 h-full transition-all duration-500"
                    style={{ width: `${bossHealthPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dice Roll Area */}
        {diceResults.length > 0 && (
          <div className="mb-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-center">Dice Results</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {diceResults.map((result) => (
                <div
                  key={result.index}
                  className={`relative w-28 h-28 rounded-xl 
                    shadow-lg
                    transition-all duration-300 
                    ${isRolling ? 'animate-spin' : 'hover:scale-105'}
                    border-2 border-orange-900`}
                  style={{
                    backgroundColor: 'oklch(50.5% 0.213 27.518)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,0,0,0.1), inset 0 2px 8px rgba(255,255,255,0.1)'
                  }}
                >
                  {/* Value in top left */}
                  <div className={`absolute top-2 left-2 text-2xl font-bold ${getValueColor(result.face.symbol)}`}>
                    {result.face.value}
                  </div>
                  
                  {/* Symbol in bottom right */}
                  <div className={`absolute bottom-1 right-1 ${getSymbolColor(result.face.symbol)} drop-shadow-md`}>
                    {getSymbolIcon(result.face.symbol)}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dice Summary */}
            <div className="mt-4 flex justify-center gap-8 text-sm bg-slate-900 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="text-white scale-75">
                    {getSymbolIcon('SWORD')}
                  </div>
                </div>
                <span className="text-slate-400">Swords:</span>
                <span className="font-bold text-white text-lg">
                  {diceResults.filter(r => r.face.symbol === 'SWORD').length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="text-yellow-400 scale-75">
                    {getSymbolIcon('BANG')}
                  </div>
                </div>
                <span className="text-slate-400">Bangs:</span>
                <span className="font-bold text-yellow-400 text-lg">
                  {diceResults.filter(r => r.face.symbol === 'BANG').length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="text-red-300 scale-75">
                    {getSymbolIcon('HEART')}
                  </div>
                </div>
                <span className="text-slate-400">Hearts:</span>
                <span className="font-bold text-red-300 text-lg">
                  {diceResults.filter(r => r.face.symbol === 'HEART').length}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleBackHome}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors duration-200"
          >
            ← Back to Home
          </button>
          <button
            onClick={rollDice}
            disabled={isRolling}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex-1 
              ${isRolling 
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-500'}`}
          >
            {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice'}
          </button>
        </div>

        {/* Reference Image */}
        <div>
          <img 
            src="https://cdn.shopify.com/s/files/1/0045/4013/7562/t/9/assets/a716b64ef4a9--5.component-spread-barbarian-829552.png?v=1601922898"
            alt="Barbarian dice reference"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default GamePage;
