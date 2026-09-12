# Development notes

ReadWise is a static Vue 3 application. There is no backend, authentication service, remote model, or runtime API dependency.

```text
src/
├── components/       # Passage library, reader, quiz, and results
├── composables/      # Reading-session lifecycle and Vue state
├── core/             # Scoring, timer, recommendations, history validation
├── data/             # Original forest passage and two new passages
├── App.vue           # App shell and view composition
├── main.ts           # Vue entrypoint
├── styles.css        # Responsive visual system
└── types.ts          # Shared data contracts
public/               # Favicon
tests/               # Core regression and Vue component tests
```

## Session lifecycle

The session composable moves through `library → reading → quiz → results`. Starting a passage resets answers and begins a monotonic timer before the reader is displayed. Pausing accumulates active reading time; resuming starts a new timed interval. Hiding the tab automatically pauses reading and requires an explicit resume. Finishing the passage stops the timer before the quiz appears.

Each question writes to its own answer slot. No answers are preselected, and incomplete submissions are rejected by both the UI and scoring function. Results include correct-answer counts, explanations, and words per minute based only on active reading time. Sessions under five seconds omit the speed estimate instead of presenting an unstable number.

Word counts are computed from passage text using Unicode-aware tokenization. Instructions are separate from passage data, so no hardcoded subtraction is needed. Reading pace is not used to assign school grades or reading ages. Recommendations use three transparent comprehension bands from a small curated bookshelf. They are starting points for exploration, not calibrated personal assessments or automated content-suitability checks.

## Persistence and privacy

Only completed sessions are saved in localStorage under `readwise:sessions:v1`, capped at 20 records. Saved records include a passage ID, answer indices, elapsed time, score, pace, and completion date. No names, accounts, analytics, or page contents are collected. Corrupt history is ignored; storage failures are reported without losing the current result. Clear saved sessions removes the stored journal. Unfinished sessions are not persisted across reloads.

Opening an “Explore the book” link performs an ordinary search on Open Library. No session results are included in the link. All app assets and passage content are bundled locally.

## Content and original work

The forest passage and its four comprehension questions retain the original prototype’s wording. Whitespace was normalized; answer keys are now zero-based indices and explanations are explicit. The additional adventure and informational passages were written for this edition. The README keeps the original introduction, description of the reading test, and personal inspiration paragraph. Original commits are retained; this modernization is a new commit.

To add a passage, create a typed `Passage` record in `src/data/passages.ts`, with unique question IDs, four options per question, an answer index, and an explanation. Keep passage text separate from instructions. Run `npm run check` after editing.

## Validation and builds

- `npm run typecheck`: strict checking across TypeScript and Vue templates.
- `npm test`: scoring, word counting, invalid inputs, all recommendation bands, pause/resume/reset timing, history validation, and independent quiz inputs.
- `npm run build`: type checking plus Vite’s production build.
- `npm run format:check`: formatting verification.

Browser checks also cover the reading-to-results flow, perfect and zero scores, pause, text sizing, history persistence and deletion, passage filters, and layouts at 390, 768, and 1440 pixels. The README screenshot shows the actual application with an empty journal, not fabricated activity.

The output in `dist/` can be served by any static web host. Relative asset paths support deployment under a repository subdirectory. No client secrets or environment variables are required. A ready-to-enable CI template is in `docs/ci.yml`; move it to `.github/workflows/ci.yml` with a GitHub credential that has workflow permission to activate it.
