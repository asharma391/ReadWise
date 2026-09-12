<script setup lang="ts">
import { computed } from 'vue';
import type { Passage, Result } from '../types';
import { feedback, recommend } from '../core/assessment';
const props = defineProps<{ passage: Passage; result: Result }>();
const emit = defineEmits<{ again: []; home: [] }>();
const response = computed(() => feedback(props.result));
const books = computed(() => recommend(props.result));
</script>
<template>
  <section class="results-page">
    <div class="results-intro">
      <p class="eyebrow">ONE MORE CHAPTER IN YOUR JOURNEY</p>
      <h1 id="view-heading" tabindex="-1">{{ response.title }}</h1>
      <p class="view-description">{{ response.text }}</p>
    </div>
    <div class="result-stats">
      <div>
        <small>COMPREHENSION</small
        ><strong
          >{{ result.correct }}<span>/ {{ result.total }}</span></strong
        >
        <p>questions answered correctly</p>
      </div>
      <div>
        <small>READING PACE</small
        ><strong
          >{{ result.wpm ?? '—'
          }}<span v-if="result.wpm !== null">wpm</span></strong
        >
        <p>
          {{
            result.wpm === null
              ? 'Session too brief to estimate pace'
              : 'words per minute on this passage'
          }}
        </p>
      </div>
      <div>
        <small>TIME WELL SPENT</small
        ><strong>{{ Math.round(result.seconds) }}<span>sec</span></strong>
        <p>{{ result.words }} words explored</p>
      </div>
    </div>
    <section class="recommendations">
      <div class="section-header">
        <div>
          <p class="eyebrow">KEEP THE PAGES TURNING</p>
          <h2>Your next read could be…</h2>
        </div>
        <span class="local-note">Selected from a small, curated bookshelf</span>
      </div>
      <div class="book-grid">
        <article
          v-for="book in books"
          :key="book.title"
          class="recommended-book"
        >
          <div class="mini-cover" :class="book.color" aria-hidden="true">
            <small>THE BOOKSHELF</small><strong>{{ book.title }}</strong
            ><span>✳</span>
          </div>
          <div>
            <h3>{{ book.title }}</h3>
            <p class="book-author">{{ book.author }}</p>
            <p>{{ book.note }}</p>
            <a
              class="text-link"
              :href="`https://openlibrary.org/search?q=${encodeURIComponent(book.title + ' ' + book.author)}`"
              target="_blank"
              rel="noopener noreferrer"
              >Explore the book ↗</a
            >
          </div>
        </article>
      </div>
      <p class="method-note">
        Suggestions are simple comprehension-based starting points, not a
        reading-age assessment. Reading faster does not necessarily mean reading
        better.
      </p>
    </section>
    <section class="answer-review">
      <p class="eyebrow">LOOK A LITTLE CLOSER</p>
      <h2>A little reflection goes a long way.</h2>
      <details
        v-for="(question, index) in passage.questions"
        :key="question.id"
      >
        <summary>
          <span
            :class="
              result.answers[index] === question.answer
                ? 'correct'
                : 'incorrect'
            "
            >{{ result.answers[index] === question.answer ? '✓' : '↺' }}</span
          >{{ question.prompt }}
        </summary>
        <div>
          <p>
            <strong>Your answer:</strong>
            {{ question.options[result.answers[index]] }}
          </p>
          <p v-if="result.answers[index] !== question.answer">
            <strong>Correct answer:</strong>
            {{ question.options[question.answer] }}
          </p>
          <p>{{ question.explanation }}</p>
        </div>
      </details>
    </section>
    <div class="results-actions">
      <button class="primary" @click="emit('home')">
        Choose another passage →</button
      ><button class="secondary" @click="emit('again')">
        Read this one again
      </button>
    </div>
  </section>
</template>
