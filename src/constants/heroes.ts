import type { Hero } from "../types/Hero";

export type HeroType = "BARBARIAN" | "MOON_ELF";

export const BARBARIAN: Hero = {
  name: "Barbarian",
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
  diceBorderColor: "border-orange-900",
  diceColor: "oklch(50.5% 0.213 27.518)",
  selectedDice: [],
  remainingDice: [],
  boardImage: "https://cdn.shopify.com/s/files/1/0045/4013/7562/t/9/assets/a716b64ef4a9--5.component-spread-barbarian-829552.png?v=1601922898",
  portraitImage: "https://cdn.shopify.com/s/files/1/0045/4013/7562/t/9/assets/23cdd7857385--1.portrait-10-fd6be4.png?v=1603802781",
  symbols: ["BANG", "HEART", "SWORD"],
  outcome: [],
  abilities: {
    "SMACK_1": { name: "SMACK", damage: 4, selfDamage: 0, heal: 0, effect: ""},
    "SMACK_2": { name: "SMACK", damage: 6, selfDamage: 0, heal: 0, effect: ""},
    "SMACK_3": { name: "SMACK", damage: 8, selfDamage: 0, heal: 0, effect: ""},
    "STURDY_BLOW": { name: "STURDY BLOW", damage: 4, selfDamage: 0, heal: 0, effect: ""},
    "FORTITUDE_1": { name: "FORTITUDE", damage: 0, selfDamage: 0, heal: 4, effect: ""},
    "FORTITUDE_2": { name: "FORTITUDE", damage: 0, selfDamage: 0, heal: 5, effect: ""},
    "FORTITUDE_3": { name: "FORTITUDE", damage: 0, selfDamage: 0, heal: 6, effect: ""},
    "MIGHTY_BLOW": { name: "MIGHTY BLOW", damage: 9, selfDamage: 0, heal: 0, effect: ""},
    "CRIT_BASH": { name: "CRIT BASH", damage: 5, selfDamage: 0, heal: 0, effect: "STUN"},
    "RECKLESS": { name: "RECKLESS", damage: 15, selfDamage: 0, heal: 0, effect: ""},
    "RAGE": { name: "RAGE", damage: 15, selfDamage: 0, heal: 0, effect: "STUN"},    
  },
};

export const MOON_ELF: Hero = {
  name: "Moon Elf",
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
  diceBorderColor: "border-blue-900",
  diceColor: "oklch(0.3735 0.148 288)",
  selectedDice: [],
  remainingDice: [],
  boardImage: "https://cdn.shopify.com/s/files/1/0045/4013/7562/t/9/assets/a716b64ef4a9--5.component-spread-4f2283.png?v=1602727498",
  portraitImage: "https://cdn.shopify.com/s/files/1/0045/4013/7562/t/9/assets/23cdd7857385--1.portrait-11-586e54.png?v=1603802806",
  symbols: ["BANG", "HEART", "SWORD"],
  outcome: [],
  abilities: {
    "SMACK_1": { name: "SMACK", damage: 4, selfDamage: 0, heal: 0, effect: ""},
    "SMACK_2": { name: "SMACK", damage: 6, selfDamage: 0, heal: 0, effect: ""},
    "SMACK_3": { name: "SMACK", damage: 8, selfDamage: 0, heal: 0, effect: ""},
    "STURDY_BLOW": { name: "STURDY BLOW", damage: 4, selfDamage: 0, heal: 0, effect: ""},
    "FORTITUDE_1": { name: "FORTITUDE", damage: 0, selfDamage: 0, heal: 4, effect: ""},
    "FORTITUDE_2": { name: "FORTITUDE", damage: 0, selfDamage: 0, heal: 5, effect: ""},
    "FORTITUDE_3": { name: "FORTITUDE", damage: 0, selfDamage: 0, heal: 6, effect: ""},
    "MIGHTY_BLOW": { name: "MIGHTY BLOW", damage: 9, selfDamage: 0, heal: 0, effect: ""},
    "CRIT_BASH": { name: "CRIT BASH", damage: 5, selfDamage: 0, heal: 0, effect: "STUN"},
    "RECKLESS": { name: "RECKLESS", damage: 15, selfDamage: 0, heal: 0, effect: ""},
    "RAGE": { name: "RAGE", damage: 15, selfDamage: 0, heal: 0, effect: "STUN"},    
  },
};

export const HEROES: Record<HeroType, Hero> = {
  BARBARIAN,
  MOON_ELF
} as const;
