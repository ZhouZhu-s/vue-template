import { describe, it, expect } from 'vitest';
import { shallowMount } from '@vue/test-utils';
import LoginPage from '../login-page.vue';

describe('login-pages', () => {
  it('render login page', () => {
    const wrapper = shallowMount(LoginPage, {});
    console.log(wrapper.classes('login'));
    expect(wrapper.classes('login')).toBe(true);
  });
});
