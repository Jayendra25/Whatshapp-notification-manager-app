import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Screen } from '../types';
import { Colors, Spacing, Radius } from '../constants/theme';

interface NavItem {
  screen: Screen;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { screen: 'Dashboard', label: 'Dashboard', icon: '⬡' },
  { screen: 'Announcements', label: 'Announcements', icon: '◈' },
  { screen: 'Reminders', label: 'Reminders', icon: '◷' },
  { screen: 'Settings', label: 'Settings', icon: '⚙' },
];

interface SidebarProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  pendingCount: number;
  unreadCount: number;
}

export function Sidebar({ activeScreen, onNavigate, pendingCount, unreadCount }: SidebarProps) {
  return (
    <View style={styles.sidebar}>
      {/* Brand */}
      <View style={styles.brand}>
        <View style={styles.logoMark}>
          <Text style={styles.logoText}>N</Text>
        </View>
        <View>
          <Text style={styles.appName}>Notify AI</Text>
          <Text style={styles.tagline}>Notification Manager</Text>
        </View>
      </View>

      {/* Nav items */}
      <View style={styles.nav}>
        {NAV_ITEMS.map((item) => {
          const isActive = activeScreen === item.screen;
          const badge = item.screen === 'Announcements' ? unreadCount : item.screen === 'Reminders' ? pendingCount : 0;
          return (
            <Pressable
              key={item.screen}
              style={({ pressed }) => [styles.navItem, isActive && styles.navItemActive, pressed && !isActive && styles.navItemHover]}
              onPress={() => onNavigate(item.screen)}
              accessibilityRole="button"
              accessibilityLabel={item.label}
              accessibilityState={{ selected: isActive }}
            >
              <Text style={[styles.navIcon, isActive && styles.navIconActive]}>{item.icon}</Text>
              <Text style={[styles.navLabel, isActive && styles.navLabelActive]}>{item.label}</Text>
              {badge > 0 && (
                <View style={[styles.navBadge, isActive && styles.navBadgeActive]}>
                  <Text style={styles.navBadgeText}>{badge}</Text>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>

      {/* Footer */}
      <View style={styles.sidebarFooter}>
        <View style={styles.prototypePill}>
          <View style={styles.pillDot} />
          <Text style={styles.pillText}>Prototype Mode</Text>
        </View>
        <Text style={styles.footerHint}>WhatsApp not connected</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: 220,
    backgroundColor: Colors.bgSurface,
    borderRightWidth: 1,
    borderRightColor: Colors.divider,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.md,
    justifyContent: 'space-between',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  logoMark: {
    width: 34,
    height: 34,
    borderRadius: Radius.md,
    backgroundColor: Colors.accentDim,
    borderWidth: 1,
    borderColor: Colors.accentMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.accentLight,
    fontSize: 17,
    fontWeight: '900',
  },
  appName: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: '800',
  },
  tagline: {
    color: Colors.textMuted,
    fontSize: 9,
    marginTop: 1,
  },
  nav: {
    flex: 1,
    gap: 4,
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 11,
    borderRadius: Radius.md,
    gap: 10,
  },
  navItemActive: {
    backgroundColor: Colors.accentDim,
  },
  navItemHover: {
    backgroundColor: Colors.bgHover,
  },
  navIcon: {
    fontSize: 16,
    color: Colors.textMuted,
    width: 20,
    textAlign: 'center',
  },
  navIconActive: {
    color: Colors.accentLight,
  },
  navLabel: {
    flex: 1,
    color: Colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  navLabelActive: {
    color: Colors.accentLight,
    fontWeight: '700',
  },
  navBadge: {
    backgroundColor: Colors.borderMedium,
    borderRadius: Radius.full,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  navBadgeActive: {
    backgroundColor: Colors.accentMuted,
  },
  navBadgeText: {
    color: Colors.accentLight,
    fontSize: 9,
    fontWeight: '800',
  },
  sidebarFooter: {
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingTop: Spacing.md,
    gap: 6,
  },
  prototypePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: Colors.warningBg,
    borderRadius: Radius.sm,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
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
  },
  footerHint: {
    color: Colors.textDisabled,
    fontSize: 10,
    paddingHorizontal: Spacing.sm,
  },
});
