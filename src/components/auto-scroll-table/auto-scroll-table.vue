<script lang="tsx">
import {
  defineComponent,
  onBeforeUnmount,
  onMounted,
  PropType,
  ref,
  toRefs,
} from 'vue';
import { ColumnType } from './types';

export default defineComponent({
  name: 'auto-scroll-table',
  props: {
    height: {
      type: Number,
      required: true,
    },
    columns: {
      type: Array as PropType<ColumnType[]>,
      required: true,
    },
    dataSource: {
      type: Array as PropType<object[]>,
      required: true,
    },
    loop: {
      type: Boolean,
      default: true,
    },
    loopStayTime: {
      type: Number,
      default: 1000,
    },
    speed: {
      type: Number,
      default: 60,
    },
  },
  emits: ['scrolled'],
  setup(props, { slots, emit }) {
    const { height, columns, dataSource, loop, speed, loopStayTime } =
      toRefs(props);
    const autoScrollTableBodyEl = ref<HTMLElement>();

    let timer: number | null = null;

    const removeTimer = () => {
      timer && clearInterval(timer);
    };

    const resetScrollTop = () => {
      autoScrollTableBodyEl.value &&
        (autoScrollTableBodyEl.value.scrollTop = 0);
    };

    const setTimer = () => {
      removeTimer();
      timer = setInterval(() => {
        if (!autoScrollTableBodyEl.value) return;
        const scrollHeight = autoScrollTableBodyEl.value.scrollHeight;
        const clientHeight = autoScrollTableBodyEl.value.clientHeight;
        const heightDiff = scrollHeight - clientHeight;
        autoScrollTableBodyEl.value.scrollTop++;
        if (autoScrollTableBodyEl.value.scrollTop >= heightDiff) {
          emit('scrolled');
          removeTimer();
          loop.value &&
            setTimeout(() => {
              resetScrollTop();
              setTimer();
            }, loopStayTime.value);
        }
      }, speed.value);
    };

    onMounted(() => {
      setTimer();
    });

    onBeforeUnmount(() => {
      removeTimer();
    });

    /**
     * create table head
     */
    const createTableHead = () => {
      return columns.value.map((item) => (
        <th style={{ textAlign: item.align ? item.align : 'left' }}>
          {item.title}
        </th>
      ));
    };

    /**
     * create table body
     */
    const createTableBody = () => {
      return dataSource.value.map((item, index) => (
        <tr class={index % 2 === 0 ? 'even' : 'odd'}>
          {columns.value.map((col) => (
            <td
              style={{ textAlign: col.align ? col.align : 'left' }}
              title={(item as any)[col.dataIndex]}
            >
              {slots[col.dataIndex]
                ? slots[col.dataIndex]?.((item as any)[col.dataIndex])
                : (item as any)[col.dataIndex]}
            </td>
          ))}
        </tr>
      ));
    };

    return () => (
      <table class="auto-scroll-table">
        <thead class="head">
          <tr>{createTableHead()}</tr>
        </thead>
        <tbody
          class="body"
          style={{ height: `${height.value}px` }}
          ref={autoScrollTableBodyEl}
          onMouseenter={removeTimer}
          onMouseleave={setTimer}
        >
          {createTableBody()}
        </tbody>
      </table>
    );
  },
});
</script>

<style lang="less">
@import url('./index.less');
</style>
