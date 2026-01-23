import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGameSession } from "./App";

function GamePage(): JSX.Element {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getGameSession } = useGameSession();

  const gameSession = id ? getGameSession(parseInt(id)) : undefined;

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

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-2xl p-8 text-white">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-slate-700">
          <div>
            <h1 className="text-4xl font-bold mb-2">Dice Throne</h1>
            <p className="text-slate-400">Turn {gameSession.turn} • Session #{gameSession.id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-400">Status</p>
            <p className="text-xl font-bold text-yellow-400">{gameSession.status}</p>
          </div>
        </div>

        {/* Battle Display */}
        <div className="grid grid-cols-2 gap-8 mb-8">
          {/* Hero Card */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-lg p-6 border-2 border-blue-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{gameSession.hero.name}</h2>
              <span className="px-3 py-1 bg-blue-600 rounded-full text-sm font-semibold">
                HERO
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Health</span>
                  <span className="font-bold">{gameSession.hero.health}</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-sm text-slate-300">Rolls Available</span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        i < gameSession.hero.rolls ? 'bg-yellow-400' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <span className="text-sm text-slate-300">Status: </span>
                <span className="font-semibold text-blue-300">{gameSession.hero.status}</span>
              </div>
            </div>
          </div>

          {/* Boss Card */}
          <div className="bg-gradient-to-br from-red-900 to-red-800 rounded-lg p-6 border-2 border-red-500">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{gameSession.bossName}</h2>
              <span className="px-3 py-1 bg-red-600 rounded-full text-sm font-semibold">
                BOSS
              </span>
            </div>
            
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Health</span>
                  <span className="font-bold">{gameSession.bossHealth}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleBackHome}
            className="px-6 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-semibold transition-colors duration-200"
          >
            ← Back to Home
          </button>
          <button
            className="px-6 py-3 bg-green-600 hover:bg-green-500 rounded-lg font-semibold transition-colors duration-200 flex-1"
          >
            Roll Dice
          </button>
        </div>
      </div>
    </div>
  );
}

export default GamePage;
