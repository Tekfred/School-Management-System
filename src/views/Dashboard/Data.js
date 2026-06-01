export const activeStatus = [
  {
    id: 1,
    name: 'Current GPA',
    value: '3.45',
    borderColor: 'border-blue-500',
    message: '+0.18 from last semester',
    icon: 'trending_up',
    bgcolor: '#ebf2fe',
  },
  {
    id: 2,
    name: 'Attendance',
    value: '80%',
    borderColor: 'border-green-500',
    message: 'Perfect week in 3 courses',
    icon: 'fact_check',
    bgcolor: '#e7f7f2',
  },
  {
    id: 3,
    name: 'Assignments',
    value: '7/10',
    borderColor: 'border-amber-400',
    message: '2 due this week',
    icon: 'assignment_turned_in',
    bgcolor: '#fdf5e6',
  },
  {
    id: 4,
    name: 'Credits Earned',
    value: '96',
    borderColor: 'border-red-500',
    message: '24 credits remaining',
    icon: 'workspace_premium',
    bgcolor: '#fdebee',
  },
]

export const enrollmentData = [
  { month: 'Jan', students: 62, percent: 62 },
  { month: 'Feb', students: 68, percent: 68 },
  { month: 'Mar', students: 74, percent: 74 },
  { month: 'Apr', students: 79, percent: 79 },
  { month: 'May', students: 84, percent: 84 },
  { month: 'Jun', students: 91, percent: 91 },
]

export const quickActions = [
  {
    id: 1,
    name: 'Submit Work',
    description: 'Upload assignment',
    icon: 'upload_file',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    route: '/app/dashboard',
  },
  {
    id: 2,
    name: 'View Results',
    description: 'Check grades',
    icon: 'bar_chart',
    bgHex: '#ecfdf5',
    textHex: '#059669',
    route: '/app/dashboard',
  },
  {
    id: 3,
    name: 'Pay Fees',
    description: 'Open billing',
    icon: 'credit_card',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    route: '/app/finance',
  },
  {
    id: 4,
    name: 'Ask Lecturer',
    description: 'Start discussion',
    icon: 'forum',
    bgHex: '#fff1f2',
    textHex: '#db2777',
    route: '/app/teachers',
  },
]

export const recentActivities = [
  {
    id: 1,
    iconText: 'DS',
    BoldText: 'Data Structures',
    messages: ' assignment graded:',
    BoldText2: 'A-',
    TimeRanges: '2 hours ago',
    border: 'border-blue-500',
  },
  {
    id: 2,
    iconText: 'DB',
    BoldText: 'Database Systems',
    messages: ' lab submission received for ',
    BoldText2: 'Normalization Project',
    TimeRanges: '4 hours ago',
    border: 'border-green-500',
  },
  {
    id: 3,
    iconText: 'SE',
    BoldText: 'Software Engineering',
    messages: ' unlocked badge ',
    BoldText2: 'Early Submission',
    TimeRanges: 'Yesterday',
    border: 'border-amber-400',
  },
  {
    id: 4,
    iconText: 'AI',
    BoldText: 'AI Club',
    messages: ' posted new event ',
    BoldText2: 'Hack Night',
    TimeRanges: '2 days ago',
    border: 'border-red-400',
  },
  {
    id: 5,
    iconText: 'CS',
    BoldText: 'Career Services',
    messages: ' shared internship:',
    BoldText2: 'Frontend Trainee',
    TimeRanges: '3 days ago',
    border: 'border-gray-300',
  },
]

export const upcomingEvents = [
  {
    id: 1,
    Events: 'Database Systems quiz',
    Timeline: 'Jun 4, 2026',
    border: 'border-blue-500',
    dot: 'bg-blue-100',
    Time: '10:00 AM',
  },
  {
    id: 2,
    Events: 'Software Engineering demo',
    Timeline: 'Jun 7, 2026',
    border: 'border-green-500',
    dot: 'bg-green-100',
    Time: '2:00 PM',
  },
  {
    id: 3,
    Events: 'Tuition payment deadline',
    Timeline: 'Jun 10, 2026',
    border: 'border-red-500',
    dot: 'bg-red-100',
    Time: '11:59 PM',
  },
  {
    id: 4,
    Events: 'AI Club Hack Night',
    Timeline: 'Jun 14, 2026',
    border: 'border-amber-500',
    dot: 'bg-amber-100',
    Time: '6:30 PM',
  },
]

export const courses = [
  {
    id: 1,
    code: 'CS 302',
    name: 'Data Structures',
    lecturer: 'Dr. Mensah',
    progress: 75,
    nextTask: 'Binary trees lab',
    accent: '#3b82f6',
  },
  {
    id: 2,
    code: 'CS 318',
    name: 'Database Systems',
    lecturer: 'Prof. Owusu',
    progress: 50,
    nextTask: 'ERD quiz',
    accent: '#10b981',
  },
  {
    id: 3,
    code: 'CS 330',
    name: 'Software Engineering',
    lecturer: 'Ms. Aidoo',
    progress: 90,
    nextTask: 'Sprint demo',
    accent: '#E5BA73',
  },
]

export const achievements = [
  { id: 1, name: 'Perfect Attendance', icon: 'verified', detail: '3 weeks clean' },
  { id: 2, name: 'Top Performer', icon: 'military_tech', detail: 'Top 8% this semester' },
  { id: 3, name: 'Assignment Master', icon: 'task_alt', detail: '7 of 10 completed' },
  { id: 4, name: 'Early Submission', icon: 'bolt', detail: '4 tasks early' },
]

export const campusFeed = [
  { id: 1, label: 'Announcement', title: 'Mid-semester results are now available', time: 'Today' },
  { id: 2, label: 'Internship', title: 'Frontend trainee role opened at DevWorks', time: 'Jun 3' },
  { id: 3, label: 'Competition', title: 'Register for the campus hackathon', time: 'Jun 8' },
]

export const studentProgress = {
  name: 'Audi',
  level: 5,
  streak: 14,
  gpa: 3.45,
  semesterProgress: 68,
  attendance: 80,
  assignmentsDone: 7,
  assignmentsTotal: 10,
  creditsEarned: 96,
  creditsTotal: 120,
}

export default {
  activeStatus,
  enrollmentData,
  quickActions,
  recentActivities,
  upcomingEvents,
  courses,
  achievements,
  campusFeed,
  studentProgress,
}
