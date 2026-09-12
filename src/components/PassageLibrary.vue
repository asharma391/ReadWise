<script setup lang="ts">
import { computed, ref } from 'vue';
import { passages } from '../data/passages';
import { wordCount } from '../core/assessment';
import type { Passage, Result } from '../types';
defineProps<{ history: Result[] }>();
const emit = defineEmits<{ start: [passage: Passage]; clear: [] }>();
const category = ref('All passages');
const filtered = computed(() =>
  passages.filter(
    (p) => category.value === 'All passages' || p.category === category.value,
  ),
);
function clear() {
  if (window.confirm('Delete the reading sessions saved in this browser?'))
    emit('clear');
}
</script>
<template>
  <section class="intro">
    <div class="intro-copy">
      <p class="eyebrow">
        <span class="tiny-rule"></span> A LITTLE PRACTICE. A WORLD OF STORIES.
      </p>
      <h1 id="view-heading" tabindex="-1">
        Find your<br /><em>reading rhythm.</em>
      </h1>
      <p class="intro-description">
        Improve your reading comprehension and speed with ReadWise. Read
        passages, answer quizzes, and find a book that keeps you turning pages.
      </p>
      <a class="text-link" href="#passages"
        >Choose your first passage <span>↗</span></a
      >
    </div>
    <div class="book-scene" aria-hidden="true">
      <svg class="orbit" viewBox="0 0 420 320">
        <circle cx="217" cy="153" r="127" />
        <circle cx="217" cy="153" r="101" />
        <path d="M49 275C121 309 288 297 375 255" />
      </svg>
      <div class="scene-label">YOUR NEXT CHAPTER<br />STARTS HERE</div>
      <div class="book back">
        <span>READ<br />TO<br />WONDER.</span>
      </div>
      <div class="book front">
        <small>THE READING ROOM</small
        ><span>One page.<br />New<br /><em>possibilities.</em></span>
        <div class="book-symbol">✳</div>
        <small>READWISE / VOL. 01</small>
      </div>
      <div class="scene-note">For the curious reader in you.</div>
    </div>
  </section>
  <div class="how-it-works">
    <div>
      <span>01</span>
      <p>
        <strong>Read a passage</strong
        ><small>Take your time. Make it your own.</small>
      </p>
    </div>
    <div>
      <span>02</span>
      <p>
        <strong>Check your understanding</strong
        ><small>Four questions. A little reflection.</small>
      </p>
    </div>
    <div>
      <span>03</span>
      <p>
        <strong>Find your next read</strong
        ><small>A few books to keep you going.</small>
      </p>
    </div>
  </div>
  <section id="passages" class="passage-section">
    <div class="section-header">
      <div>
        <p class="eyebrow">THE READING ROOM</p>
        <h2>A short escape, a fresh start.</h2>
      </div>
      <div class="filters" aria-label="Passage categories">
        <button
          v-for="item in ['All passages', 'Nature', 'Adventure', 'Ideas']"
          :key="item"
          :aria-pressed="category === item"
          @click="category = item"
        >
          {{ item }}
        </button>
      </div>
    </div>
    <div class="passage-grid">
      <button
        v-for="item in filtered"
        :key="item.id"
        class="passage-card"
        :class="item.category.toLowerCase()"
        @click="emit('start', item)"
      >
        <span class="card-meta"
          ><span>{{ item.category }}</span
          ><span>{{
            String(passages.indexOf(item) + 1).padStart(2, '0')
          }}</span></span
        ><span class="card-glyph" aria-hidden="true">{{
          item.category === 'Nature'
            ? '❋'
            : item.category === 'Adventure'
              ? '◈'
              : '✳'
        }}</span>
        <h3>{{ item.title }}</h3>
        <p>{{ item.description }}</p>
        <span class="card-bottom"
          ><span
            >{{ wordCount(item.paragraphs) }} words <b>·</b>
            {{ item.level }}</span
          ><span class="round-arrow" aria-hidden="true">↗</span></span
        >
      </button>
    </div>
  </section>
  <section class="history-section">
    <div class="section-header">
      <div>
        <p class="eyebrow">A LITTLE FURTHER, EVERY TIME</p>
        <h2>Your reading journal</h2>
      </div>
      <button v-if="history.length" class="quiet-button" @click="clear">
        Clear saved sessions</button
      ><span v-else class="local-note">Saved only in this browser</span>
    </div>
    <div v-if="!history.length" class="journal-empty">
      <span aria-hidden="true">＋</span>
      <p>
        Your first chapter is waiting.<small
          >Finish a passage to start your reading journal.</small
        >
      </p>
      <span class="journal-dash" aria-hidden="true">—</span>
    </div>
    <div v-else class="history-list">
      <div v-for="session in history" :key="session.id" class="history-row">
        <span>{{
          new Date(session.completedAt).toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
          })
        }}</span
        ><strong>{{
          passages.find((p) => p.id === session.passageId)?.title
        }}</strong
        ><span>{{ session.correct }}/{{ session.total }} understood</span
        ><span>{{
          session.wpm === null ? 'Brief session' : `${session.wpm} wpm`
        }}</span>
      </div>
    </div>
  </section>
</template>
