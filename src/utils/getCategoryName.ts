import type { Category } from '../types/record';

export const getCategoryName = (id: string, categories: Category[]) => {
  const found = categories.find((c) => c.id === id);
  return found ? found.name : '(不明なカテゴリ)';
}