import React, { useState, useCallback } from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';

import { Screen, Announcement, Reminder, AppSettings } from './src/types';
import { Colors, SIDEBAR_BREAKPOINT } from './src/constants/theme';
import { SAMPLE_ANNOUNCEMENTS, SAMPLE_REMINDERS, DEFAULT_SETTINGS } from './src/data/sampleData';

import { AppHeader } from './src/components/AppHeader';
import { Sidebar } from './src/components/Sidebar';
import { MobileNavigation } from './src/components/MobileNavigation';

import { DashboardScreen } from './src/screens/DashboardScreen';
import { AnnouncementsScreen } from './src/screens/AnnouncementsScreen';
import { RemindersScreen } from './src/screens/RemindersScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

export default function App() {
  const { width } = useWindowDimensions();
  const isWide = width >= SIDEBAR_BREAKPOINT;

  // ── App State ─────────────────────────────────────────────────────────────
  const [activeScreen, setActiveScreen] = useState<Screen>('Dashboard');
  const [announcements, setAnnouncements] = useState<Announcement[]>(SAMPLE_ANNOUNCEMENTS);
  const [reminders, setReminders] = useState<Reminder[]>(SAMPLE_REMINDERS);
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS);

  // ── Derived counts for navigation badges ─────────────────────────────────
  const unreadCount = announcements.filter((a) => !a.isRead).length;
  const pendingCount = reminders.filter((r) => !r.isCompleted).length;

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleNavigate = useCallback((screen: Screen) => {
    setActiveScreen(screen);
  }, []);

  const handleMarkRead = useCallback((id: string) => {
    setAnnouncements((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a))
    );
  }, []);

  const handleToggleReminder = useCallback((id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isCompleted: !r.isCompleted } : r))
    );
  }, []);

  const handleAnnouncementPress = useCallback(
    (a: Announcement) => {
      handleMarkRead(a.id);
    },
    [handleMarkRead]
  );

  const handleToggleNotifications = useCallback(() => {
    setSettings((prev) => ({
      ...prev,
      notificationsEnabled: !prev.notificationsEnabled,
    }));
  }, []);

  // ── Screen renderer ───────────────────────────────────────────────────────
  function renderScreen() {
    switch (activeScreen) {
      case 'Dashboard':
        return (
          <DashboardScreen
            announcements={announcements}
            reminders={reminders}
            onNavigate={handleNavigate}
            onAnnouncementPress={handleAnnouncementPress}
          />
        );
      case 'Announcements':
        return (
          <AnnouncementsScreen
            announcements={announcements}
            onMarkRead={handleMarkRead}
          />
        );
      case 'Reminders':
        return (
          <RemindersScreen
            reminders={reminders}
            onToggle={handleToggleReminder}
          />
        );
      case 'Settings':
        return (
          <SettingsScreen
            settings={settings}
            onToggleNotifications={handleToggleNotifications}
          />
        );
    }
  }

  // ── Layout ────────────────────────────────────────────────────────────────
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" />

      {isWide ? (
        // ── Desktop / Tablet: Sidebar layout ─────────────────────────────
        <View style={styles.desktopLayout}>
          <Sidebar
            activeScreen={activeScreen}
            onNavigate={handleNavigate}
            pendingCount={pendingCount}
            unreadCount={unreadCount}
          />
          <View style={styles.mainArea}>
            <AppHeader showBrand={false} />
            <View style={styles.screenArea}>{renderScreen()}</View>
          </View>
        </View>
      ) : (
        // ── Mobile: Bottom navigation layout ─────────────────────────────
        <View style={styles.mobileLayout}>
          <AppHeader showBrand />
          <View style={styles.screenArea}>{renderScreen()}</View>
          <MobileNavigation
            activeScreen={activeScreen}
            onNavigate={handleNavigate}
            pendingCount={pendingCount}
            unreadCount={unreadCount}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
  desktopLayout: {
    flex: 1,
    flexDirection: 'row',
  },
  mainArea: {
    flex: 1,
  },
  mobileLayout: {
    flex: 1,
    flexDirection: 'column',
  },
  screenArea: {
    flex: 1,
    backgroundColor: Colors.bgBase,
  },
});
