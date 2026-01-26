import { assert, test } from "vitest";
import { renderHook } from "@testing-library/react";
import { GameSessionState } from "./game-session-state";
import { act } from "react";

test("Create game session", async () => {
  const { result } = renderHook(() => GameSessionState());

  act(() => {
    result.current.createGameSession(1);
  })

  const session = result.current.getGameSession(1);
  assert.equal(session?.hero.rolls, 3);
});

test("Update rolls", async () => {
  const { result } = renderHook(() => GameSessionState());

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