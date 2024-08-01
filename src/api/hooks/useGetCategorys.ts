import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { fetchInstance } from '../instance';

export type CategoryResponseData = {
    domain: CategoryData[];
};

export const getCategoriesPath = () => `/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await fetchInstance.get<CategoryResponseData>(getCategoriesPath());
  return response.data.domain;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
