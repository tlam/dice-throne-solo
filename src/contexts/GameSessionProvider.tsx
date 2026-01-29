import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { BARBARIAN } from "../constants/heroes";
import type { DiceAction, DiceFace } from "../types/Dice";
import type { GameSession } from "../types/GameSession";

interface GameSessionContextType {
  gameSessions: Record<number, GameSession>;
  createGameSession: (id: number) => GameSession;
  getGameSession: (id: number) => GameSession | undefined;
  getHeroAction: (id: number) => string;
  updateGameSession: (id: number, selectedDice: DiceFace[]) => void;
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
      hero: BARBARIAN,
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

  const updateGameSession = (id: number, selectedDice: []) => {
    setGameSessions(prevSessions => {
      const session = prevSessions[id];

      if (session) {
        return {
          ...prevSessions,
          [id]: {
            ...session,
            hero: {
              ...session.hero,
              selectedDice
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
    - get matching hero abilities
    - deal damage to boss or heal or something else
    - start next turn


    - After each roll, display possible actions
    - before resolve is clicked, ensure only one action is selected
    */

    return "SMACK"
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