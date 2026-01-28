import type { Hero } from "../types/Hero";

export const BARBARIAN: Hero = {
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
  symbols: ["BANG", "HEART", "SWORD"],
};

export const HEROES = {
    BARBARIAN: BARBARIAN
}