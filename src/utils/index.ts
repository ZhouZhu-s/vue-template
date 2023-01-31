import { RemoveNull } from './types';

export const unique = (function () {
  let num = 1;
  return {
    count() {
      return num++;
    },
  };
})();

/**
 * 移除对象值为空的属性
 */
export const removeEmpty = <T extends object>(obj: T): RemoveNull<T> => {
  const nullValue = [undefined, null, ''];
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([_, v]) => !nullValue.includes(v))
      .map(([k, v]) => [k, v === Object(v) ? removeEmpty(v) : v])
  ) as RemoveNull<T>;
};
