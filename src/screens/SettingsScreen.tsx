import React from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, useWindowDimensions } from 'react-native';
import { AppSettings, AnnouncementCategory } from '../types';
import { Colors, Spacing, Radius } from '../constants/theme';

interface SettingsScreenProps {
  settings: AppSettings;
  onToggleNotifications: () => void;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Row({ label, value, children, isLast = false }: { label: string; value?: string; children?: React.ReactNode; isLast?: boolean }) {
  return (
    <View style={[styles.row, !isLast && styles.rowBorder]}>
      <View style={styles.rowLabel}>
        <Text style={styles.rowLabelText}>{label}</Text>
        {value !== undefined && <Text style={styles.rowValue}>{value}</Text>}
      </View>
      {children}
    </View>
  );
}

function StatusBadge({ connected, label }: { connected: boolean; label: string }) {
  return (
    <View style={[styles.statusBadge, connected ? styles.statusBadgeConnected : styles.statusBadgeDisconnected]}>
      <View style={[styles.statusDot, connected ? styles.statusDotConnected : styles.statusDotDisconnected]} />
      <Text style={[styles.statusText, connected ? styles.statusTextConnected : styles.statusTextDisconnected]}>{label}</Text>
    </View>
  );
}

function CategoryTag({ name, active }: { name: string; active: boolean }) {
  return (
    <View style={[styles.categoryTag, active && styles.categoryTagActive]}>
      <Text style={[styles.categoryTagText, active && styles.categoryTagTextActive]}>{name}</Text>
    </View>
  );
}

const ALL_CATEGORIES: AnnouncementCategory[] = ['Class', 'Deadline', 'Meeting', 'Event', 'Exam', 'General'];

export function SettingsScreen({ settings, onToggleNotifications }: SettingsScreenProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 720;

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, isWide && styles.contentWide]}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.pageTitle}>Settings</Text>
      <Text style={styles.pageDesc}>Configure how Notify AI manages your notifications.</Text>

      {/* Integration status */}
      <Section title="Integration Status">
        <Row label="Notification Access" isLast={false}>
          <StatusBadge
            connected={settings.notificationAccess.isGranted}
            label={settings.notificationAccess.isGranted ? 'Connected' : 'Not connected'}
          />
        </Row>
        <Row label="WhatsApp Integration" isLast={false}>
          <StatusBadge connected={false} label="Not connected" />
        </Row>
        <Row label="Mode" isLast>
          <StatusBadge connected={false} label="Prototype" />
        </Row>
      </Section>

      {/* Info card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>🔒 Why "Not connected"?</Text>
        <Text style={styles.infoText}>
          Reading WhatsApp notifications on Android requires the{' '}
          <Text style={styles.infoHighlight}>Notification Listener Service</Text> permission. This must be explicitly granted by the user through Android system settings.{'\n\n'}
          This feature requires a custom Kotlin native module (Android NotificationListenerService) that is not yet implemented. It is planned for a future release and will never be enabled without your explicit permission.{'\n\n'}
          This app will <Text style={styles.infoHighlight}>never</Text> send your message content to any server without your knowledge and consent.
        </Text>
      </View>

      {/* Selected groups */}
      <Section title="Monitored Groups (Future)">
        <Row label="Selected groups" value={`${settings.selectedGroups.length} groups`} isLast>
          <View />
        </Row>
        <View style={styles.groupList}>
          {settings.selectedGroups.map((g) => (
            <View key={g} style={styles.groupItem}>
              <View style={styles.groupIcon}>
                <Text style={styles.groupIconText}>{g.charAt(0)}</Text>
              </View>
              <Text style={styles.groupName} numberOfLines={1}>{g}</Text>
            </View>
          ))}
        </View>
        <Text style={styles.sectionNote}>
          Group selection will be available once WhatsApp notification access is enabled.
        </Text>
      </Section>

      {/* Categories */}
      <Section title="Important Categories">
        <View style={styles.categoryRow}>
          {ALL_CATEGORIES.map((cat) => (
            <CategoryTag
              key={cat}
              name={cat}
              active={settings.importantCategories.includes(cat)}
            />
          ))}
        </View>
        <Text style={styles.sectionNote}>
          Announcements in active categories will be flagged as important.
        </Text>
      </Section>

      {/* Notification preferences */}
      <Section title="Notification Preferences">
        <Row label="In-app notifications" isLast={false}>
          <Switch
            value={settings.notificationsEnabled}
            onValueChange={onToggleNotifications}
            trackColor={{ false: Colors.borderMedium, true: Colors.accentMuted }}
            thumbColor={settings.notificationsEnabled ? Colors.accentLight : Colors.textMuted}
          />
        </Row>
        <Row label="Reminder lead time" value={`${settings.reminderLeadTimeMinutes} min before`} isLast>
          <View />
        </Row>
      </Section>

      {/* About */}
      <Section title="About">
        <Row label="App version" value="1.0.0 – Prototype" isLast={false}>
          <View />
        </Row>
        <Row label="Built with" value="React Native · Expo" isLast={false}>
          <View />
        </Row>
        <Row label="Target platform" value="Android (primary)" isLast>
          <View />
        </Row>
      </Section>

      <View style={styles.footerSpacer} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: Colors.bgBase },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  contentWide: { maxWidth: 820, alignSelf: 'center', width: '100%' },

  pageTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  pageDesc: {
    color: Colors.textMuted,
    fontSize: 12,
    marginBottom: Spacing.xl,
    lineHeight: 18,
  },

  section: { marginBottom: Spacing.lg },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    marginBottom: Spacing.sm,
    paddingHorizontal: 2,
  },
  sectionBody: {
    backgroundColor: Colors.bgCard,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    overflow: 'hidden',
  },
  sectionNote: {
    color: Colors.textDisabled,
    fontSize: 11,
    lineHeight: 17,
    marginTop: Spacing.sm,
    paddingHorizontal: 2,
  },

  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: 13,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  rowLabel: { flex: 1, marginRight: Spacing.sm },
  rowLabelText: { color: Colors.textPrimary, fontSize: 13, fontWeight: '500', marginBottom: 2 },
  rowValue: { color: Colors.textMuted, fontSize: 11 },

  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.full,
    gap: 5,
  },
  statusBadgeConnected: { backgroundColor: Colors.priorityLowBg },
  statusBadgeDisconnected: { backgroundColor: Colors.priorityHighBg },
  statusDot: { width: 6, height: 6, borderRadius: 3 },
  statusDotConnected: { backgroundColor: Colors.priorityLow },
  statusDotDisconnected: { backgroundColor: Colors.priorityHigh },
  statusText: { fontSize: 11, fontWeight: '700' },
  statusTextConnected: { color: Colors.priorityLow },
  statusTextDisconnected: { color: Colors.priorityHigh },

  infoCard: {
    backgroundColor: Colors.accentDim,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.accentMuted,
    marginBottom: Spacing.lg,
  },
  infoTitle: { color: Colors.accentLight, fontSize: 13, fontWeight: '700', marginBottom: Spacing.sm },
  infoText: { color: '#A0A8C8', fontSize: 12, lineHeight: 20 },
  infoHighlight: { color: Colors.accentLight, fontWeight: '700' },

  groupList: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  groupItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  groupIcon: {
    width: 26,
    height: 26,
    borderRadius: Radius.sm,
    backgroundColor: Colors.bgHover,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupIconText: { color: Colors.accentLight, fontSize: 12, fontWeight: '700' },
  groupName: { color: Colors.textSecondary, fontSize: 12, flex: 1 },

  categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm, padding: Spacing.md },
  categoryTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    backgroundColor: Colors.bgInput,
  },
  categoryTagActive: {
    backgroundColor: Colors.accentDim,
    borderColor: Colors.accentMuted,
  },
  categoryTagText: { color: Colors.textMuted, fontSize: 12, fontWeight: '600' },
  categoryTagTextActive: { color: Colors.accentLight },

  footerSpacer: { height: Spacing.xxl },
});
