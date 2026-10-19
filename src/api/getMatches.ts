import { MATCHES_URL } from '../config';
import { MatchesResponse } from '../types/types';

export const getMatches = async (): Promise<MatchesResponse> => {
  const response = await fetch(MATCHES_URL);

  if (!response.ok) {
    throw new Error('Не удалось загрузить список матчей');
  }

  return response.json();
};
