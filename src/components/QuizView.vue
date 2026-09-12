<script setup lang="ts">
import type { Passage } from '../types';
defineProps<{ passage: Passage; answered: number }>();
const answers = defineModel<number[]>({ required: true });
const emit = defineEmits<{ submit: [] }>();
function selectAnswer(index: number, choice: number) {
  const next = [...answers.value];
  next[index] = choice;
  answers.value = next;
}
</script>
<template>
  <section class="quiz-page">
    <p class="eyebrow">A MOMENT OF REFLECTION</p>
    <h1 id="view-heading" tabindex="-1">What stayed with you?</h1>
    <p class="view-description">
      A few questions about <em>{{ passage.title }}</em
      >. Your reading timer has stopped, so take all the time you need.
    </p>
    <div class="quiz-progress">
      <span aria-live="polite"
        >{{ answered }} of {{ passage.questions.length }} answered</span
      >
      <div>
        <i
          :style="{ width: `${(answered / passage.questions.length) * 100}%` }"
        />
      </div>
    </div>
    <form @submit.prevent="emit('submit')">
      <fieldset
        v-for="(question, index) in passage.questions"
        :key="question.id"
      >
        <legend>
          <span>{{ String(index + 1).padStart(2, '0') }}</span
          >{{ question.prompt }}
        </legend>
        <label
          v-for="(option, choice) in question.options"
          :key="choice"
          class="answer-option"
          :class="{ selected: answers[index] === choice }"
          ><input
            :checked="answers[index] === choice"
            @change="selectAnswer(index, choice)"
            type="radio"
            :name="question.id"
            :value="choice"
            required
          /><span>{{ option }}</span></label
        >
      </fieldset>
      <div class="quiz-submit">
        <span>{{
          answered === passage.questions.length
            ? 'Ready when you are.'
            : 'Choose one answer for every question.'
        }}</span
        ><button
          class="primary"
          :disabled="answered !== passage.questions.length"
        >
          See my results <span>→</span>
        </button>
      </div>
    </form>
  </section>
</template>
