import type { Scenario } from './scenarios';

/** Answers are zero-indexed: first option = 0, second = 1, etc. */
export function isValidAnswer(scenario: Scenario, index: number | null): index is number {
  return Number.isInteger(index) && index !== null && index >= 0 && index < scenario.answers.length;
}

export function isCorrectAnswer(scenario: Scenario, index: number | null): boolean {
  return isValidAnswer(scenario, index) && index === scenario.correct;
}
