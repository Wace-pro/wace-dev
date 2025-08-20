import { useCallback, useState } from "react";
import { ERROR_MESSAGES } from "@/constants/error-messages";
// Union types for safe, strict state control

// Loading state
interface UseFetchLoading {
  loading: true;
  success: null;
  data: null;
  message: null;
  error: null;
  fetchData: (body?: any) => Promise<void>;
}

// Success state
interface UseFetchSuccess<T> {
  loading: false;
  success: true;
  data: T;
  message: null;
  error: null;
  fetchData: (body?: any) => Promise<void>;
}

// Failure state
interface UseFetchFailure {
  loading: false;
  success: false;
  data: null;
  message: string | null;
  error: string | null;
  fetchData: (body?: any) => Promise<void>;
}

// Final union type
export type UseFetchResult<T> =
  | UseFetchLoading
  | UseFetchSuccess<T>
  | UseFetchFailure;

// Supported HTTP methods
export type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface UseFetchOptions {
  method?: Method;
  headers?: Record<string, string>;
}

// Internal type for managing all states
interface FetchState<T> {
  loading: boolean;
  success: boolean | null;
  data: T | null;
  message: string | null;
  error: string | null;
}

export function useFetch<T = any>(
  endpoint: string,
  options: UseFetchOptions = { method: "GET" }
): UseFetchResult<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    success: null,
    message: null,
    error: null,
    loading: false,
  });

  const g_msg = ERROR_MESSAGES.GLOBAL;
  const fetchData = useCallback(
    async (body?: any) => {
      setState({
        data: null,
        success: null,
        message: null,
        error: null,
        loading: true,
      });

      try {
        const res = await fetch(endpoint, {
          method: options.method || "GET",
          headers: {
            "Content-Type": "application/json",
            ...(options.headers || {}),
          },
          ...(options.method !== "GET" && body
            ? { body: JSON.stringify(body) }
            : {}),
        });

        const result = await res.json();

        if (!res.ok) {
          setState({
            data: null,
            success: false,
            message: null,
            error: result.error || g_msg.SERVER_INTERNAL_ERROR,
            loading: false,
          });
          return;
        }

        setState({
          data: result.data ?? null,
          success: result.success,
          message: result.messge,
          error: result.error,
          loading: false,
        });
      } catch (err: any) {
        setState({
          data: null,
          success: false,
          message: null,
          error: err.message || "Unknown error",
          loading: false,
        });
      }
    },
    [endpoint, options.method, options.headers]
  );

  return {
    ...state,
    fetchData,
  } as UseFetchResult<T>;
}
