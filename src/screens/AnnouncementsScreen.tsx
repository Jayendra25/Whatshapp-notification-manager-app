import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import { Announcement, PriorityFilter, Priority } from '../types';
import { Colors, Spacing, Radius } from '../constants/theme';
import { AnnouncementCard } from '../components/AnnouncementCard';
import { SearchBar } from '../components/SearchBar';
import { EmptyState } from '../components/EmptyState';

const FILTERS: PriorityFilter[] = ['All', 'High', 'Medium', 'Low'];

interface AnnouncementsScreenProps {
  announcements: Announcement[];
  onMarkRead: (id: string) => void;
}

function DetailModal({
  announcement,
  visible,
  onClose,
}: {
  announcement: Announcement | null;
  visible: boolean;
  onClose: () => void;
}) {
  if (!announcement) return null;

  const priorityColors: Record<Priority, string> = {
    High: Colors.priorityHigh,
    Medium: Colors.priorityMedium,
    Low: Colors.priorityLow,
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.sheetHandle} />

          <View style={styles.sheetTopRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{announcement.category}</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeBtnText}>✕</Text>
            </Pressable>
          </View>

          <Text style={styles.sheetTitle}>{announcement.title}</Text>

          <View style={styles.sheetMeta}>
            <View style={[styles.priorityPill, { backgroundColor: '#1A1B22' }]}>
              <View style={[styles.priorityDot, { backgroundColor: priorityColors[announcement.priority] }]} />
              <Text style={[styles.priorityText, { color: priorityColors[announcement.priority] }]}>
                {announcement.priority} Priority
              </Text>
            </View>
          </View>

          <View style={styles.sheetInfo}>
            <Text style={styles.sheetInfoLabel}>From</Text>
            <Text style={styles.sheetInfoValue}>{announcement.groupName}</Text>
          </View>
          <View style={styles.sheetInfo}>
            <Text style={styles.sheetInfoLabel}>Received</Text>
            <Text style={styles.sheetInfoValue}>{announcement.displayTime}</Text>
          </View>

          <View style={styles.sheetDivider} />

          <ScrollView showsVerticalScrollIndicator={false} style={styles.sheetMsgScroll}>
            <Text style={styles.sheetMessage}>{announcement.fullMessage}</Text>
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

export function AnnouncementsScreen({ announcements, onMarkRead }: AnnouncementsScreenProps) {
  const { width } = useWindowDimensions();
  const isWide = width >= 720;
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<PriorityFilter>('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const filtered = useMemo(() => {
    return announcements.filter((a) => {
      const matchesPriority = filter === 'All' || a.priority === filter;
      const q = query.toLowerCase();
      const matchesQuery =
        q === '' ||
        a.title.toLowerCase().includes(q) ||
        a.preview.toLowerCase().includes(q) ||
        a.groupName.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q);
      return matchesPriority && matchesQuery;
    });
  }, [announcements, query, filter]);

  function handlePress(a: Announcement) {
    setSelectedAnnouncement(a);
    setModalVisible(true);
    if (!a.isRead) onMarkRead(a.id);
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, isWide && styles.contentWide]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>Announcements</Text>
          <View style={styles.countBadge}>
            <Text style={styles.countText}>{announcements.length}</Text>
          </View>
        </View>
        <Text style={styles.pageDesc}>
          Showing sample announcements — WhatsApp integration not yet active.
        </Text>

        {/* Search */}
        <View style={styles.searchWrap}>
          <SearchBar value={query} onChangeText={setQuery} placeholder="Search announcements…" />
        </View>

        {/* Filters */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll} contentContainerStyle={styles.filterRow}>
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              style={[styles.filterChip, filter === f && styles.filterChipActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterChipText, filter === f && styles.filterChipTextActive]}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Results count */}
        <Text style={styles.resultsHint}>
          {filtered.length === 0 ? 'No results' : `${filtered.length} announcement${filtered.length !== 1 ? 's' : ''}`}
          {query !== '' ? ` for "${query}"` : ''}
          {filter !== 'All' ? ` · ${filter} priority` : ''}
        </Text>

        {/* List */}
        {filtered.length === 0 ? (
          <EmptyState
            icon="◈"
            title={query ? 'No results found' : 'No announcements'}
            description={
              query
                ? `No announcements match "${query}". Try a different search term.`
                : 'No announcements match the selected filter.'
            }
          />
        ) : (
          filtered.map((a) => (
            <AnnouncementCard key={a.id} announcement={a} onPress={handlePress} />
          ))
        )}

        <View style={styles.footerSpacer} />
      </ScrollView>

      <DetailModal
        announcement={selectedAnnouncement}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgBase },
  scroll: { flex: 1 },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  contentWide: { maxWidth: 820, alignSelf: 'center', width: '100%' },

  pageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginBottom: 6,
  },
  pageTitle: {
    color: Colors.textPrimary,
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  countBadge: {
    backgroundColor: Colors.accentDim,
    borderRadius: Radius.full,
    minWidth: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xs,
  },
  countText: { color: Colors.accentLight, fontSize: 11, fontWeight: '800' },
  pageDesc: {
    color: Colors.textMuted,
    fontSize: 12,
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },
  searchWrap: { marginBottom: Spacing.sm },
  filterScroll: { marginBottom: Spacing.sm },
  filterRow: { flexDirection: 'row', gap: Spacing.sm, paddingVertical: 4 },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.borderMedium,
    backgroundColor: Colors.bgCard,
  },
  filterChipActive: {
    backgroundColor: Colors.accentDim,
    borderColor: Colors.accentMuted,
  },
  filterChipText: { color: Colors.textSecondary, fontSize: 12, fontWeight: '600' },
  filterChipTextActive: { color: Colors.accentLight },
  resultsHint: {
    color: Colors.textMuted,
    fontSize: 11,
    marginBottom: Spacing.md,
  },
  footerSpacer: { height: Spacing.xxl },

  // Modal
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: Colors.bgSurface,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.lg,
    maxHeight: '85%',
    borderTopWidth: 1,
    borderColor: Colors.borderMedium,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.borderMedium,
    alignSelf: 'center',
    marginBottom: Spacing.lg,
  },
  sheetTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  categoryBadge: {
    backgroundColor: Colors.badgeBg,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.sm,
  },
  categoryText: { color: Colors.badgeText, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 },
  closeBtn: {
    width: 28,
    height: 28,
    borderRadius: Radius.sm,
    backgroundColor: Colors.bgCard,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { color: Colors.textMuted, fontSize: 12, fontWeight: '700' },
  sheetTitle: {
    color: Colors.textPrimary,
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: Spacing.sm,
    letterSpacing: -0.3,
  },
  sheetMeta: { flexDirection: 'row', marginBottom: Spacing.md, gap: Spacing.sm },
  priorityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: Colors.borderSubtle,
  },
  priorityDot: { width: 6, height: 6, borderRadius: 3 },
  priorityText: { fontSize: 11, fontWeight: '700' },
  sheetInfo: { flexDirection: 'row', gap: Spacing.sm, marginBottom: 6 },
  sheetInfoLabel: { color: Colors.textMuted, fontSize: 12, width: 70 },
  sheetInfoValue: { color: Colors.textSecondary, fontSize: 12, flex: 1 },
  sheetDivider: {
    height: 1,
    backgroundColor: Colors.divider,
    marginVertical: Spacing.md,
  },
  sheetMsgScroll: { maxHeight: 240 },
  sheetMessage: {
    color: Colors.textSecondary,
    fontSize: 14,
    lineHeight: 23,
  },
});
