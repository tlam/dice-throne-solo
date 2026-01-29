import { expect, test } from "vitest";
import { barbarianActions, diceAction } from "./ability";
import type { DiceFace } from "../types/Dice";

test("Dice action large straight", async () => {
  const dice: DiceFace[] = [
    { value: 1, symbol: "SWORD", textColor: "text-white" },
    { value: 2, symbol: "SWORD", textColor: "text-white" },
    { value: 3, symbol: "BANG", textColor: "text-yellow-400" },
    { value: 4, symbol: "HEART", textColor: "text-red-300" },
    { value: 5, symbol: "HEART", textColor: "text-red-300" }
  ];
    
  const action = diceAction(dice);
  expect(action.isLargeStraight).toBeTruthy();
});

test("Dice action small straight", async () => {
  const dice: DiceFace[] = [
    { value: 2, symbol: "SWORD", textColor: "text-white" },
    { value: 2, symbol: "SWORD", textColor: "text-white" },
    { value: 3, symbol: "BANG", textColor: "text-yellow-400" },
    { value: 4, symbol: "HEART", textColor: "text-red-300" },
    { value: 5, symbol: "HEART", textColor: "text-red-300" }
  ];
    
  const action = diceAction(dice);
  expect(action.isSmallStraight).toBeTruthy();
});

test("Barbarian actions", async () => {
  const dice: DiceFace[] = [
    { value: 2, symbol: "SWORD", textColor: "text-white" },
    { value: 2, symbol: "SWORD", textColor: "text-white" },
    { value: 3, symbol: "BANG", textColor: "text-yellow-400" },
    { value: 4, symbol: "HEART", textColor: "text-red-300" },
    { value: 5, symbol: "HEART", textColor: "text-red-300" }
  ];
  const outcome = diceAction(dice);
  const actions = barbarianActions(outcome);
  expect(actions).toEqual(["MIGHTY_BLOW"]);
});