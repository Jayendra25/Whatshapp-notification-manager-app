// ─── Priority & Category ────────────────────────────────────────────────────

export type Priority = 'High' | 'Medium' | 'Low';

export type AnnouncementCategory =
  | 'Class'
  | 'Deadline'
  | 'Meeting'
  | 'Event'
  | 'Exam'
  | 'General';

// ─── Announcement ────────────────────────────────────────────────────────────

export interface Announcement {
  id: string;
  title: string;
  preview: string;
  fullMessage: string;
  groupName: string;
  timestamp: string;
  displayTime: string;
  category: AnnouncementCategory;
  priority: Priority;
  isRead: boolean;
}

// ─── Reminder ────────────────────────────────────────────────────────────────

export interface Reminder {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  displayDate: string;
  isCompleted: boolean;
  linkedAnnouncementId?: string;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export type Screen = 'Dashboard' | 'Announcements' | 'Reminders' | 'Settings';

// ─── Filter ──────────────────────────────────────────────────────────────────

export type PriorityFilter = 'All' | Priority;

// ─── Settings stub ───────────────────────────────────────────────────────────

export interface NotificationAccessStatus {
  isGranted: boolean;
  isPrototypeMode: boolean;
}

export interface AppSettings {
  notificationAccess: NotificationAccessStatus;
  selectedGroups: string[];
  importantCategories: AnnouncementCategory[];
  reminderLeadTimeMinutes: number;
  notificationsEnabled: boolean;
}
