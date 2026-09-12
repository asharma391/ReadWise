# ReadWise

**🥈 2nd place @ HackOrange.**

Improve your reading comprehension and speed with ReadWise. Read passages, answer quizzes, and receive a speed score plus tailored book recommendations based on your results.

## What it does

It provides a reading test that presents a passage for students to read through, followed by a comprehension quiz. After submitting the quiz, the user is provided with their reading speed and a book recommendation based on their performance.

- Choose from three short passages, including the original forest passage.
- Read at your own pace, pause when needed, and adjust the text size.
- Answer four questions, review the explanations, and discover your next read.
- Keep your last 20 sessions in a reading journal saved only in your browser.

Book suggestions use simple comprehension-based rules. The scores are for practice, not a standardized reading-level assessment.

## Inspiration

When I was a student at my old elementary school, I noticed that many of the books available in the library were not at the appropriate reading level for students. Additionally, many students didn't have an interest in reading in the first place. Often, I was able to encourage students to start reading simply by suggesting them books that were appropriate to their level of reading. This inspired me to create a project that could address this issue.

## Run locally

Requires Node.js 22.12+.

```bash
git clone https://github.com/asharma391/ReadWise.git
cd ReadWise
npm ci
npm run dev
```

`npm test` runs the regression tests. `npm run build` checks the Vue and TypeScript code and creates a static site in `dist/`. Use `npm run preview` to preview that build.

Built with **Vue 3, TypeScript, and Vite**. The original single-file prototype is now organized into reusable Vue components, a session composable, typed passage data, and independently tested scoring and timing logic. [Architecture and development notes](docs/architecture.md).

[GPL-3.0 license](LICENSE).
