import { useState } from "react";
import type { GameSession } from "../App";

export function GameSessionState() {
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

  return {createGameSession, getGameSession, updateGameSession};
};