import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, useWindowDimensions } from 'react-native';
import { Announcement, Reminder, Screen } from '../types';
import { Colors, Spacing, Radius } from '../constants/theme';
import { StatCard } from '../components/StatCard';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { SIDEBAR_BREAKPOINT } from '../constants/theme';

interface DashboardScreenProps {
  announcements: Announcement[];
  reminders: Reminder[];
  onNavigate: (screen: Screen) => void;
  onAnnouncementPress: (a: Announcement) => void;
}

export function DashboardScreen({ announcements, reminders, onNavigate, onAnnouncementPress }: DashboardScreenProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= SIDEBAR_BREAKPOINT;

  const highPriority = announcements.filter((a) => a.priority === 'High');
  const unread = announcements.filter((a) => !a.isRead);
  const pending = reminders.filter((r) => !r.isCompleted);
  const upcoming = reminders.filter((r) => !r.isCompleted).slice(0, 3);
  const recentAnnouncements = announcements.slice(0, 3);

  const totalCount = announcements.length;
  const highCount = highPriority.length;
  const pendingCount = pending.length;
  const unreadCount = unread.length;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, isWide && styles.contentWide]}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome */}
      <View style={styles.welcomeRow}>
        <View>
          <Text style={styles.greeting}>Good evening 👋</Text>
          <Text style={styles.welcomeTitle}>Your Notification Hub</Text>
          <Text style={styles.welcomeSub}>
            {unreadCount > 0 ? `You have ${unreadCount} unread announcement${unreadCount > 1 ? 's' : ''}.` : 'All caught up! No unread announcements.'}
          </Text>
        </View>
        <View style={styles.avatarWrap}>
          <Text style={styles.avatarText}>AI</Text>
        </View>
      </View>

      {/* Prototype banner */}
      <View style={styles.prototypeBanner}>
        <View style={styles.bannerIcon}>
          <Text style={styles.bannerIconText}>⚠</Text>
        </View>
        <View style={styles.bannerBody}>
          <Text style={styles.bannerTitle}>Prototype Mode – Sample Data</Text>
          <Text style={styles.bannerDesc}>
            Displaying fictional announcements for demonstration. Real WhatsApp integration requires Android Notification Listener permission — not yet connected.
          </Text>
        </View>
      </View>

      {/* Stats */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Overview</Text>
        <Text style={styles.sectionHint}>Today's activity</Text>
      </View>
      <View style={[styles.statsGrid, isWide && styles.statsGridWide]}>
        <StatCard value={totalCount} label="Total announcements" accentColor={Colors.accentLight} />
        <StatCard value={highCount} label="High priority" accentColor={Colors.priorityHigh} />
        <StatCard value={pendingCount} label="Pending reminders" accentColor={Colors.priorityMedium} />
        <StatCard value={unreadCount} label="Unread" accentColor={Colors.accent} />
      </View>

      {/* Recent announcements */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Recent Announcements</Text>
        <Pressable onPress={() => onNavigate('Announcements')}>
          <Text style={styles.seeAll}>See all →</Text>
        </Pressable>
      </View>

      {recentAnnouncements.length === 0 ? (
        <View style={styles.emptyInline}>
          <Text style={styles.emptyText}>No announcements yet.</Text>
        </View>
      ) : (
        recentAnnouncements.map((a) => (
          <AnnouncementCard key={a.id} announcement={a} onPress={onAnnouncementPress} />
        ))
      )}

      {/* Upcoming reminders */}
      <View style={[styles.sectionHeader, { marginTop: Spacing.lg }]}>
        <Text style={styles.sectionTitle}>Upcoming Reminders</Text>
        <Pressable onPress={() => onNavigate('Reminders')}>
          <Text style={styles.seeAll}>See all →</Text>
        </Pressable>
      </View>

      {upcoming.length === 0 ? (
        <View style={styles.emptyInline}>
          <Text style={styles.emptyText}>No pending reminders. Great job! ✓</Text>
        </View>
      ) : (
        upcoming.map((r) => (
          <View key={r.id} style={styles.reminderRow}>
            <View style={styles.reminderDot} />
            <View style={styles.reminderBody}>
              <Text style={styles.reminderTitle}>{r.title}</Text>
              <Text style={styles.reminderDate}>{r.displayDate}</Text>
            </View>
          </View>
        ))
      )}

      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Colors.bgBase },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  contentWide: {
    maxWidth: 820,
    alignSelf: 'center',
    width: '100%',
  },
  welcomeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.lg,
  },
  greeting: {
    color: Colors.textMuted,
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  welcomeTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  welcomeSub: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 19,
    maxWidth: 260,
  },
  avatarWrap: {
    width: 46,
    height: 46,
    borderRadius: Radius.lg,
    backgroundColor: Colors.accentDim,
    borderWidth: 1,
    borderColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: Colors.accentLight,
    fontWeight: '800',
    fontSize: 15,
  },
  prototypeBanner: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.warningBg,
    borderWidth: 1,
    borderColor: Colors.warningBorder,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  bannerIcon: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,
    backgroundColor: '#39351E',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bannerIconText: {
    color: Colors.warning,
    fontSize: 14,
    fontWeight: '700',
  },
  bannerBody: { flex: 1 },
  bannerTitle: {
    color: Colors.warning,
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 5,
  },
  bannerDesc: {
    color: '#C5BEA5',
    fontSize: 11,
    lineHeight: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: '700',
  },
  sectionHint: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  seeAll: {
    color: Colors.accent,
    fontSize: 12,
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  statsGridWide: {},
  emptyInline: {
    padding: Spacing.lg,
    borderRadius: Radius.lg,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  emptyText: {
    color: Colors.textMuted,
    fontSize: 13,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    borderRadius: Radius.md,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    marginBottom: Spacing.xs,
    gap: Spacing.md,
  },
  reminderDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    marginTop: 5,
    flexShrink: 0,
  },
  reminderBody: { flex: 1 },
  reminderTitle: {
    color: Colors.textPrimary,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 3,
  },
  reminderDate: {
    color: Colors.accentLight,
    fontSize: 11,
  },
  footerSpacer: { height: Spacing.xxl },
});
