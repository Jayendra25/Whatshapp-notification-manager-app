import React from 'react';
import { View, Text, StyleSheet, ScrollView, useWindowDimensions } from 'react-native';
import { Reminder } from '../types';
import { Colors, Spacing, Radius } from '../constants/theme';
import { ReminderCard } from '../components/ReminderCard';
import { EmptyState } from '../components/EmptyState';

interface RemindersScreenProps {
  reminders: Reminder[];
  onToggle: (id: string) => void;
}

export function RemindersScreen({ reminders, onToggle }: RemindersScreenProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 720;

  const pending = reminders.filter((r) => !r.isCompleted);
  const completed = reminders.filter((r) => r.isCompleted);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, isWide && styles.contentWide]}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>Reminders</Text>
        <View style={styles.statRow}>
          <View style={styles.statPill}>
            <Text style={styles.statPillText}>{pending.length} pending</Text>
          </View>
          <View style={[styles.statPill, styles.statPillDone]}>
            <Text style={[styles.statPillText, styles.statPillTextDone]}>{completed.length} done</Text>
          </View>
        </View>
      </View>
      <Text style={styles.pageDesc}>
        Tap the checkbox to mark a reminder complete or incomplete.
      </Text>

      {/* Pending */}
      <Text style={styles.groupLabel}>Pending</Text>
      {pending.length === 0 ? (
        <EmptyState
          icon="✓"
          title="All done!"
          description="You've completed all your reminders. Great work!"
        />
      ) : (
        pending.map((r) => <ReminderCard key={r.id} reminder={r} onToggle={onToggle} />)
      )}

      {/* Completed */}
      {completed.length > 0 && (
        <>
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerLabel}>Completed ({completed.length})</Text>
            <View style={styles.dividerLine} />
          </View>
          {completed.map((r) => <ReminderCard key={r.id} reminder={r} onToggle={onToggle} />)}
        </>
      )}

      {reminders.length === 0 && (
        <EmptyState
          icon="◷"
          title="No reminders yet"
          description="Reminders extracted from announcements will appear here."
        />
      )}

      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Colors.bgBase },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  contentWide: { maxWidth: 820, alignSelf: 'center', width: '100%' },

  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  pageTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  statRow: { flexDirection: 'row', gap: Spacing.sm },
  statPill: {
    backgroundColor: Colors.priorityMediumBg,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.warningBorder,
  },
  statPillText: { color: Colors.warning, fontSize: 11, fontWeight: '700' },
  statPillDone: {
    backgroundColor: Colors.priorityLowBg,
    borderColor: Colors.priorityLow,
  },
  statPillTextDone: { color: Colors.priorityLow },
  pageDesc: {
    color: Colors.textMuted,
    fontSize: 12,
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },
  groupLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: Spacing.sm,
    textTransform: 'uppercase',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginVertical: Spacing.lg,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.divider,
  },
  dividerLabel: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '600',
  },
  footerSpacer: { height: Spacing.xxl },
});
