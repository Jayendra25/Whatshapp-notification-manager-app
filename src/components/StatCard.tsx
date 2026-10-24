import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Radius, Spacing } from '../constants/theme';

interface StatCardProps {
  value: string | number;
  label: string;
  accentColor?: string;
  flex?: number;
}

export function StatCard({ value, label, accentColor = Colors.accentLight, flex = 1 }: StatCardProps) {
  return (
    <View style={[styles.card, { flex }]}>
      <Text style={[styles.value, { color: accentColor }]}>{String(value).padStart(2, '0')}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    minWidth: 0,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: Radius.lg,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  value: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  label: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.5,
    lineHeight: 16,
  },
});
