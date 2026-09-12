export function createReadingTimer(
  now: () => number = () => performance.now(),
) {
  let accumulated = 0;
  let started: number | null = null;
  return {
    start() {
      accumulated = 0;
      started = now();
    },
    pause() {
      if (started !== null) {
        accumulated += Math.max(0, now() - started);
        started = null;
      }
    },
    resume() {
      if (started === null) started = now();
    },
    seconds() {
      return (
        (accumulated + (started === null ? 0 : Math.max(0, now() - started))) /
        1000
      );
    },
  };
}
