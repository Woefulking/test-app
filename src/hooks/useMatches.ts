import { useCallback, useEffect, useState } from 'react';
import { getMatches } from '../api/getMatches';
import { Match } from '../types/types';

export function useMatches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadMatches = useCallback(async () => {
    setIsLoading(true);

    try {
      const data = await getMatches();
      setMatches(data.matches);
      setLastUpdated(new Date());
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Произошла неизветсная ошибка');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadMatches();
  }, [loadMatches]);

  return {
    matches,
    isLoading,
    error,
    refresh: loadMatches,
    lastUpdated,
  };
}
