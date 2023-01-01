<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { postLoginApi } from '@/api/login';
import { useI18n } from 'vue-i18n';
import { useSelectOptions } from '@/hooks/useSelectOptions';
import useList from '@/hooks/useList';

const { t } = useI18n();

const test = async () => {
  const results = await postLoginApi({
    username: 'admin',
    password: 'admin',
    rememberMe: true,
  });
  console.log(results);
};

interface Fruit {
  key: number;
  label: string;
  value: number;
}
function getRemoteData() {
  return new Promise<Fruit[]>((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          key: 1,
          label: '苹果',
          value: 1,
        },
        {
          key: 2,
          label: '香蕉',
          value: 2,
        },
        {
          key: 3,
          label: '橘子',
          value: 3,
        },
      ]);
    }, 3000);
  });
}

/**
 * eg: useList
 */
class FilterOptions {
  label = undefined;
  date = [];
}
interface FilterOptionType {
  label: undefined | string;
  date: Array<any>;
}
const { list, loading, getListData, filterOptions } = useList<
  Fruit,
  FilterOptionType
>(getRemoteData, FilterOptions);

/**
 * eg: useSelectOptions
 */
const selectBind = useSelectOptions({
  apiFun: getRemoteData,
});
</script>

<template>
  <span @click="test()">{{ t('date') }}</span>
  <a-select v-bind="selectBind" style="width: 200px"></a-select>
</template>

<style scoped></style>
