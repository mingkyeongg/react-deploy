import { InfiniteData, useInfiniteQuery, type UseInfiniteQueryResult } from '@tanstack/react-query';
import { fetchInstance } from './../instance/index';

type RequestParams = {
  categoryId: string;
  pageToken?: string;
  maxResults?: number;
  sort?: string;
};

type ProductData = {
  id: number | null;
  name: string;
  price: number;
  imageUrl: string;
};

type ProductsResponseData = {
  products: ProductData[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type ProductsResponseRawData = {
  result: string;
  message: string;
  httpStatus: string;
  data: {
    totalPages: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    size: number;
    content: ProductData[];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  };
};

export const getProductsPath = ({ categoryId, pageToken, maxResults, sort }: RequestParams) => {
  const params = new URLSearchParams();

  params.append('categoryId', categoryId);
  params.append('sort', sort || 'orderDateTime,DESC');
  params.append('page', pageToken || '0');
  params.append('size', maxResults?.toString() || '10');

  return `/api/products?${params.toString()}`;
};


export const getProducts = async (params: RequestParams): Promise<ProductsResponseData> => {
  const response = await fetchInstance.get<ProductsResponseRawData>(getProductsPath(params));

  const data = response.data.data;

  return {
    products: data.content,
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults' | 'categoryId'> & { initPageToken?: string };

export const useGetProducts = ({
  categoryId,
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<ProductsResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['products', categoryId, maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getProducts({ categoryId, pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
