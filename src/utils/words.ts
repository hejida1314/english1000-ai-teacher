import { WordCard } from "../types";

const DAY_MS = 24 * 60 * 60 * 1000;

export function createWordCard(word: string, meaning: string, sentence: string): WordCard {
  return {
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    word: word.trim(),
    meaning: meaning.trim(),
    sentence: sentence.trim(),
    ease: 1,
    dueAt: new Date().toISOString(),
    createdAt: new Date().toISOString()
  };
}

export function reviewWord(card: WordCard, grade: "forgot" | "hard" | "know" | "easy"): WordCard {
  const days =
    grade === "forgot"
      ? 1
      : grade === "hard"
        ? 2
        : grade === "know"
          ? Math.max(3, card.ease * 3)
          : Math.max(7, card.ease * 7);

  return {
    ...card,
    ease: grade === "forgot" ? 1 : Math.min(5, card.ease + (grade === "easy" ? 1 : 0.5)),
    dueAt: new Date(Date.now() + days * DAY_MS).toISOString()
  };
}

export function isDue(card: WordCard): boolean {
  return new Date(card.dueAt).getTime() <= Date.now();
}
