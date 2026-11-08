import { useRouter } from 'expo-router';

import { useCallback } from 'react';

import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import DiaryCard from '../../src/components/DiaryCard';

import { useDiary } from '../../src/context/DiaryContext';

import { useDiarySearch } from '../../src/hooks/useDiarySearch';

import {
  COLORS,
  SPACE,
} from '../../src/styles/tokens';

const MOODS = [
  { emoji: '😊', label: 'Senang', color: '#FCE4EC' },
  { emoji: '🎯', label: 'Fokus', color: '#EDE7F6' },
  { emoji: '😌', label: 'Tenang', color: '#E0F2E9' },
  { emoji: '🔥', label: 'Semangat', color: '#FFF0DB' },
];

export default function HomeScreen() {
  const router = useRouter();

  const {
    entries,
    likedIds,
    toggleLike,
  } = useDiary();

  const {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    filteredEntries,
    resultCount,
    resetFilter,
  } = useDiarySearch(entries);

  const openDetail = useCallback(
    (id: number) => {
      router.push({
        pathname: '/detail/[id]',
        params: {
          id: String(id),
        },
      });
    },
    [router]
  );

  const clearSearch = useCallback(() => {
    resetFilter();
  }, [resetFilter]);

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>
            YOUR LITTLE SPACE 🌷
          </Text>

          <Text style={styles.title}>
            Buku Harian
          </Text>

          <Text style={styles.subtitle}>
            Ceritakan hal-hal kecil yang berarti.
          </Text>
        </View>

        <View style={styles.headerDecoration}>
          <Text style={styles.headerEmoji}>
            ♡
          </Text>
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchRow}>
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>
            ⌕
          </Text>

          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Cari cerita harimu..."
            placeholderTextColor="#B49CA6"
            style={styles.search}
          />
        </View>

        <Pressable
          onPress={clearSearch}
          style={({ pressed }) => [
            styles.resetButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.resetText}>
            Reset
          </Text>
        </Pressable>
      </View>

      {/* Mood Filter */}
      <View style={styles.moodSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Bagaimana perasaanmu?
          </Text>

          <Text style={styles.sectionEmoji}>
            ✨
          </Text>
        </View>

        <View style={styles.moodFilterRow}>
          {MOODS.map((item) => {
            const isActive =
              selectedMood === item.emoji;

            return (
              <Pressable
                key={item.emoji}
                onPress={() =>
                  setSelectedMood(
                    isActive
                      ? null
                      : item.emoji
                  )
                }
                style={({ pressed }) => [
                  styles.moodChip,
                  {
                    backgroundColor: item.color,
                  },
                  isActive && styles.moodChipActive,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.moodEmoji}>
                  {item.emoji}
                </Text>

                <Text
                  style={[
                    styles.moodLabel,
                    isActive && styles.moodLabelActive,
                  ]}
                >
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Diary List Header */}
      <View style={styles.diaryHeader}>
        <View>
          <Text style={styles.diaryTitle}>
            Cerita Hari Ini
          </Text>

          <Text style={styles.diarySubtitle}>
            Kumpulan momen kecilmu ♡
          </Text>
        </View>

        <View style={styles.counterBadge}>
          <Text style={styles.counterText}>
            {resultCount} cerita
          </Text>
        </View>
      </View>

      {/* Diary List */}
      <FlatList
        data={filteredEntries}
        keyExtractor={(item) =>
          String(item.id)
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <DiaryCard
            title={item.title}
            date={item.date}
            preview={item.preview}
            mood={item.mood}
            liked={likedIds.has(item.id)}
            onPress={() =>
              openDetail(item.id)
            }
            onToggleLike={() =>
              toggleLike(item.id)
            }
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>
              🌷
            </Text>

            <Text style={styles.emptyTitle}>
              Belum ada cerita
            </Text>

            <Text style={styles.empty}>
              Coba ubah pencarian atau filter Mood.
            </Text>
          </View>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACE.l,
    paddingTop: SPACE.l,
    backgroundColor: COLORS.background,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },

  greeting: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
    color: COLORS.accent,
    marginBottom: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: COLORS.text,
    letterSpacing: -0.8,
  },

  subtitle: {
    fontSize: 13,
    color: COLORS.muted,
    marginTop: 6,
  },

  headerDecoration: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FCE4EC',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerEmoji: {
    fontSize: 30,
    color: COLORS.accent,
  },

  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 24,
  },

  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    paddingHorizontal: 14,
    height: 50,
  },

  searchIcon: {
    fontSize: 25,
    color: COLORS.accent,
    marginRight: 8,
  },

  search: {
    flex: 1,
    fontSize: 14,
    color: COLORS.text,
    paddingVertical: 0,
  },

  resetButton: {
    height: 50,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4DCE5',
    borderRadius: 16,
  },

  resetText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#A85578',
  },

  moodSection: {
    marginBottom: 26,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },

  sectionEmoji: {
    fontSize: 16,
    marginLeft: 6,
  },

  moodFilterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  moodChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 13,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
    gap: 6,
  },

  moodChipActive: {
    borderColor: COLORS.accent,
    borderWidth: 2,
  },

  moodEmoji: {
    fontSize: 16,
  },

  moodLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.text,
  },

  moodLabelActive: {
    color: '#A34F72',
    fontWeight: '800',
  },

  diaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  diaryTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.text,
  },

  diarySubtitle: {
    fontSize: 12,
    color: COLORS.muted,
    marginTop: 4,
  },

  counterBadge: {
    backgroundColor: '#FCE4EC',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 20,
  },

  counterText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#A85578',
  },

  list: {
    gap: 14,
    paddingBottom: SPACE.xl,
  },

  emptyContainer: {
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },

  emptyEmoji: {
    fontSize: 42,
    marginBottom: 12,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 6,
  },

  empty: {
    textAlign: 'center',
    color: COLORS.muted,
    fontSize: 13,
    lineHeight: 20,
  },

  pressed: {
    opacity: 0.75,
  },
});