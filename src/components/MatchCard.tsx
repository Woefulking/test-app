import { StyleSheet, Text, View } from 'react-native';
import { FavoriteButton } from './FavoriteButton';
import { Match } from '../types/types';

interface Props {
  match: Match;
  isFavorite: boolean;
  onToggleFavorite: (matchId: string) => void;
}

const statusLabels: Record<string, string> = {
  finished: 'Завершён',
  live: 'Идёт',
  scheduled: 'Предстоящий',
  postponed: 'Перенесён',
};

function formatMatchDate(startsAt: string | null): string {
  if (!startsAt) {
    return 'Дата и время уточняются';
  }

  const date = new Date(startsAt);

  if (Number.isNaN(date.getTime())) {
    return 'Дата и время уточняются';
  }

  return new Intl.DateTimeFormat('ru-RU', {
    day: 'numeric',
    month: 'long',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function MatchCard({ match, isFavorite, onToggleFavorite }: Props) {
  const status = statusLabels[match.status] ?? 'Статус неизвестен';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.status}>{status}</Text>

        <View style={styles.headerActions}>
          {match.status === 'live' && match.minute != null && (
            <Text style={styles.minute}>{match.minute}'</Text>
          )}

          <FavoriteButton active={isFavorite} onPress={() => onToggleFavorite(match.id)} />
        </View>
      </View>

      <View style={styles.teams}>
        <View style={styles.team}>
          <Text style={styles.teamName}>{match.home.name}</Text>
          <Text style={styles.city}>{match.home.city}</Text>
        </View>

        <Text style={styles.score}>
          {match.score ? `${match.score.home} : ${match.score.away}` : '— : —'}
        </Text>

        <View style={[styles.team, styles.awayTeam]}>
          <Text style={styles.teamName}>{match.away.name}</Text>
          <Text style={styles.city}>{match.away.city}</Text>
        </View>
      </View>

      <Text style={styles.date}>{formatMatchDate(match.startsAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  status: {
    fontSize: 13,
    color: '#6b7280',
  },
  minute: {
    fontSize: 13,
    color: '#ef3124',
    fontWeight: '600',
  },
  teams: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  team: {
    flex: 1,
  },
  awayTeam: {
    alignItems: 'flex-end',
  },
  teamName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  city: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  score: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  date: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 16,
  },
});
