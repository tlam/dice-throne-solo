import type { Hero } from "./Hero";

export interface GameSession {
  id: number;
  turn: number;
  status: string;
  bossName: string;
  bossHealth: number;
  hero: Hero;
}