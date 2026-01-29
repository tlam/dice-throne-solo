import type { DiceOutcome, DiceFace } from "../types/Dice";
import type { Hero } from "../types/Hero";

export function barbarianActions(outcome: DiceOutcome) {
  /*

     BARBARIAN

   SMACK
   - 3 swords: 4 dmg
   - 4 swords: 6 dmg
   - 5 swords: 7 dmg

   STURDY BLOW
   - 2 swords, 2 bangs: 4 dmg

   FORTITUDE
   - 3 hearts: heal 4
   - 4 hearts: heal 5
   - 5 hearts: heal 6

   OVERPOWER
   - 3 swords, 2 bangs: roll another 3, total value is damage

   MIGHTY BLOW
   - small straight: 9 dmg

   CRIT BASH
   - 4 bangs: 5 dmg + stun

   RECKLESS
   - large straight: 15 dmg, take 4 dmg

   THICK SKIN
   - roll 3 to heal 2 per heart

   RAGE (ULTIMATE)
   - 5 bangs: 15 dmg + stun
   */

  let actions = [];

  if (outcome.isLargeStraight) {
    actions.push("RECKLESS");
  } else if (outcome.isSmallStraight) {
    actions.push("MIGHTY_BLOW")
  }

  const bangCount = outcome.numbers.get("BANG");
  const heartCount = outcome.numbers.get("HEART");
  const swordCount = outcome.numbers.get("SWORD");

  if (swordCount) {
    if (swordCount === 3) {
      actions.push("SMACK_1");
    } else if (swordCount === 4) {
      actions.push("SMACK_2");
    } else if (swordCount === 5) {
      actions.push("SMACK_3");
    }

    if (bangCount) {
      if (bangCount === 2 && swordCount === 2) {
        actions.push("STURDY_BLOW");
      } else if (bangCount == 2 && swordCount === 3) {
        actions.push("OVERPOWER");
      }
    }
  }

  if (bangCount) {
    if (bangCount === 4) {
      actions.push("CRIT_BASH");
    } else if (bangCount === 5) {
      actions.push("RAGE");
    }
  }

  if (heartCount) {
    if (heartCount === 3) {
      actions.push("FORTITUDE_1")
    } else if (heartCount === 4) {
      actions.push("FORTITUDE_2")
    } else if (heartCount === 5) {
      actions.push("FORTITUDE_3")
    }
  }

  return actions;
}

export function diceAction(dice: DiceFace[]) {
  /*
    TODO: get selected dice
    - activate the action
    - deal damage to boss or heal or something else
    - start next turn

    1,2,3,4,5
    2,3,4,5,6

    1,2,3,4
    2,3,4,5
    3,4,5,6
  */

  let actions = new Map<string, number>();
  let sequence: number[] = [];

  for (let die of dice) {
    sequence.push(die.value);
    const value = actions.get(die.symbol);

    if (value) {
      actions.set(die.symbol, value + 1);
    } else {
      actions.set(die.symbol, 1);
    }
  }

  sequence.sort()
  sequence = [...new Set(sequence)];
  let sequenceString: string = sequence.join("");

  const isLargeStraight: boolean = sequenceString === "12345" || sequenceString === "23456";
  const isSmallStraight: boolean = sequenceString === "1234" || sequenceString === "2345" || sequenceString === "3456";

  let outcome: DiceOutcome = {
    numbers: actions,
    isLargeStraight: isLargeStraight,
    isSmallStraight: isSmallStraight
  };

  return outcome;
};

export function heroAbilities(hero: Hero, dice: DiceFace[]) {
  /*
   return a list of possible hero abilities based on the dice roll




   features/abilities
     barbarian.ts, match and return a new type with dmg, heal, effects and own damage


   */
};