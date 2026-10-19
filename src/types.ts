export type MatchStatus = 'finished' | 'live' | 'scheduled' | 'postponed';

export interface Team {
  id: string;
  name: string;
  city: string;
}

export interface Score {
  home: number;
  away: number;
}

export interface Match {
  id: string;
  startsAt: string | null;
  status: MatchStatus;
  home: Team;
  away: Team;
  score: Score | null;
  minute?: number;
}

export interface MatchesResponse {
  round: number;
  matches: Match[];
}
