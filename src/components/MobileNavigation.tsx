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
  { screen: 'Dashboard', label: 'Home', icon: '⬡' },
  { screen: 'Announcements', label: 'Inbox', icon: '◈' },
  { screen: 'Reminders', label: 'Reminders', icon: '◷' },
  { screen: 'Settings', label: 'Settings', icon: '⚙' },
];

interface MobileNavigationProps {
  activeScreen: Screen;
  onNavigate: (screen: Screen) => void;
  pendingCount: number;
  unreadCount: number;
}

export function MobileNavigation({ activeScreen, onNavigate, pendingCount, unreadCount }: MobileNavigationProps) {
  return (
    <View style={styles.nav}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeScreen === item.screen;
        const badge = item.screen === 'Announcements' ? unreadCount : item.screen === 'Reminders' ? pendingCount : 0;
        return (
          <Pressable
            key={item.screen}
            style={({ pressed }) => [styles.navItem, pressed && styles.navItemPressed]}
            onPress={() => onNavigate(item.screen)}
            accessibilityRole="button"
            accessibilityLabel={item.label}
            accessibilityState={{ selected: isActive }}
          >
            <View style={styles.iconWrap}>
              <Text style={[styles.icon, isActive && styles.iconActive]}>{item.icon}</Text>
              {badge > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{badge > 9 ? '9+' : badge}</Text>
                </View>
              )}
            </View>
            <Text style={[styles.label, isActive && styles.labelActive]}>{item.label}</Text>
            {isActive && <View style={styles.activeLine} />}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    backgroundColor: Colors.bgSurface,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    paddingBottom: Spacing.sm,
    paddingTop: Spacing.xs,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    gap: 3,
    position: 'relative',
  },
  navItemPressed: {
    opacity: 0.7,
  },
  iconWrap: {
    position: 'relative',
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 18,
    color: Colors.textMuted,
  },
  iconActive: {
    color: Colors.accent,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: Colors.priorityHigh,
    borderRadius: Radius.full,
    minWidth: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 8,
    fontWeight: '800',
  },
  label: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.accent,
    fontWeight: '700',
  },
  activeLine: {
    position: 'absolute',
    top: 0,
    left: '25%',
    right: '25%',
    height: 2,
    borderRadius: 2,
    backgroundColor: Colors.accent,
  },
});
