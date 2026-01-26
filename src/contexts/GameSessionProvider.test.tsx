import type { ReactNode } from "react";
import { assert, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { GameSessionProvider, useGameSession } from "./GameSessionProvider";
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

  act(() => {
    result.current.updateGameSession(1, 2);
  });

  session = result.current.getGameSession(1);
  assert.equal(session?.hero.rolls, 2);
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
  assert.equal(session?.hero.status, "SECOND_ROLL");
});