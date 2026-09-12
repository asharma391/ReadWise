import { describe, expect, it } from 'vitest';
import { assess, feedback, recommend, wordCount } from '../src/core/assessment';
import { createReadingTimer } from '../src/core/timer';
import { passages } from '../src/data/passages';
import { parseHistory } from '../src/core/history';
const passage = passages[0];
const correct = passage.questions.map((q) => q.answer);
describe('reading assessment', () => {
  it('counts real passage words without subtracting a hardcoded instruction length', () => {
    expect(wordCount([' Hello,  world! ', 'A reader’s well-loved book.'])).toBe(
      6,
    );
    expect(wordCount([])).toBe(0);
    expect(wordCount(passage.paragraphs)).toBe(103);
  });
  it('scores each question independently and derives pace from reading time only', () => {
    const result = assess(passage, correct, 60);
    expect(result.correct).toBe(4);
    expect(result.wpm).toBe(wordCount(passage.paragraphs));
    const answers = [...correct];
    answers[0] = (answers[0] + 1) % 4;
    expect(assess(passage, answers, 60).correct).toBe(3);
    expect(correct).toEqual(passage.questions.map((q) => q.answer));
  });
  it('rejects incomplete answers and invalid timings', () => {
    expect(() => assess(passage, [], 10)).toThrow();
    expect(() => assess(passage, [0, 1, NaN, 3], 10)).toThrow();
    expect(() => assess(passage, [0, 1, 99, 3], 10)).toThrow();
    for (const duration of [0, -1, NaN, Infinity])
      expect(() => assess(passage, correct, duration)).toThrow();
  });
  it('does not present a meaningful speed for an implausibly brief session', () => {
    expect(assess(passage, correct, 1).wpm).toBeNull();
    expect(assess(passage, correct, 5).wpm).not.toBeNull();
  });
  it('has safe recommendations for every possible score', () => {
    for (let score = 0; score <= 4; score++) {
      const result = { correct: score, total: 4 };
      expect(feedback(result).text.length).toBeGreaterThan(20);
      expect(recommend(result)).toHaveLength(2);
    }
    expect(feedback({ correct: 0, total: 4 }).band).toBe('build');
    expect(feedback({ correct: 2, total: 4 }).band).toBe('explore');
    expect(feedback({ correct: 3, total: 4 }).band).toBe('stretch');
  });
  it('catalogue questions have unique ids and valid answer keys', () => {
    const ids = passages.flatMap((p) => p.questions.map((q) => q.id));
    expect(new Set(ids).size).toBe(ids.length);
    for (const p of passages) {
      expect(p.questions).toHaveLength(4);
      for (const q of p.questions) {
        expect(q.options[q.answer]).toBeTruthy();
        expect(q.explanation.length).toBeGreaterThan(20);
      }
    }
  });
});
describe('reading timer', () => {
  it('includes the first paragraph and excludes pauses', () => {
    let now = 1000;
    const timer = createReadingTimer(() => now);
    timer.start();
    now += 4000;
    expect(timer.seconds()).toBe(4);
    timer.pause();
    now += 20000;
    expect(timer.seconds()).toBe(4);
    timer.resume();
    now += 6000;
    expect(timer.seconds()).toBe(10);
    timer.pause();
    now += 30000;
    expect(timer.seconds()).toBe(10);
  });
  it('handles repeated pause/resume and resets for a new passage', () => {
    let now = 0;
    const timer = createReadingTimer(() => now);
    timer.start();
    now = 2000;
    timer.pause();
    timer.pause();
    now = 4000;
    timer.resume();
    timer.resume();
    now = 7000;
    expect(timer.seconds()).toBe(5);
    timer.start();
    expect(timer.seconds()).toBe(0);
  });
});
describe('local history', () => {
  it('recovers from corrupt or unknown records', () => {
    for (const raw of [
      null,
      'bad',
      '{}',
      '[null]',
      '[{"passageId":"unknown"}]',
    ])
      expect(parseHistory(raw)).toEqual([]);
  });
  it('validates saved sessions and bounds retained history', () => {
    const result = {
      ...assess(passage, correct, 60),
      id: 'session',
      completedAt: '2026-09-12T18:00:00Z',
    };
    expect(parseHistory(JSON.stringify([result]))).toEqual([result]);
    expect(
      parseHistory(JSON.stringify([{ ...result, answers: [99, 99, 99, 99] }])),
    ).toEqual([]);
    expect(
      parseHistory(
        JSON.stringify(
          Array.from({ length: 30 }, (_, i) => ({ ...result, id: String(i) })),
        ),
      ),
    ).toHaveLength(20);
  });
});
