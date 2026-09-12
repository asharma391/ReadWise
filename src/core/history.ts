import type { Result } from '../types';
import { passages } from '../data/passages';
export const HISTORY_KEY = 'readwise:sessions:v1';
export function parseHistory(raw: string | null): Result[] {
  try {
    const value: unknown = JSON.parse(raw ?? '[]');
    if (!Array.isArray(value)) return [];
    return value
      .filter((item): item is Result => {
        if (!item || typeof item !== 'object') return false;
        const passage = passages.find((p) => p.id === item.passageId);
        return (
          !!passage &&
          typeof item.id === 'string' &&
          typeof item.completedAt === 'string' &&
          Number.isFinite(Date.parse(item.completedAt)) &&
          Number.isFinite(item.seconds) &&
          item.seconds > 0 &&
          Number.isInteger(item.words) &&
          item.words > 0 &&
          Number.isInteger(item.correct) &&
          item.correct >= 0 &&
          item.total === passage.questions.length &&
          item.correct <= item.total &&
          (item.wpm === null ||
            (Number.isInteger(item.wpm) && item.wpm >= 0)) &&
          Array.isArray(item.answers) &&
          item.answers.length === item.total &&
          item.answers.every(
            (a: unknown, i: number) =>
              typeof a === 'number' &&
              Number.isInteger(a) &&
              a >= 0 &&
              a < passage.questions[i].options.length,
          )
        );
      })
      .slice(0, 20);
  } catch {
    return [];
  }
}
