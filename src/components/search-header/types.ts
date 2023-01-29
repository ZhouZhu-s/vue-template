import { PropType } from 'vue';
import { RowProps, ColProps } from 'ant-design-vue';
import type { TreeSelectProps } from 'ant-design-vue';

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

export type VModelModifierType = 'lazy' | 'number' | 'trim';

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
  treeData?: TreeSelectProps['treeData'];
  authorities?: string[];
  vModelModifiers?: VModelModifierType[];
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
