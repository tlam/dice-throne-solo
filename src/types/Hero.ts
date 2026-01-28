import type { DiceFace } from "./Dice";

export interface Hero {
  name: string;
  status: string;
  rolls: number;
  health: number;
  dice: DiceFace[];
  selectedDice: DiceFace[];
  remainingDice: DiceFace[];
  boardImage: string;
  symbols: string[];
}