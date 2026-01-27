import type { ReactNode } from "react";
import { assert, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { GameSessionProvider, useGameSession } from "./GameSessionProvider";
import type { DiceFace } from "../types/Dice";
import { act } from "react";

const wrapper = ({ children }: { children: ReactNode}) => (
  <GameSessionProvider>{children}</GameSessionProvider>
);

test("Create game session", async () => {
  const { result } = renderHook(() => useGameSession(), { wrapper });

  act(() => {
    result.current.createGameSession(1);
  })

  const session = result.current.getGameSession(1);
  assert.equal(session?.hero.rolls, 3);
});

test("Update game session", async () => {
  const { result } = renderHook(() => useGameSession(), { wrapper });

  act(() => {
    result.current.createGameSession(1);
  });

  let session = result.current.getGameSession(1);
  assert.equal(session?.hero.rolls, 3);

  const face: DiceFace = {value: 1, symbol: "SWORD", textColor: "red"};
  act(() => {
    result.current.updateGameSession(1, [face]);
  });

  session = result.current.getGameSession(1);
  assert.equal(session?.hero.selectedDice[0], face);
});

test("Update roll", async () => {
  const { result } = renderHook(() => useGameSession(), { wrapper });

  act(() => {
    result.current.createGameSession(1);
  });

  let session = result.current.getGameSession(1);
  assert.equal(session?.hero.rolls, 3);

  act(() => {
    result.current.updateRoll(1);
  });

  session = result.current.getGameSession(1);
  assert.equal(session?.hero.rolls, 2);
  assert.equal(session?.hero.status, "FIRST_ROLL");
});