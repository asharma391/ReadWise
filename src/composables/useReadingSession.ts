import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { passages } from '../data/passages';
import { assess } from '../core/assessment';
import { createReadingTimer } from '../core/timer';
import { HISTORY_KEY, parseHistory } from '../core/history';
import type { Passage, Result } from '../types';
export function useReadingSession() {
  const stage = ref<'library' | 'reading' | 'quiz' | 'results'>('library');
  const passage = ref<Passage>(passages[0]);
  const paused = ref(false);
  const elapsed = ref(0);
  const answers = ref<number[]>([]);
  const result = ref<Result | null>(null);
  const history = ref<Result[]>([]);
  const storageNotice = ref('');
  const timer = createReadingTimer();
  let tick: ReturnType<typeof setInterval>;
  const answered = computed(
    () => answers.value.filter(Number.isInteger).length,
  );
  async function focusHeading() {
    await nextTick();
    document.getElementById('view-heading')?.focus();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function start(item: Passage) {
    passage.value = item;
    answers.value = [];
    result.value = null;
    paused.value = false;
    elapsed.value = 0;
    stage.value = 'reading';
    timer.start();
    void focusHeading();
  }
  function togglePause() {
    if (paused.value) timer.resume();
    else timer.pause();
    paused.value = !paused.value;
    elapsed.value = timer.seconds();
  }
  function finish() {
    if (paused.value) return;
    timer.pause();
    elapsed.value = Math.max(timer.seconds(), 0.001);
    stage.value = 'quiz';
    void focusHeading();
  }
  function submit() {
    if (stage.value !== 'quiz') return;
    const scored = assess(passage.value, answers.value, elapsed.value);
    result.value = {
      ...scored,
      id: crypto.randomUUID(),
      completedAt: new Date().toISOString(),
    };
    history.value = [result.value, ...history.value].slice(0, 20);
    try {
      localStorage.setItem(HISTORY_KEY, JSON.stringify(history.value));
      storageNotice.value = '';
    } catch {
      storageNotice.value =
        'This browser could not save your session. Your results are still available below.';
    }
    stage.value = 'results';
    void focusHeading();
  }
  function goHome() {
    timer.pause();
    stage.value = 'library';
    void focusHeading();
  }
  function clearHistory() {
    try {
      localStorage.removeItem(HISTORY_KEY);
      history.value = [];
      storageNotice.value = '';
    } catch {
      storageNotice.value =
        'Your browser did not allow saved sessions to be deleted.';
    }
  }
  function visibility() {
    if (document.hidden && stage.value === 'reading' && !paused.value)
      togglePause();
  }
  onMounted(() => {
    try {
      history.value = parseHistory(localStorage.getItem(HISTORY_KEY));
    } catch {
      storageNotice.value = 'Session history is unavailable in this browser.';
    }
    document.addEventListener('visibilitychange', visibility);
    tick = setInterval(() => {
      if (stage.value === 'reading') elapsed.value = timer.seconds();
    }, 250);
  });
  onUnmounted(() => {
    clearInterval(tick);
    document.removeEventListener('visibilitychange', visibility);
  });
  return {
    stage,
    passage,
    paused,
    elapsed,
    answers,
    result,
    history,
    storageNotice,
    answered,
    start,
    togglePause,
    finish,
    submit,
    goHome,
    clearHistory,
  };
}
