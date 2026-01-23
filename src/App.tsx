import { useState, createContext, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Home";
import GamePage from "./Game";

export interface Hero {
  name: string;
  status: string;
  rolls: number;
  health: number;
  dice: any;
  selectedDice: any;
  remainingDice: any;
}

export interface GameSession {
  id: number;
  turn: number;
  status: string;
  bossName: string;
  bossHealth: number;
  hero: Hero;
}

interface GameSessionContextType {
  gameSessions: Record<number, GameSession>;
  createGameSession: (id: number) => GameSession;
  getGameSession: (id: number) => GameSession | undefined;
}

const GameSessionContext = createContext<GameSessionContextType | undefined>(undefined);

export const useGameSession = () => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error("useGameSession must be used within GameSessionProvider");
  }
  return context;
};

function App() {
  const [gameSessions, setGameSessions] = useState<Record<number, GameSession>>({});

  const createGameSession = (id: number): GameSession => {
    const newSession: GameSession = {
      id: 1,
      turn: 1,
      status: "CREATED",
      bossName: "ZeBoss",
      bossHealth: 50,
      hero: {
        name: "Babarian",
        status: "START",
        rolls: 3,
        health: 25,
        dice: [
          {value: 1, symbol: "SWORD"},
          {value: 2, symbol: "SWORD"},
          {value: 3, symbol: "BANG"},
          {value: 4, symbol: "HEART"},
          {value: 5, symbol: "HEART"},
          {value: 6, symbol: "BANG"}
        ],
        selectedDice: [],
        remainingDice: []
      }
    };
    setGameSessions(prev => ({
      ...prev,
      [id]: newSession
    }));
    return newSession;
  };

  const getGameSession = (id: number): GameSession | undefined => {
    return gameSessions[id];
  };

  return (
    <BrowserRouter basename="/dice-throne-solo">
      <GameSessionContext.Provider value={{ gameSessions, createGameSession, getGameSession }}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game/:id" element={<GamePage />} />
          </Routes>
        </div>
      </GameSessionContext.Provider>
    </BrowserRouter>
  );
}

export default App;
