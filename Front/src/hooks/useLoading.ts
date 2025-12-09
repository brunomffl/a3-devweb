import { useState, useCallback } from 'react';

interface UseLoadingState {
  isLoading: boolean;
  error: string | null;
}

export const useLoading = (initialState: boolean = false) => {
  const [state, setState] = useState<UseLoadingState>({
    isLoading: initialState,
    error: null,
  });

  const setLoading = useCallback((isLoading: boolean) => {
    setState((prev) => ({ ...prev, isLoading }));
  }, []);

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({ ...prev, error }));
  }, []);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null });
  }, []);

  return {
    ...state,
    setLoading,
    setError,
    reset,
  };
};
