import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Announcement, Priority } from '../types';
import { Colors, Radius, Spacing } from '../constants/theme';

interface AnnouncementCardProps {
  announcement: Announcement;
  onPress: (announcement: Announcement) => void;
}

function PriorityBadge({ priority }: { priority: Priority }) {
  const colorMap: Record<Priority, { color: string; bg: string }> = {
    High: { color: Colors.priorityHigh, bg: Colors.priorityHighBg },
    Medium: { color: Colors.priorityMedium, bg: Colors.priorityMediumBg },
    Low: { color: Colors.priorityLow, bg: Colors.priorityLowBg },
  };
  const { color, bg } = colorMap[priority];
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <View style={[styles.badgeDot, { backgroundColor: color }]} />
      <Text style={[styles.badgeText, { color }]}>{priority}</Text>
    </View>
  );
}

export function AnnouncementCard({ announcement, onPress }: AnnouncementCardProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.card, !announcement.isRead && styles.cardUnread, pressed && styles.cardPressed]}
      onPress={() => onPress(announcement)}
      accessibilityRole="button"
      accessibilityLabel={`Announcement: ${announcement.title}`}
    >
      <View style={styles.topRow}>
        <View style={styles.badgeRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{announcement.category}</Text>
          </View>
          {!announcement.isRead && <View style={styles.unreadDot} />}
        </View>
        <PriorityBadge priority={announcement.priority} />
      </View>

      <Text style={styles.title} numberOfLines={2}>{announcement.title}</Text>
      <Text style={styles.preview} numberOfLines={2}>{announcement.preview}</Text>

      <View style={styles.footer}>
        <Text style={styles.groupName} numberOfLines={1}>{announcement.groupName}</Text>
        <Text style={styles.time}>{announcement.displayTime}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    marginBottom: Spacing.sm,
  },
  cardUnread: {
    borderColor: Colors.accentMuted,
    backgroundColor: Colors.bgCardAlt,
  },
  cardPressed: {
    opacity: 0.8,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  categoryBadge: {
    backgroundColor: Colors.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: Radius.sm,
  },
  categoryText: {
    color: Colors.badgeText,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  unreadDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.sm,
    gap: 5,
  },
  badgeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 6,
    lineHeight: 22,
  },
  preview: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
    marginBottom: Spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  groupName: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
    marginRight: Spacing.sm,
  },
  time: {
    color: Colors.textDisabled,
    fontSize: 10,
  },
});
