import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DiceIcon } from "./components/DiceIcon";
import { useGameSession } from "./contexts/GameSessionProvider";
import type { DiceFace } from "./types/Dice";

interface DiceResult {
  face: DiceFace;
  index: number;
}

function GamePage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { activatetHeroAction, getGameSession, updateGameSession, updateRoll } = useGameSession();

  const gameSession = id ? getGameSession(parseInt(id)) : undefined;

  const initialDice: DiceResult[] = [];
  if (gameSession) {
    const dice = gameSession.hero.dice;

    for (let i: number = 0; i < dice.length - 1; i++) {
      initialDice.push({
        face: dice[i],
        index: i
      });
    }
  }

  const [diceResults, setDiceResults] = useState<DiceResult[]>(initialDice);
  const [selectedDice, setSelectedDice] = useState<DiceResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const rollDice = (): void => {
    if (gameSession && gameSession?.hero.rolls > 0) {
      const diceFaces = gameSession.hero.dice;
      updateRoll(gameSession.id);
  
      setIsRolling(true);
  
      // Roll 5 dice (minus the selected dice)
      const numDiceToRoll = 5 - selectedDice.length;
      const results: DiceResult[] = [];
    
      // Use timestamp + index to ensure unique keys
      const baseIndex = Date.now();
    
      for (let i = 0; i < numDiceToRoll; i++) {
        const randomIndex = Math.floor(Math.random() * 6);
        results.push({
          face: diceFaces[randomIndex],
          index: baseIndex + i  // ← Unique index
        });
      }
  
      // Simulate rolling animation
      setTimeout(() => {
        setDiceResults(results);
        setIsRolling(false);
      }, 500);
    } else {
      setIsRolling(false);
    }
  };

  const handleSelectedDice = (diceSelected: DiceResult): void => {
    if (gameSession && gameSession.hero.status !== "START") {
      const newSelectedDice = [...selectedDice, diceSelected];
      setSelectedDice(prev => [...prev, diceSelected]);
      setDiceResults(prev => prev.filter(d => d.index !== diceSelected.index));

      const faces: DiceFace[] = newSelectedDice.map(dice => dice.face);
      updateGameSession(gameSession.id, faces);
    }
  };

  const handleUnkeepDice = (diceToUnkeep: DiceResult): void => {
    if (gameSession && gameSession.hero.status !== "START") {  
      const newSelectedDice = selectedDice.filter(d => d.index !== diceToUnkeep.index);

      setDiceResults(prev => [...prev, diceToUnkeep]);
      setSelectedDice(newSelectedDice);

      const faces = newSelectedDice.map(dice => dice.face);
      updateGameSession(gameSession.id, faces);    
    }
  };

  const resolve = (): void => {
    if (gameSession) {
      activatetHeroAction(gameSession.id);
    }
  };

  const handleBackHome = (): void => {
    navigate("/");
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

  // Combine selected dice and rolled dice for summary
  const allDice = [...selectedDice, ...diceResults];

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

        {/* Selected Dice Section */}
        {selectedDice.length > 0 && (
          <div className="mb-4 bg-gradient-to-br from-green-900 to-green-800 rounded-lg p-4 border border-green-600">
            <h3 className="text-xl font-bold mb-4 text-center">Selected Dice</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {selectedDice.map((result) => (
                <div
                  key={result.index}
                  onClick={() => handleUnkeepDice(result)}
                  className={`relative w-28 h-28 rounded-xl 
                    shadow-lg
                    transition-all duration-300 
                    hover:scale-105 cursor-pointer
                    border-2 border-green-400`}
                  style={{
                    backgroundColor: 'oklch(50.5% 0.213 27.518)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,0,0,0.1), inset 0 2px 8px rgba(255,255,255,0.1)'
                  }}
                >
                  {/* Value in top left */}
                  <div className={`absolute top-2 left-2 text-2xl font-bold ${result.face.textColor}`}>
                    {result.face.value}
                  </div>
                  
                  {/* Symbol in bottom right */}
                  <div className={`absolute bottom-1 right-1 ${result.face.textColor} drop-shadow-md`}>
                    <DiceIcon symbol={result.face.symbol} />
                  </div>
                </div>
              ))}
            </div>
            {gameSession.hero.outcome.length > 0 && (
            <div className="flex justify-center gap-4 flex-wrap mt-4">
              {gameSession.hero.outcome.map((option, index) => (
              <div 
                key={index}
                className="flex items-center px-4 py-2 border border-slate-600 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors cursor-pointer"
              >
                <input 
                  id={`outcome-${index}`}
                  type="radio" 
                  value={option} 
                  name="hero-outcome" 
                  className="w-4 h-4 text-green-500 border-slate-500 bg-slate-800 focus:ring-2 focus:ring-green-400 cursor-pointer"
                />
                <label 
                  htmlFor={`outcome-${index}`}
                  className="ml-2 text-sm font-medium text-white select-none cursor-pointer"
                >
                  {option}
                </label>
              </div>
              ))}
            </div>
            )}
          </div>
        )}

        {/* Rolled Dice Section */}
        {diceResults.length > 0 && (
          <div className="mb-4 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg p-4 border border-slate-700">
            <h3 className="text-xl font-bold mb-4 text-center">Rolled Dice (Click to Select)</h3>
            <div className="flex justify-center gap-4 flex-wrap">
              {diceResults.map((result) => (
                <div
                  key={result.index}
                  onClick={() => handleSelectedDice(result)}
                  className={`relative w-28 h-28 rounded-xl 
                    shadow-lg
                    transition-all duration-300 
                    ${isRolling ? 'animate-spin' : 'hover:scale-105 cursor-pointer'}
                    border-2 border-orange-900`}
                  style={{
                    backgroundColor: 'oklch(50.5% 0.213 27.518)',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.3), inset 0 -2px 8px rgba(0,0,0,0.1), inset 0 2px 8px rgba(255,255,255,0.1)'
                  }}
                >
                  {/* Value in top left */}
                  <div className={`absolute top-2 left-2 text-2xl font-bold ${result.face.textColor}`}>
                    {result.face.value}
                  </div>
                  
                  {/* Symbol in bottom right */}
                  <div className={`absolute bottom-1 right-1 ${result.face.textColor} drop-shadow-md`}>
                    <DiceIcon symbol={result.face.symbol} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Dice Summary */}
            <div className="mt-4 flex justify-center gap-8 text-sm bg-slate-900 rounded-lg p-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="text-white scale-75">
                    <DiceIcon symbol="SWORD" />
                  </div>
                </div>
                <span className="text-slate-400">Swords:</span>
                <span className="font-bold text-white text-lg">
                  {allDice.filter(r => r.face.symbol === 'SWORD').length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="text-yellow-400 scale-75">
                    <DiceIcon symbol="BANG" />
                  </div>
                </div>
                <span className="text-slate-400">Bangs:</span>
                <span className="font-bold text-yellow-400 text-lg">
                  {allDice.filter(r => r.face.symbol === 'BANG').length}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <div className="text-red-300 scale-75">
                    <DiceIcon symbol="HEART" />
                  </div>
                </div>
                <span className="text-slate-400">Hearts:</span>
                <span className="font-bold text-red-300 text-lg">
                  {allDice.filter(r => r.face.symbol === 'HEART').length}
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
          <button
            onClick={resolve}
            className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex-1 bg-green-600 hover:bg-green-500`}
          >Resolve</button>
        </div>

        {/* Reference Image */}
        <div>
          <img 
            src={gameSession.hero.boardImage}
            alt="Barbarian dice reference"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}

export default GamePage;