import type { Passage, Result, Book } from '../types';
export function wordCount(paragraphs: string[]): number {
  return (
    paragraphs.join(' ').match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu)
      ?.length ?? 0
  );
}
export function assess(
  passage: Passage,
  answers: number[],
  seconds: number,
): Omit<Result, 'id' | 'completedAt'> {
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error('Reading time must be positive.');
  if (
    answers.length !== passage.questions.length ||
    passage.questions.some(
      (q, i) =>
        !Number.isInteger(answers[i]) ||
        answers[i] < 0 ||
        answers[i] >= q.options.length,
    )
  )
    throw new Error('Answer every question before submitting.');
  const words = wordCount(passage.paragraphs);
  const correct = passage.questions.filter(
    (q, i) => q.answer === answers[i],
  ).length;
  return {
    passageId: passage.id,
    seconds,
    words,
    correct,
    total: passage.questions.length,
    wpm: seconds < 5 ? null : Math.round((words / seconds) * 60),
    answers: [...answers],
  };
}
export function feedback(result: Pick<Result, 'correct' | 'total'>) {
  const score = result.correct / result.total;
  if (score >= 0.75)
    return {
      title: 'You caught the details.',
      text: 'You followed the passage closely. Try a longer story next, and keep giving the details your attention.',
      band: 'stretch' as const,
    };
  if (score >= 0.5)
    return {
      title: 'A good foundation to build on.',
      text: 'You picked up some key ideas. Take another look at the explanations, then try a story with a little more room to explore.',
      band: 'explore' as const,
    };
  return {
    title: 'Every reader starts somewhere.',
    text: 'Give yourself time to picture what is happening. Read the explanations below and try again when you feel ready.',
    band: 'build' as const,
  };
}
const books: Record<ReturnType<typeof feedback>['band'], Book[]> = {
  build: [
    {
      title: 'Charlotte’s Web',
      author: 'E. B. White',
      color: 'sage',
      note: 'A friendship story to explore at a comfortable pace.',
    },
    {
      title: 'The Secret Garden',
      author: 'Frances Hodgson Burnett',
      color: 'rose',
      note: 'Follow a discovery through vivid descriptions of nature.',
    },
  ],
  explore: [
    {
      title: 'The Hobbit',
      author: 'J. R. R. Tolkien',
      color: 'ochre',
      note: 'An adventure with a clear journey and a memorable cast.',
    },
    {
      title: 'The Secret Garden',
      author: 'Frances Hodgson Burnett',
      color: 'sage',
      note: 'Spend more time with character, setting, and change.',
    },
  ],
  stretch: [
    {
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      color: 'blue',
      note: 'Look for meaning in imagery, perspective, and what is left unsaid.',
    },
    {
      title: 'The Hobbit',
      author: 'J. R. R. Tolkien',
      color: 'ochre',
      note: 'Practice following a longer narrative and its small details.',
    },
  ],
};
export function recommend(result: Pick<Result, 'correct' | 'total'>): Book[] {
  return books[feedback(result).band];
}
