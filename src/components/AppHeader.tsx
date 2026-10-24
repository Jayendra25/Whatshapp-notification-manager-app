import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius } from '../constants/theme';

interface AppHeaderProps {
  showBrand?: boolean;
}

export function AppHeader({ showBrand = true }: AppHeaderProps) {
  return (
    <View style={styles.header}>
      {showBrand && (
        <View style={styles.brand}>
          <View style={styles.logoMark}>
            <Text style={styles.logoText}>N</Text>
          </View>
          <View>
            <Text style={styles.appName}>Notify AI</Text>
            <Text style={styles.tagline}>WhatsApp Notification Manager</Text>
          </View>
        </View>
      )}
      <View style={styles.prototypePill}>
        <View style={styles.pillDot} />
        <Text style={styles.pillText}>Prototype</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
    backgroundColor: Colors.bgBase,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  logoMark: {
    width: 36,
    height: 36,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentDim,
    borderWidth: 1,
    borderColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.accentLight,
    fontSize: 18,
    fontWeight: '900',
  },
  appName: {
    color: Colors.textPrimary,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.3,
  },
  tagline: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: 1,
  },
  prototypePill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.priorityMediumBg,
    borderRadius: Radius.full,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 5,
    borderWidth: 1,
    borderColor: Colors.warningBorder,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.warning,
  },
  pillText: {
    color: Colors.warning,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});
