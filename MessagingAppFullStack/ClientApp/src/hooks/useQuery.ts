import { useState } from "react";
import { useToast } from "@chakra-ui/react";

interface RestError {
  status: number;
  statusText: string;
}

interface FetchCallbacks<T> {
  onComplete: (data: T) => void;
  onError: (error: RestError) => void;
}

interface Response<T> {
  loading: boolean;
  fetch: (callbacks: FetchCallbacks<T>) => void;
}

interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: any;
}

const useFetch = <T>(
  url: string,
  options: FetchOptions = { method: "GET" },
  initialData: T | null = null
): Response<T> => {
  const [loading, setLoading] = useState(false);

  const toast = useToast();

  const handleException = () => {
    toast({
      status: "error",
      description:
        "An unexpected error occurred processing your request. Please try again later.",
    });
  };

  const fetchData = async (callbacks: FetchCallbacks<T>) => {
    try {
      setLoading(true);
      const res = await fetch(url, {
        ...options,
        body: options.body ? JSON.stringify(options.body) : undefined,
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
        },
      });
      if (!res.ok) {
        callbacks.onError({ statusText: res.statusText, status: res.status });
        setLoading(false);
        return;
      }
      const json = await res.json();
      callbacks.onComplete(json);
      setLoading(false);
    } catch (err) {
      handleException();
      setLoading(false);
    }
  };

  return { loading, fetch: fetchData };
};

export default useFetch;
