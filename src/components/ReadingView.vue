<script setup lang="ts">
import { ref } from 'vue';
import type { Passage } from '../types';
import { wordCount } from '../core/assessment';
defineProps<{ passage: Passage; elapsed: number; paused: boolean }>();
const emit = defineEmits<{ pause: []; finish: [] }>();
const large = ref(false);
function time(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
}
</script>
<template>
  <div class="reading-layout">
    <aside class="reading-aside">
      <p class="eyebrow">YOUR READING SESSION</p>
      <div class="session-fact">
        <small>PASSAGE LENGTH</small
        ><strong>{{ wordCount(passage.paragraphs) }} <span>words</span></strong>
      </div>
      <div class="session-fact">
        <small>READING TIME</small><strong>{{ time(elapsed) }}</strong
        ><span class="timer-caption">{{
          paused ? 'Paused — take a breath.' : 'No rush. Read at your own pace.'
        }}</span>
      </div>
      <button class="secondary" @click="emit('pause')">
        {{ paused ? 'Resume reading' : 'Pause reading' }}
      </button>
      <p class="aside-note">
        The timer pauses when you leave this tab. Quiz time is not included in
        your reading pace.
      </p>
    </aside>
    <section class="reading-paper">
      <div class="paper-top">
        <span class="eyebrow">{{ passage.category }} / {{ passage.level }}</span
        ><button
          class="type-toggle"
          :aria-pressed="large"
          aria-label="Larger reading text"
          @click="large = !large"
        >
          A<span>A</span>
        </button>
      </div>
      <h1 id="view-heading" tabindex="-1">{{ passage.title }}</h1>
      <div v-if="paused" class="pause-screen">
        <span aria-hidden="true">Ⅱ</span>
        <h2>A moment to pause.</h2>
        <p>Your place is here when you’re ready.</p>
        <button class="primary" @click="emit('pause')">Continue reading</button>
      </div>
      <div v-else class="passage-text" :class="{ 'large-text': large }">
        <p v-for="(paragraph, i) in passage.paragraphs" :key="i">
          {{ paragraph }}
        </p>
      </div>
      <div class="reading-bottom">
        <span>Next: four comprehension questions</span
        ><button class="primary" :disabled="paused" @click="emit('finish')">
          I’ve finished reading <span>→</span>
        </button>
      </div>
    </section>
  </div>
</template>
