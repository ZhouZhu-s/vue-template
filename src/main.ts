import { createApp } from 'vue';
import App from './App.vue';
import i18n from './locales/index';
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

createApp(App).use(i18n).use(PerfectScrollbar).mount('#app');
