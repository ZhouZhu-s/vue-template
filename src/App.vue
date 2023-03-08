<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { postLoginApi } from '@/api/login';
import { useI18n } from 'vue-i18n';
import { themeVars, themeVarsLight, themeVarsDark } from '@/theme/theme-vars';
import { reactive } from 'vue';

const { t } = useI18n();
const themeVarsRef = reactive(themeVars);
const themeVarsLightRef = reactive(themeVarsLight);
const themeVarsDarkRef = reactive(themeVarsDark);
</script>

<template>
  <van-config-provider
    :theme-vars="themeVarsRef"
    :theme-vars-dark="themeVarsDarkRef"
    :theme-vars-light="themeVarsLightRef"
    theme="dark"
    class="main"
  >
    <van-button type="primary">主要按钮</van-button>
  </van-config-provider>
</template>

<style lang="less" scoped>
.main {
  // background-color: var(--van-primary-color);
}
</style>
