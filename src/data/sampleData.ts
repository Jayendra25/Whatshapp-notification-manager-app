import { Announcement, Reminder, AppSettings } from '../types';

// ─── Sample Announcements ────────────────────────────────────────────────────
// These are fictional announcements for prototype demonstration only.
// No real WhatsApp messages are accessed.

export const SAMPLE_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'a1',
    title: 'DSA Class Tomorrow – Lab 2',
    preview: 'Class scheduled for tomorrow at 9:30 AM in Lab 2. Attendance mandatory.',
    fullMessage:
      'Dear students, the Data Structures & Algorithms class is scheduled for tomorrow (Tuesday) at 9:30 AM in Computer Lab 2. Attendance is mandatory. Please bring your lab notebooks and ensure your development environment is set up. Topics covered: Binary Trees and Graph traversal.',
    groupName: 'CS-2024 Academic Group',
    timestamp: new Date(Date.now() - 2 * 3600000).toISOString(),
    displayTime: '2h ago',
    category: 'Class',
    priority: 'High',
    isRead: false,
  },
  {
    id: 'a2',
    title: 'DBMS Assignment Submission – Friday Deadline',
    preview: 'Submit your DBMS assignment (ER Diagram + normalization) by Friday 11:59 PM.',
    fullMessage:
      'This is a reminder that the DBMS Assignment #3 (ER Diagram design + 3NF normalization) is due this Friday at 11:59 PM. Submit through the college portal. Late submissions will incur a 20% penalty. Any queries, contact Prof. Sharma before Thursday.',
    groupName: 'DBMS – Prof. Sharma',
    timestamp: new Date(Date.now() - 6 * 3600000).toISOString(),
    displayTime: '6h ago',
    category: 'Deadline',
    priority: 'High',
    isRead: false,
  },
  {
    id: 'a3',
    title: 'Coding Club Meeting – Monday 5 PM',
    preview: 'The Coding Club will meet this Monday at 5 PM in Seminar Hall B.',
    fullMessage:
      'Hey everyone! The next Coding Club session is this Monday at 5 PM in Seminar Hall B. We will be solving LeetCode medium-difficulty problems as a group and discuss strategies for upcoming hackathons. All skill levels welcome. Bring your laptops.',
    groupName: 'Coding Club – NIET',
    timestamp: new Date(Date.now() - 10 * 3600000).toISOString(),
    displayTime: '10h ago',
    category: 'Meeting',
    priority: 'Medium',
    isRead: true,
  },
  {
    id: 'a4',
    title: 'Mid-Semester Examination Schedule',
    preview: 'Mid-sem exam schedule released. DSA: Nov 2, DBMS: Nov 4, OS: Nov 6.',
    fullMessage:
      'The Mid-Semester Examination schedule has been released by the examination cell.\n\n• DSA: Saturday, Nov 2 – 10:00 AM (Block A)\n• DBMS: Monday, Nov 4 – 2:00 PM (Block B)\n• Operating Systems: Wednesday, Nov 6 – 10:00 AM (Block A)\n• CN: Friday, Nov 8 – 2:00 PM (Block C)\n\nAdmit cards are available on the student portal. No entry without admit card.',
    groupName: 'Exam Cell – Official',
    timestamp: new Date(Date.now() - 18 * 3600000).toISOString(),
    displayTime: 'Yesterday',
    category: 'Exam',
    priority: 'High',
    isRead: false,
  },
  {
    id: 'a5',
    title: 'Techfest 2024 – Registration Open',
    preview: 'Registrations for Techfest 2024 are open. Last date: Oct 28.',
    fullMessage:
      'Techfest 2024 registrations are now live! This year we have competitive coding, UI/UX hackathon, robotics challenge, and paper presentation. Individual and team registrations are both open.\n\nLast date to register: October 28.\nRegister at: techfest.niet.ac.in\n\nPrize pool: ₹50,000. Don\'t miss it!',
    groupName: 'College Events – Official',
    timestamp: new Date(Date.now() - 30 * 3600000).toISOString(),
    displayTime: 'Yesterday',
    category: 'Event',
    priority: 'Medium',
    isRead: true,
  },
  {
    id: 'a6',
    title: 'OS Lab Cancelled – Rescheduled to Thursday',
    preview: 'Today\'s OS Lab is cancelled. Rescheduled to Thursday, same time.',
    fullMessage:
      'Dear students, today\'s Operating Systems Lab session (2 PM – 4 PM) has been cancelled due to a faculty emergency. The session has been rescheduled to this Thursday at the same time. The lab syllabus remains unchanged. Apologies for the inconvenience.',
    groupName: 'OS Lab Group – Sem 5',
    timestamp: new Date(Date.now() - 36 * 3600000).toISOString(),
    displayTime: '2 days ago',
    category: 'Class',
    priority: 'Medium',
    isRead: true,
  },
  {
    id: 'a7',
    title: 'Library Card Renewal – Last Date Oct 31',
    preview: 'Renew your library card before Oct 31 to retain borrowing privileges.',
    fullMessage:
      'This is a general notice from the college library. All students must renew their library cards before October 31st to continue using borrowing privileges. Bring your student ID to the library counter between 10 AM – 4 PM on any working day. Fines for overdue books must be cleared before renewal.',
    groupName: 'College Administration',
    timestamp: new Date(Date.now() - 48 * 3600000).toISOString(),
    displayTime: '2 days ago',
    category: 'General',
    priority: 'Low',
    isRead: true,
  },
  {
    id: 'a8',
    title: 'Guest Lecture – AI/ML by Dr. Priya Nair',
    preview: 'Guest lecture on AI/ML applications on Friday at 11 AM. Attendance open to all.',
    fullMessage:
      'We are pleased to announce a guest lecture by Dr. Priya Nair (Senior Research Scientist, Google DeepMind) on "Practical Applications of AI/ML in Industry".\n\nDate: Friday, Oct 25\nTime: 11:00 AM – 1:00 PM\nVenue: Main Auditorium\n\nAttendance is open to all students and faculty. Prior registration not required. Q&A session after the lecture.',
    groupName: 'CS Department – Notices',
    timestamp: new Date(Date.now() - 52 * 3600000).toISOString(),
    displayTime: '2 days ago',
    category: 'Event',
    priority: 'Medium',
    isRead: false,
  },
];

// ─── Sample Reminders ─────────────────────────────────────────────────────────

export const SAMPLE_REMINDERS: Reminder[] = [
  {
    id: 'r1',
    title: 'Submit DBMS Assignment',
    description: 'Upload ER Diagram and normalization document to the college portal before deadline.',
    dueDate: new Date(Date.now() + 2 * 24 * 3600000).toISOString(),
    displayDate: 'Friday, 11:59 PM',
    isCompleted: false,
    linkedAnnouncementId: 'a2',
  },
  {
    id: 'r2',
    title: 'Attend DSA Class',
    description: 'Lab 2, 9:30 AM. Bring lab notebook. Topics: Binary Trees & Graph traversal.',
    dueDate: new Date(Date.now() + 14 * 3600000).toISOString(),
    displayDate: 'Tomorrow, 9:30 AM',
    isCompleted: false,
    linkedAnnouncementId: 'a1',
  },
  {
    id: 'r3',
    title: 'Register for Techfest 2024',
    description: 'Complete team registration on techfest.niet.ac.in before Oct 28.',
    dueDate: new Date(Date.now() + 5 * 24 * 3600000).toISOString(),
    displayDate: 'Mon, Oct 28',
    isCompleted: false,
    linkedAnnouncementId: 'a5',
  },
  {
    id: 'r4',
    title: 'Collect Exam Admit Card',
    description: 'Download from student portal or collect from office. Required for all mid-sem exams.',
    dueDate: new Date(Date.now() + 8 * 24 * 3600000).toISOString(),
    displayDate: 'Thu, Oct 31',
    isCompleted: true,
  },
  {
    id: 'r5',
    title: 'Renew Library Card',
    description: 'Visit library counter with student ID between 10 AM – 4 PM.',
    dueDate: new Date(Date.now() + 8 * 24 * 3600000).toISOString(),
    displayDate: 'Thu, Oct 31',
    isCompleted: false,
    linkedAnnouncementId: 'a7',
  },
  {
    id: 'r6',
    title: 'Attend Coding Club Session',
    description: 'Seminar Hall B, Monday 5 PM. Bring laptop for LeetCode practice.',
    dueDate: new Date(Date.now() + 3 * 24 * 3600000).toISOString(),
    displayDate: 'Monday, 5:00 PM',
    isCompleted: false,
    linkedAnnouncementId: 'a3',
  },
  {
    id: 'r7',
    title: 'Study for DSA Mid-Sem',
    description: 'Complete revision of binary trees, graphs, and dynamic programming.',
    dueDate: new Date(Date.now() + 9 * 24 * 3600000).toISOString(),
    displayDate: 'Sat, Nov 2 – 10:00 AM',
    isCompleted: false,
  },
];

// ─── Default App Settings ─────────────────────────────────────────────────────

export const DEFAULT_SETTINGS: AppSettings = {
  notificationAccess: {
    isGranted: false,
    isPrototypeMode: true,
  },
  selectedGroups: [
    'CS-2024 Academic Group',
    'DBMS – Prof. Sharma',
    'Coding Club – NIET',
    'Exam Cell – Official',
    'College Events – Official',
  ],
  importantCategories: ['Class', 'Deadline', 'Exam', 'Meeting'],
  reminderLeadTimeMinutes: 60,
  notificationsEnabled: false,
};
