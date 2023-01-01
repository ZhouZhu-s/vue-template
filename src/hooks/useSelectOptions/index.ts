import { onMounted, reactive, ref } from 'vue';

export type SelectOptionType = {
  value: string | number;
  label: string;
  disabled?: boolean;
  key?: string | number;
};

interface FetchSelectType {
  apiFun: () => Promise<SelectOptionType[]>;
}

export function useSelectOptions(params: FetchSelectType) {
  const { apiFun } = params;

  const options = ref<SelectOptionType[]>([]);
  const loading = ref(false);

  const loadData = () => {
    loading.value = true;
    return apiFun()
      .then((res) => {
        options.value = res;
      })
      .catch(() => {
        options.value = [];
      })
      .finally(() => {
        loading.value = false;
      });
  };

  onMounted(() => {
    loadData();
  });

  return reactive({
    loading,
    options,
  });
}
