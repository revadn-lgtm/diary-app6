import {
    useEffect,
    useMemo,
    useState,
} from 'react';
import {
    DiaryEntry,
} from '../context/DiaryContext';

export function useDiarySearch(
  entries: DiaryEntry[]
) {
  const [query, setQuery] =
    useState('');
  const [debouncedQuery,
    setDebouncedQuery] =
    useState('');
  const [selectedMood,
    setSelectedMood] =
    useState<string | null>(null);

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setDebouncedQuery(
          query
        );
      }, 350);

    return () => {
      clearTimeout(timer);
    };
  }, [query]);

  const filteredEntries =
    useMemo(() => {
      const q =
        debouncedQuery
          .trim()
          .toLowerCase();

      return entries.filter((entry) => {
        const matchesQuery =
          !q ||
          entry.title
            .toLowerCase()
            .includes(q) ||
          entry.preview
            .toLowerCase()
            .includes(q) ||
          entry.date
            .toLowerCase()
            .includes(q);

        const matchesMood =
          !selectedMood ||
          entry.mood ===
            selectedMood;

        return (
          matchesQuery &&
          matchesMood
        );
      });
    }, [
      entries,
      debouncedQuery,
      selectedMood,
    ]);

  const resetFilter = () => {
    setQuery('');
    setSelectedMood(null);
  };

  return {
    query,
    setQuery,
    selectedMood,
    setSelectedMood,
    filteredEntries,
    resultCount:
      filteredEntries.length,
    resetFilter,
  };
}