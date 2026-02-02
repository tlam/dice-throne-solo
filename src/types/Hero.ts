import type { DiceFace } from "./Dice";

export interface HeroAbility {
  name: string;
  damage: number;
  selfDamage: number;
  heal: number;
  effect: string;
};

export interface Hero {
  name: string;
  status: string;
  rolls: number;
  health: number;
  dice: DiceFace[];
  diceBorderColor: string;
  diceColor: string;
  selectedDice: DiceFace[];
  remainingDice: DiceFace[];
  boardImage: string;
  portraitImage: string;
  symbols: string[];
  outcome: string[];
  abilities: Record<string, HeroAbility>; 
}
