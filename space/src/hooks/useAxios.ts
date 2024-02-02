/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import axios, { AxiosResponse, AxiosError } from 'axios';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiResponse<T> {
  data: T | null;
  error: AxiosError<T> | null;
  loading: boolean;
  fetchData: (url: string, method?: HttpMethod, requestData?: any) => Promise<void>;
}

const useAxios = <T>() : ApiResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<AxiosError<T> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const httpMethods: Record<HttpMethod, (url: string, requestData?: any) => Promise<AxiosResponse<T>>> = {
    GET: axios.get,
    POST: axios.post,
    PUT: axios.put,
    DELETE: axios.delete,
  };

  const fetchData = async (url: string, method: HttpMethod = 'GET', requestData?: any) => {
    try {
      if (httpMethods[method]) {
        const response = await httpMethods[method](url, requestData);
        setData(response.data);
      } else {
        throw new Error(`Invalid HTTP method: ${method}`);
      }
    } catch (error) {
      setError(error as AxiosError<T> | null);
    } finally {
      setLoading(false);
    }
  };

  return { data, error, loading, fetchData };
};

export default useAxios;
