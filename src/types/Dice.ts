//export type DiceSymbol = "SWORD" | "BANG" | "HEART";

export interface DiceFace {
  value: number;
  symbol: string;
  textColor: string;
}

export interface DiceAction {
  numbers: Map<string, number>;
  isLargeStraight: boolean;
  isSmallStraight: boolean;
}