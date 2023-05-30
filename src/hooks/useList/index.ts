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
  const getListData = async (
    pag: { page: number; pageSize: number },
    params?: any
  ) => {
    loading.value = true;
    try {
      const data = await loadDataFn(
        { page: pag.page, pageSize: pag.pageSize },
        params
      );
      currentPage.value = pag.page;
      pageSize.value = pag.pageSize;
      list.value = data;
    } catch {
      console.error('loadDataFn error');
    } finally {
      loading.value = false;
    }
  };
  /**
   * 重置筛选条件
   */
  const resetFilterOptions = () => {
    Object.assign(filterOptions, new FilterObject());
    currentPage.value = 1;
    pageSize.value = 10;
    getListData({ page: currentPage.value, pageSize: pageSize.value });
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
