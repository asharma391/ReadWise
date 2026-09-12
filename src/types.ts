export interface Question {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
  explanation: string;
}
export interface Passage {
  id: string;
  title: string;
  category: string;
  level: string;
  description: string;
  paragraphs: string[];
  questions: Question[];
}
export interface Result {
  id: string;
  passageId: string;
  completedAt: string;
  seconds: number;
  words: number;
  correct: number;
  total: number;
  wpm: number | null;
  answers: number[];
}
export interface Book {
  title: string;
  author: string;
  color: string;
  note: string;
}
