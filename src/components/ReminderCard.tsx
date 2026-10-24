import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Reminder } from '../types';
import { Colors, Radius, Spacing } from '../constants/theme';

interface ReminderCardProps {
  reminder: Reminder;
  onToggle: (id: string) => void;
}

export function ReminderCard({ reminder, onToggle }: ReminderCardProps) {
  return (
    <View style={[styles.card, reminder.isCompleted && styles.cardCompleted]}>
      <Pressable
        style={({ pressed }) => [styles.checkbox, reminder.isCompleted && styles.checkboxDone, pressed && styles.checkboxPressed]}
        onPress={() => onToggle(reminder.id)}
        accessibilityRole="checkbox"
        accessibilityLabel={reminder.isCompleted ? `Mark ${reminder.title} as incomplete` : `Mark ${reminder.title} as complete`}
        accessibilityState={{ checked: reminder.isCompleted }}
      >
        {reminder.isCompleted && <Text style={styles.checkmark}>✓</Text>}
      </Pressable>

      <View style={styles.body}>
        <Text style={[styles.title, reminder.isCompleted && styles.titleDone]} numberOfLines={2}>
          {reminder.title}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {reminder.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.duePill}>
            <Text style={[styles.dueText, reminder.isCompleted && styles.dueTextDone]}>
              {reminder.displayDate}
            </Text>
          </View>
          {reminder.isCompleted && (
            <View style={styles.completedBadge}>
              <Text style={styles.completedText}>Completed</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  cardCompleted: {
    opacity: 0.65,
    backgroundColor: Colors.bgSurface,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
    flexShrink: 0,
  },
  checkboxDone: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  checkboxPressed: {
    opacity: 0.6,
  },
  checkmark: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '800',
  },
  body: {
    flex: 1,
    minWidth: 0,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
    lineHeight: 20,
  },
  titleDone: {
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  description: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 19,
    marginBottom: Spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    flexWrap: 'wrap',
  },
  duePill: {
    backgroundColor: Colors.bgInput,
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  dueText: {
    color: Colors.accentLight,
    fontSize: 10,
    fontWeight: '600',
  },
  dueTextDone: {
    color: Colors.textMuted,
  },
  completedBadge: {
    backgroundColor: Colors.priorityLowBg,
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  completedText: {
    color: Colors.priorityLow,
    fontSize: 10,
    fontWeight: '700',
  },
});
