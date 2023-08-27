import { useState, useEffect } from 'react';
import { PaginatedProducts, ProductFacets, ProductList } from '../interfaces/ProductInterface';

interface ApiResponse {
  pagination: PaginatedProducts[];
  facets: ProductFacets[];
  products: ProductList[];
}

interface ErrorData {
  message: string;
}

interface UseApiDataProps {
  apiURL: string;
  apiKey: string;
  requestPayload: Record<string, any>;
}

export function usePaginatedProducts({
  apiURL,
  apiKey,
  requestPayload
}: UseApiDataProps, pageSize: number) {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorData | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(0);

  const nextPage = () => {
    setPageNumber(prevPageNumber => prevPageNumber + 1);
  };

  const prevPage = () => {
    if (pageNumber > 0) {
      setPageNumber(prevPageNumber => prevPageNumber - 1);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}?${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...requestPayload,
            pageNumber,
            size: pageSize,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData: ApiResponse = await response.json();
        setData(responseData);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError({ message: `An error occurred while fetching data: ${err.message}` });
        } else {
          setError({ message: 'An unknown error occurred' });
        }
        setLoading(false);
      }
    };

    fetchData();
  }, [apiURL, apiKey, requestPayload, pageNumber, pageSize]);

  return { data, nextPage, prevPage, loading, error, pageNumber };
}
