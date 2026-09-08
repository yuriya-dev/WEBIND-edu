export interface Lesson {
  id: string;
  title: string;
  duration: string;
  status: "completed" | "in-progress" | "upcoming";
  materialUrl?: string;
  hasExercise?: boolean;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Assignment {
  id: string;
  title: string;
  program: string;
  deadline: string;
  status: "pending" | "submitted" | "graded";
  score?: number;
  feedback?: string;
}

export interface ScheduleSession {
  id: string;
  title: string;
  program: string;
  date: string;
  time: string;
  tutorName: string;
  meetingLink: string;
  status: "scheduled" | "completed" | "rescheduled";
  notes?: string;
}

export interface SkillItem {
  name: string;
  status: "completed" | "in-progress" | "upcoming";
}

export interface StudentData {
  id: string;
  name: string;
  email: string;
  avatar: string;
  currentProgram: string;
  progressPercent: number;
  streakDays: number;
  attendanceRate: number;
  completedLessonsCount: number;
  totalLessonsCount: number;
  nextLesson: {
    title: string;
    program: string;
    time: string;
    date: string;
    meetingLink: string;
  };
  tutorNote: {
    tutorName: string;
    date: string;
    message: string;
  };
  skills: SkillItem[];
  schedule: ScheduleSession[];
  assignments: Assignment[];
  modules: Module[];
}

export const mockStudent: StudentData = {
  id: "std-001",
  name: "Andi Pratama",
  email: "andi.pratama@gmail.com",
  avatar: "AP",
  currentProgram: "Python Beginner & Algorithm",
  progressPercent: 80,
  streakDays: 7,
  attendanceRate: 92,
  completedLessonsCount: 8,
  totalLessonsCount: 10,
  nextLesson: {
    title: "Python Functions & Scope",
    program: "Python Beginner",
    time: "19:00 - 20:30 WIB",
    date: "Tomorrow",
    meetingLink: "https://meet.google.com/abc-defg-hij",
  },
  tutorNote: {
    tutorName: "Ahmad Fauzi",
    date: "Sep 7, 2026",
    message: "Andi sudah memahami konsep loop dan nested conditions dengan sangat baik. Sesi berikutnya kita akan fokus pada modularisasi kode menggunakan functions & return values.",
  },
  skills: [
    { name: "Computational Thinking", status: "completed" },
    { name: "Variables & Data Types", status: "completed" },
    { name: "Conditionals & Logic", status: "completed" },
    { name: "Loops & Iterations", status: "completed" },
    { name: "Functions & Parameters", status: "in-progress" },
    { name: "OOP Fundamentals", status: "upcoming" },
    { name: "File Handling & I/O", status: "upcoming" },
    { name: "Final Project: Quiz & Expense App", status: "upcoming" },
  ],
  schedule: [
    {
      id: "sch-1",
      title: "Python Functions & Scope",
      program: "Python Beginner",
      date: "Sep 9, 2026",
      time: "19:00 - 20:30 WIB",
      tutorName: "Ahmad Fauzi",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "scheduled",
      notes: "Siapkan mini project calculator",
    },
    {
      id: "sch-2",
      title: "OOP Basics (Classes & Objects)",
      program: "Python Beginner",
      date: "Sep 12, 2026",
      time: "19:00 - 20:30 WIB",
      tutorName: "Ahmad Fauzi",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "scheduled",
    },
    {
      id: "sch-3",
      title: "Loops & List Comprehension",
      program: "Python Beginner",
      date: "Sep 6, 2026",
      time: "19:00 - 20:30 WIB",
      tutorName: "Ahmad Fauzi",
      meetingLink: "https://meet.google.com/abc-defg-hij",
      status: "completed",
      notes: "Sangat antusias, tugas diselesaikan tepat waktu",
    },
  ],
  assignments: [
    {
      id: "asg-1",
      title: "Mini Project: CLI Quiz Game",
      program: "Python Beginner",
      deadline: "Sep 10, 2026",
      status: "pending",
    },
    {
      id: "asg-2",
      title: "Algorithm Flowchart for Number Guessing",
      program: "Python Beginner",
      deadline: "Sep 5, 2026",
      status: "graded",
      score: 95,
      feedback: "Logika flowchart sangat rapi dan penanganan edge case sudah tepat.",
    },
  ],
  modules: [
    {
      id: "mod-1",
      title: "Module 01: Computational Thinking & Basics",
      description: "Memahami logika pemecahan masalah komputasi dan sintaks dasar Python.",
      lessons: [
        { id: "les-1", title: "Intro to Algorithms & Flowcharts", duration: "90 min", status: "completed", hasExercise: true },
        { id: "les-2", title: "Variables, Numbers & String Operations", duration: "90 min", status: "completed", hasExercise: true },
      ],
    },
    {
      id: "mod-2",
      title: "Module 02: Control Flow & Logic",
      description: "Pengambilan keputusan dengan if-else, nested conditions, dan perulangan loop.",
      lessons: [
        { id: "les-3", title: "Conditionals & Boolean Operators", duration: "90 min", status: "completed", hasExercise: true },
        { id: "les-4", title: "For & While Loops Deep Dive", duration: "90 min", status: "completed", hasExercise: true },
      ],
    },
    {
      id: "mod-3",
      title: "Module 03: Functions & Modular Programming",
      description: "Menulis kode yang reusable dengan functions, parameters, and return values.",
      lessons: [
        { id: "les-5", title: "Defining Functions & Scope", duration: "90 min", status: "in-progress", hasExercise: true },
        { id: "les-6", title: "Lambda & Built-in Helper Functions", duration: "90 min", status: "upcoming", hasExercise: true },
      ],
    },
    {
      id: "mod-4",
      title: "Module 04: Final Project Showcase",
      description: "Membangun proyek aplikasi Python nyata untuk portofolio pribadi.",
      lessons: [
        { id: "les-7", title: "Project Architecture & Requirements", duration: "90 min", status: "upcoming", hasExercise: true },
        { id: "les-8", title: "Code Review & Final Showcase Presentation", duration: "90 min", status: "upcoming", hasExercise: false },
      ],
    },
  ],
};
