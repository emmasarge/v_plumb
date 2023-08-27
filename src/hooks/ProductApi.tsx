import { useState, useEffect } from 'react';

interface ApiResponse {
  data: Record<string, any>; // Adjust the data type accordingly  
  }

interface ErrorData {
  message: string;
}

interface UseApiDataProps {
  apiURL: string;
  apiKey: string;
  requestPayload: Record<string, any>; // Adjust the payload type accordingly
}

interface UseApiDataResult {
  data: ApiResponse | null;
  loading: boolean;
  error: ErrorData | null;
}

export function useApiData({ apiURL, apiKey, requestPayload }: UseApiDataProps): UseApiDataResult {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<ErrorData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiURL}?${apiKey}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestPayload),
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
  }, [apiURL, apiKey, requestPayload]);

  return { data, loading, error };
}
