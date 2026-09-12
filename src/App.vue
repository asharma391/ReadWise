<script setup lang="ts">
import PassageLibrary from './components/PassageLibrary.vue';
import ReadingView from './components/ReadingView.vue';
import QuizView from './components/QuizView.vue';
import ResultsView from './components/ResultsView.vue';
import { useReadingSession } from './composables/useReadingSession';
const {
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
} = useReadingSession();
function leave() {
  if (
    (stage.value === 'reading' || stage.value === 'quiz') &&
    !window.confirm('Leave this unfinished reading session?')
  )
    return;
  goHome();
}
</script>
<template>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="header-inner">
      <button class="wordmark" aria-label="ReadWise home" @click="leave">
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M3 6q6-2 13 3 7-5 13-3v20q-7-2-13 2-7-4-13-2z" />
          <path d="M16 9v19" /></svg
        >ReadWise</button
      ><span class="header-tagline">A little reading. A little discovery.</span
      ><button
        class="library-link"
        :aria-current="stage === 'library' ? 'page' : undefined"
        @click="leave"
      >
        The reading room <span>↗</span>
      </button>
    </div>
  </header>
  <main id="main">
    <div v-if="stage !== 'library'" class="session-nav">
      <button @click="leave">← Reading room</button>
      <ol aria-label="Session progress">
        <li
          v-for="(label, index) in ['Read', 'Reflect', 'Discover']"
          :key="label"
          :aria-current="
            ['reading', 'quiz', 'results'][index] === stage ? 'step' : undefined
          "
        >
          <span>{{ index + 1 }}</span
          >{{ label }}
        </li>
      </ol>
    </div>
    <p v-if="storageNotice" role="status" class="storage-notice">
      {{ storageNotice }}
    </p>
    <PassageLibrary
      v-if="stage === 'library'"
      :history="history"
      @start="start"
      @clear="clearHistory"
    /><ReadingView
      v-else-if="stage === 'reading'"
      :passage="passage"
      :elapsed="elapsed"
      :paused="paused"
      @pause="togglePause"
      @finish="finish"
    /><QuizView
      v-else-if="stage === 'quiz'"
      v-model="answers"
      :passage="passage"
      :answered="answered"
      @submit="submit"
    /><ResultsView
      v-else-if="result"
      :passage="passage"
      :result="result"
      @again="start(passage)"
      @home="goHome"
    />
  </main>
  <footer class="site-footer">
    <span class="footer-brand">ReadWise</span
    ><span>Making reading more accessible and enjoyable.</span
    ><span>No account. Just curiosity.</span>
  </footer>
</template>
