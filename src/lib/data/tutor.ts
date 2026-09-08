export interface TutorStudentItem {
  id: string;
  name: string;
  email: string;
  avatar: string;
  program: string;
  level: "SMP" | "SMA" | "Mahasiswa" | "Umum";
  progressPercent: number;
  attendanceRate: number;
  totalSessions: number;
  completedSessions: number;
  lastSessionDate: string;
  nextSessionDate: string;
  status: "active" | "completed" | "on-hold";
  notes: string;
}

export interface TutorClassToday {
  id: string;
  studentName: string;
  studentAvatar: string;
  program: string;
  time: string;
  sessionNumber: number;
  totalSessions: number;
  topic: string;
  meetingLink: string;
  attendanceStatus?: "present" | "late" | "absent" | "pending";
}

export interface TutorData {
  name: string;
  title: string;
  avatar: string;
  metrics: {
    totalStudents: number;
    activePrograms: number;
    classesToday: number;
    pendingAssignments: number;
    averageAttendance: number;
  };
  todayClasses: TutorClassToday[];
  students: TutorStudentItem[];
}

export const mockTutor: TutorData = {
  name: "Ahmad Fauzi, S.Kom.",
  title: "Lead Instructor — Programming & AI",
  avatar: "AF",
  metrics: {
    totalStudents: 18,
    activePrograms: 4,
    classesToday: 3,
    pendingAssignments: 7,
    averageAttendance: 94,
  },
  todayClasses: [
    {
      id: "cls-1",
      studentName: "Andi Pratama",
      studentAvatar: "AP",
      program: "Python Beginner",
      time: "16:00 - 17:30 WIB",
      sessionNumber: 8,
      totalSessions: 10,
      topic: "Python Functions & Modular Code",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      attendanceStatus: "present",
    },
    {
      id: "cls-2",
      studentName: "Budi Santoso",
      studentAvatar: "BS",
      program: "AI Starter",
      time: "19:00 - 20:30 WIB",
      sessionNumber: 4,
      totalSessions: 6,
      topic: "Prompt Engineering & AI Tools",
      meetingLink: "https://meet.google.com/xyz-uvwx-rst",
      attendanceStatus: "pending",
    },
    {
      id: "cls-3",
      studentName: "Sarah Putri",
      studentAvatar: "SP",
      program: "Web Developer",
      time: "20:30 - 22:00 WIB",
      sessionNumber: 6,
      totalSessions: 12,
      topic: "React State & Hooks (useState, useEffect)",
      meetingLink: "https://meet.google.com/klm-nopq-rst",
      attendanceStatus: "pending",
    },
  ],
  students: [
    {
      id: "std-001",
      name: "Andi Pratama",
      email: "andi.pratama@gmail.com",
      avatar: "AP",
      program: "Coding Starter (Python)",
      level: "SMA",
      progressPercent: 80,
      attendanceRate: 92,
      totalSessions: 10,
      completedSessions: 8,
      lastSessionDate: "Sep 6, 2026",
      nextSessionDate: "Today, 16:00 WIB",
      status: "active",
      notes: "Logika problem solving kuat, siap lanjut ke OOP.",
    },
    {
      id: "std-002",
      name: "Budi Santoso",
      email: "budi.santoso@gmail.com",
      avatar: "BS",
      program: "AI Starter",
      level: "SMP",
      progressPercent: 65,
      attendanceRate: 100,
      totalSessions: 6,
      completedSessions: 4,
      lastSessionDate: "Sep 4, 2026",
      nextSessionDate: "Today, 19:00 WIB",
      status: "active",
      notes: "Sangat tertarik dengan tools Generative AI dan prompting.",
    },
    {
      id: "std-003",
      name: "Sarah Putri",
      email: "sarah.putri@gmail.com",
      avatar: "SP",
      program: "Web Developer (React)",
      level: "Mahasiswa",
      progressPercent: 50,
      attendanceRate: 95,
      totalSessions: 12,
      completedSessions: 6,
      lastSessionDate: "Sep 5, 2026",
      nextSessionDate: "Today, 20:30 WIB",
      status: "active",
      notes: "Sedang menyelesaikan component architecture untuk portfolio.",
    },
    {
      id: "std-004",
      name: "Rina Wijaya",
      email: "rina.wijaya@gmail.com",
      avatar: "RW",
      program: "AI Developer (ML)",
      level: "Mahasiswa",
      progressPercent: 90,
      attendanceRate: 98,
      totalSessions: 12,
      completedSessions: 11,
      lastSessionDate: "Sep 7, 2026",
      nextSessionDate: "Sep 10, 2026",
      status: "active",
      notes: "Tinggal tahap akhir model evaluation dan deployment.",
    },
    {
      id: "std-005",
      name: "Kevin Tan",
      email: "kevin.tan@gmail.com",
      avatar: "KT",
      program: "Digital Starter",
      level: "SMP",
      progressPercent: 100,
      attendanceRate: 100,
      totalSessions: 8,
      completedSessions: 8,
      lastSessionDate: "Sep 1, 2026",
      nextSessionDate: "-",
      status: "completed",
      notes: "Program selesai dengan nilai A. Sertifikat telah diterbitkan.",
    },
  ],
};
