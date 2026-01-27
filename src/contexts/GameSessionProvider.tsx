import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { GameSession } from "../types/GameSession";

interface GameSessionContextType {
  gameSessions: Record<number, GameSession>;
  createGameSession: (id: number) => GameSession;
  getGameSession: (id: number) => GameSession | undefined;
  getHeroAction: (id: number) => string;
  updateGameSession: (id: number, rolls: number) => void;
  updateRoll: (id: number) => void;
}

const GameSessionContext = createContext<GameSessionContextType | undefined>(undefined);

export const useGameSession = () => {
  const context = useContext(GameSessionContext);
  if (!context) {
    throw new Error("useGameSession must be used within GameSessionProvider");
  }
  return context;
};

export function GameSessionProvider({ children }: { children: ReactNode }) {
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
          { value: 1, symbol: "SWORD", textColor: "text-white" },
          { value: 2, symbol: "SWORD", textColor: "text-white" },
          { value: 3, symbol: "BANG", textColor: "text-yellow-400" },
          { value: 4, symbol: "HEART", textColor: "text-red-300" },
          { value: 5, symbol: "HEART", textColor: "text-red-300" },
          { value: 6, symbol: "BANG", textColor: "text-yellow-400" }
        ],
        selectedDice: [],
        remainingDice: [],
        boardImage: "https://cdn.shopify.com/s/files/1/0045/4013/7562/t/9/assets/a716b64ef4a9--5.component-spread-barbarian-829552.png?v=1601922898",
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

  const updateGameSession = (id: number, rolls: number) => {
    setGameSessions(prevSessions => {
      const session = prevSessions[id];

      if (session) {
        return {
          ...prevSessions,
          [id]: {
            ...session,
            hero: {
              ...session.hero,
              rolls
            }
          }
        }
      }

      return prevSessions;
    });
  };

  const updateRoll = (id: number) => {
    setGameSessions(prevSessions => {
      const session = prevSessions[id];

      let rolls = 0;
      let status = session.hero.status;
      if (session.hero.rolls > 0) {
        rolls = session.hero.rolls - 1;

        if (rolls === 0) {
          status = "THIRD_ROLL";
        } else if (rolls === 1) {
          status = "SECOND_ROLL";
        } else if (rolls === 2) {
          status = "FIRST_ROLL";
        }
      }

      if (session) {
        return {
          ...prevSessions,
          [id]: {
            ...session,
            hero: {
              ...session.hero,
              rolls,
              status
            }
          }
        }
      }

      return prevSessions;
    });
  };

  const getHeroAction = (id: number) => {
    /*
    TODO: get selected dice
    - activate the action
    - deal damage to boss or heal or something else
    - start next turn
    */
    //const session = gameSessions[id];
    return "SMACK";
  };

  const value = {
    gameSessions,
    createGameSession,
    getHeroAction,
    getGameSession,
    updateGameSession,
    updateRoll
  };

  return (
    <GameSessionContext.Provider value={value}>
      {children}
    </GameSessionContext.Provider>
  );
};