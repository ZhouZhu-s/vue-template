<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
import { postLoginApi } from '@/api/login';
import { useI18n } from 'vue-i18n';
import { useSelectOptions } from '@/hooks/useSelectOptions';
import useList from '@/hooks/useList';
import SearchHeader from '@/components/search-header/search-header';
import { SearchHeaderRenderType } from '@/components/search-header/types';
import { Input, Select, DatePicker, TimePicker } from 'ant-design-vue';
import { watch } from 'vue';

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
  name = undefined;
  date = [];
}
interface FilterOptionType {
  name: undefined | string;
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

const searchRenderOptions: SearchHeaderRenderType[] = [
  {
    key: 'name',
    label: '姓名',
    renderLabel: Input,
    attribute: {
      placeholder: '请输入姓名',
    },
  },
  {
    key: 'name',
    label: 'select选择器',
    renderLabel: Select,
    options: [
      {
        label: 'zhou',
        value: 'zhouv',
      },
    ],
    attribute: {
      placeholder: '请输入姓名',
    },
  },
  {
    key: 'name',
    label: '日期选择器',
    renderLabel: DatePicker,
    attribute: {
      placeholder: '请选择日期',
      style: {
        width: '100%',
      },
    },
  },
  {
    key: 'name',
    label: '时间选择器',
    renderLabel: TimePicker,
    attribute: {
      placeholder: '请选择时间',
      style: {
        width: '100%',
      },
    },
  },
];

watch(
  () => filterOptions.name,
  (val) => {
    console.log(val);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <span @click="test()">{{ t('date') }}</span>
  <a-select v-bind="selectBind" style="width: 200px"></a-select>
  <search-header :data="filterOptions" :render-options="searchRenderOptions">
    <template #footer>
      <a-button type="primary">查询</a-button>
    </template>
  </search-header>
</template>
