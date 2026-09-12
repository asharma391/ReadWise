// @vitest-environment jsdom
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import QuizView from '../src/components/QuizView.vue';
import { passages } from '../src/data/passages';
describe('quiz form', () => {
  it('starts with no preselected answers and requires all questions', () => {
    const wrapper = mount(QuizView, {
      props: { passage: passages[0], answered: 0, modelValue: [] },
    });
    expect(wrapper.findAll('input:checked')).toHaveLength(0);
    expect(wrapper.get('button').attributes('disabled')).toBeDefined();
    expect(
      new Set(wrapper.findAll('input').map((input) => input.attributes('name')))
        .size,
    ).toBe(4);
  });
  it('writes the selected option to the correct question index', async () => {
    const wrapper = mount(QuizView, {
      props: { passage: passages[0], answered: 0, modelValue: [] },
    });
    await wrapper.findAll('fieldset')[1].findAll('input')[2].setValue();
    const updates = wrapper.emitted('update:modelValue');
    expect(updates).toBeTruthy();
    expect((updates![0][0] as number[])[1]).toBe(2);
    expect((updates![0][0] as number[])[0]).toBeUndefined();
  });
});
