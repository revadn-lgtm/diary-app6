import {
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import {
    COLORS,
    RADIUS,
    SPACE,
    TYPO,
} from '../styles/tokens';

type DiaryCardProps = {
  title: string;
  date: string;
  preview: string;
  mood: string;
  liked: boolean;
  onPress: () => void;
  onToggleLike: () => void;
};

export default function DiaryCard({
  title,
  date,
  preview,
  mood,
  liked,
  onPress,
  onToggleLike,
}: DiaryCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.card}
    >
      <View style={styles.contentRow}>
        <Text style={styles.mood}>
          {mood}
        </Text>
        <View style={styles.info}>
          <Text
            style={styles.title}
            numberOfLines={1}
          >
            {title}
          </Text>
          <Text style={styles.date}>
            {date}
          </Text>
          <Text
            style={styles.preview}
            numberOfLines={2}
          >
            {preview}
          </Text>
        </View>
        <Pressable
          onPress={onToggleLike}
          style={styles.likeButton}
        >
          <Text style={styles.likeIcon}>
            {liked ? '❤️' : '🤍'}
          </Text>
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: RADIUS.card,
    padding: SPACE.m,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACE.m,
  },
  mood: {
    fontSize: 32,
  },
  info: {
    flex: 1,
    gap: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  date: {
    fontSize: TYPO.caption,
    color: COLORS.muted,
  },
  preview: {
    fontSize: TYPO.body,
    color: COLORS.text,
    marginTop: 2,
  },
  likeButton: {
    padding: 8,
  },
  likeIcon: {
    fontSize: 22,
  },
});