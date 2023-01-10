# search-header

## how to use?

types.vue

```tsx
import { PropType } from 'vue';
import { RowProps, ColProps } from 'ant-design-vue';

type O = {
  [key: string]: unknown;
};

export type RenderLabelType = {
  ASelect: typeof import('ant-design-vue/es')['Select'];
  AInput: typeof import('ant-design-vue/es')['Input'];
  ADatePicker: typeof import('ant-design-vue/es')['DatePicker'];
  ATimePicker: typeof import('ant-design-vue/es')['TimePicker'];
  TimeRangePicker: typeof import('ant-design-vue/es')['TimeRangePicker'];
  ATreeSelect: typeof import('ant-design-vue/es')['TreeSelect'];
};

export type GridLayoutType = {
  row: RowProps;
  col: ColProps;
};

export type SearchHeaderRenderType = {
  key: keyof O;
  label: string;
  renderLabel:
    | RenderLabelType['ADatePicker']
    | RenderLabelType['AInput']
    | RenderLabelType['ASelect']
    | RenderLabelType['ATimePicker']
    | RenderLabelType['ATreeSelect']
    | RenderLabelType['TimeRangePicker'];
  options?: { value: string | number; label: string }[];
  attribute?: any;
  authorities?: string[];
};

export const searchHeaderProps = {
  renderOptions: {
    type: Array as PropType<SearchHeaderRenderType[]>,
    required: true,
  },
  data: {
    type: Object as PropType<O>,
    required: true,
  },
  gridLayout: {
    type: Object as PropType<GridLayoutType>,
    default: {
      row: {
        gutter: 24,
      },
      col: {
        span: 8,
      },
    },
  },
  labelCol: {
    type: Object,
    default: {
      style: {
        width: '100px',
      },
    },
  },
  labelAlign: {
    type: String as PropType<'left' | 'right'>,
    default: 'right',
  },
};
```

index.vue

```tsx
<script setup lang="ts">
import { SearchHeaderRenderType } from './types'
import { reactive } from 'vue'
import { Input, Select, DatePicker, TimePicker, TreeSelect } from 'ant-design-vue';

const fitlerOptions = reactive({
	name: null,
	selectValue: null,
	date: null,
	time: null,
	treeValue: null
});

const searchRenderOptions: SearchHeaderRenderType[] = [
  {
    key: 'name',
    label: 'name',
    renderLabel: Input,
    attribute: {
      placeholder: 'please input name',
    },
  },
  {
    key: 'selectValue',
    label: 'selector',
    renderLabel: Select,
    options: [
      {
        label: 'zhou',
        value: 'zhouv',
      },
    ],
    attribute: {
      placeholder: 'please select',
    },
  },
  {
    key: 'date',
    label: 'datePicker',
    renderLabel: DatePicker,
    attribute: {
      placeholder: 'please select date',
			picker: 'week',
      style: {
        width: '100%',
      },
    },
  },
	{
    key: 'time',
    label: 'TimePicker',
    renderLabel: TimePicker,
    attribute: {
      placeholder: 'please select time',
      style: {
        width: '100%',
      },
    },
  },
	{
    key: 'treeValue',
    label: 'TreeSelect',
    renderLabel: TreeSelect,
    attribute: {
      placeholder: 'please select',
      style: {
        width: '100%',
      },
    },
		treeDate: [
			{
        title: 'parent 1',
        value: 'parent 1',
        children: [
          {
            title: 'parent 1-0',
            value: 'parent 1-0',
            children: [
              {
                title: 'my leaf',
                value: 'leaf1',
              },
              {
                title: 'your leaf',
                value: 'leaf2',
              },
            ],
          },
          {
            title: 'parent 1-1',
            value: 'parent 1-1',
          },
        ],
      }
		]
  },
];
</script>

<template>
	<search-header :data="filterOptions" :render-options="searchRenderOptions">
	  <template #footer>
	    <a-button type="primary">search</a-button>
	  </template>
	</search-header>
</template>
```

`attribute` 中的属性会绑定到该组件上。