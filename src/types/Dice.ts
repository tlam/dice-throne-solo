export type DiceSymbol = "SWORD" | "BANG" | "HEART";

export interface DiceFace {
  value: number;
  symbol: DiceSymbol;
  textColor: string;
}