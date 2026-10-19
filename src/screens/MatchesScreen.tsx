import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';

import { MatchCard } from '../components/MatchCard';
import { useMatches } from '../hooks/useMatches';

type MatchFilter = 'all' | 'upcoming' | 'finished';

const filters: { label: string; value: MatchFilter }[] = [
  { label: 'Все', value: 'all' },
  { label: 'Предстоящие', value: 'upcoming' },
  { label: 'Завершённые', value: 'finished' },
];

export function MatchesScreen() {
  const { matches, isLoading, error, refresh } = useMatches();

  const [filter, setFilter] = useState<MatchFilter>('all');

  const filteredMatches = matches.filter((match) => {
    switch (filter) {
      case 'upcoming':
        return match.status === 'scheduled' || match.status === 'live';

      case 'finished':
        return match.status === 'finished';

      case 'all':
        return true;
    }
  });

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#111827" />
        <Text style={styles.message}>Загружаем матчи...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>

        <Pressable
          style={styles.retryButton}
          onPress={() => void refresh()}
          accessibilityRole="button"
        >
          <Text style={styles.retryButtonText}>Повторить</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Матчи тура</Text>

      <View style={styles.filters}>
        {filters.map((item) => {
          const isActive = filter === item.value;

          return (
            <Pressable
              key={item.value}
              style={[styles.filterButton, isActive && styles.activeFilter]}
              onPress={() => setFilter(item.value)}
              accessibilityRole="button"
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <FlatList
        data={filteredMatches}
        keyExtractor={(match) => match.id}
        renderItem={({ item }) => <MatchCard match={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {matches.length === 0 ? 'Матчей пока нет' : 'Нет матчей в выбранной категории'}
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9fafb',
  },
  centered: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 20,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  filterButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 4,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeFilter: {
    backgroundColor: '#111827',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  list: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    color: '#6b7280',
    marginTop: 24,
    fontSize: 15,
  },
  message: {
    marginTop: 12,
    fontSize: 15,
    color: '#6b7280',
  },
  errorText: {
    fontSize: 15,
    color: '#b91c1c',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#111827',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});
