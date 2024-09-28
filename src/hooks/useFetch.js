import { useCallback } from "react";
import { useState } from "react";
import { json } from "react-router-dom";

export function useFetch() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchingData = useCallback(async (request, setResponse) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(request.url, {
        method: request.method || "GET",
        headers: request.headers || {},
        body: request.body || null,
      });

      //todo xử lý khi bị lỗi
      if (
        response.status === 422 ||
        response.status === 401 ||
        response.status === 400
      ) {
        const errorData = await response.json();
        throw errorData;
      }

      if (!response.ok) {
        throw json({ message: "Failed to fetch" }, { status: 500 });
      }

      const resData = await response.json();
      setResponse(resData);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  return {
    isLoading,
    error,
    fetchingData,
  };
}
