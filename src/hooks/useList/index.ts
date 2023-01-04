import { reactive, ref, watch } from 'vue';

interface FilterOptions<T> {
  new (): T;
}

export default function useList<ItemType extends Object, T extends object>(
  loadDataFn: Function,
  FilterObject: FilterOptions<T>
) {
  /**
   * 加载状态
   */
  const loading = ref(false);
  /**
   * 当前页
   */
  const currentPage = ref<number>(1);
  /**
   * 页大小
   */
  const pageSize = ref<number>(10);
  /**
   * 数据总数
   */
  const total = ref<number>(0);
  /**
   * 列表数据
   */
  const list = ref<ItemType[]>([]);
  /**
   * 筛选条件
   */
  const filterOptions = reactive<T>(new FilterObject());
  /**
   * 获取列表数据
   */
  const getListData = async (current: number) => {
    loading.value = true;
    try {
      const {
        data: { errorCode, data, page: pageData },
      } = await loadDataFn(pageSize.value, current, filterOptions);
      if (errorCode === 10200) {
        total.value = pageData.total;
        list.value = data;
      }
    } catch {
      console.error('loadDataFn error');
    } finally {
      loading.value = false;
    }
  };
  /**
   * 监听分页，请求数据
   */
  watch([currentPage, pageSize], () => {
    getListData(currentPage.value);
  });
  /**
   * 重置筛选条件
   */
  const resetFilterOptions = () => {
    Object.assign(filterOptions, new FilterObject());
    getListData(1);
  };

  return {
    loading,
    currentPage,
    pageSize,
    total,
    list,
    filterOptions,
    getListData,
    resetFilterOptions,
  };
}
