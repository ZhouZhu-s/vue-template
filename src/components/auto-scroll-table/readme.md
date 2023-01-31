# auto-scroll-table

自动滚动表格

### API

**props**

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| height | 滚动内容（tbody）高度 | number | - | 是 |
| columns | 表格列的配置描述，具体项见 ColumnType | ColumnType[] | - | 是 |
| dataSource | 表格的数据源 | any[] | - | 是 |
| loop | 循环滚动 | boolean | true | - |
| loopStayTime | 循环滚动停留时间（单位：毫秒） | number | 1000 | - |
| speed | 滚动速度（单位：毫秒） | number | 60 | - |

**ColumnType**

| 参数 | 说明 | 类型 | 默认值 | 是否必填 |
| --- | --- | --- | --- | --- |
| title | 列头显示文字 | string | - | 是 |
| dataIndex | 列数据在数据项中对应的 key | string | - | 是 |
| align | 列内容的对齐方式 | `left`｜`right`｜`center` | left | - |

**event**

| 事件名称 | 说明 | 回调参数 |
| --- | --- | --- |
| scrolled | 内容滚动到底时触发 | - |

### example

```tsx
<script lang='ts' setup>
import AutoScrollTable from './components/auto-scroll-table/auto-scroll-table.vue';

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
];
const dataSource = [
  {
    name: '小米',
    age: 19,
  },
  {
    name: '小米2',
    age: 199,
  },
  {
    name: '小米',
    age: 19,
    address: 'jkjkklsdjfkls',
  },
  {
    name: '小米2',
    age: 199,
  },
  {
    name: '小米',
    age: 19,
  },
  {
    name: '小米2',
    age: 199,
  },
  {
    name: '小米',
    age: 19,
  },
  {
    age: 199,
    name: '小米2',
  },
];
</script>

<template>
	<auto-scroll-table :height="50" :columns="columns" :data-source="dataSource">
	  <template #name="scope">
	    <a>{{ scope }}</a>
	  </template>
	</auto-scroll-table>
</template>
```