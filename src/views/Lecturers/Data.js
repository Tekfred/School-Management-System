export const lecturerStats = [
  {
    id: 1,
    title: 'Total Lecturers',
    value: '84',
    icon: 'school',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Present Today',
    value: '76',
    icon: 'person',
    color: 'green'
  },
  {
    id: 3,
    title: 'Courses Taught',
    value: '148',
    icon: 'menu_book',
    color: 'amber'
  },
  {
    id: 4,
    title: 'Average Rating',
    value: '4.8',
    icon: 'star',
    color: 'purple'
  }
]

export const lecturers = {
  stats: lecturerStats,
  list: [
    { id: 1, name: 'Dr. Michael Brown', department: 'Computer Science', courses: 4, rating: 4.8, status: 'Available', image: '/src/assets/lecturers/michael_brown.jpg' },
    { id: 2, name: 'Dr. Angela Mensah', department: 'Mathematics', courses: 3, rating: 4.6, status: 'In Class', image: '/src/assets/lecturers/angela_mensah.jpg' },
    { id: 3, name: 'Prof. Samuel Owusu', department: 'Business', courses: 5, rating: 4.7, status: 'Available', image: '/src/assets/lecturers/samuel_owusu.jpg' },
    { id: 4, name: 'Ms. Ama Aidoo', department: 'Engineering', courses: 2, rating: 4.4, status: 'On Leave', image: '/src/assets/lecturers/ama_aidoo.jpg' }
  ],
  top: [
    { id: 1, name: 'Dr. Michael Brown', score: 98 },
    { id: 2, name: 'Prof. Samuel Owusu', score: 92 }
  ],
  load: [
    { name: 'Dr. Michael Brown', load: 4 },
    { name: 'Prof. Samuel Owusu', load: 5 },
    { name: 'Dr. Angela Mensah', load: 3 }
  ],
  upcoming: [
    { id: 1, title: 'Algorithms - Lecture 5', lecturer: 'Dr. Michael Brown', time: 'Jun 4, 10:00' },
    { id: 2, title: 'Linear Algebra - Lecture 2', lecturer: 'Dr. Angela Mensah', time: 'Jun 5, 14:00' }
  ],
  availability: [
    { name: 'Dr. Michael Brown', slots: ['Mon 10-12','Wed 14-16'] },
    { name: 'Prof. Samuel Owusu', slots: ['Tue 9-11'] }
  ]
}

export default lecturers;