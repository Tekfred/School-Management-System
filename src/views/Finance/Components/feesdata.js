// src/views/Finance/Data.js

export const feesData = {
  student: {
    name: 'Audi Mensah',
    id: 'CS/2022/0047',
    program: 'Computer Science',
    level: 'Level 5',
    semester: 'Semester 2 — 2024/2025',
    avatar: null,
  },

  summary: {
    totalFees:   12500.00,
    totalPaid:   9200.00,
    outstanding: 3300.00,
    dueDate:     '2025-07-31',
    status:      'partial', // 'paid' | 'partial' | 'overdue'
  },

  breakdown: [
    { id: 1, label: 'Tuition Fee',         amount: 8000.00, paid: true  },
    { id: 2, label: 'Examination Fee',     amount: 1200.00, paid: true  },
    { id: 3, label: 'Library Fee',         amount:  500.00, paid: true  },
    { id: 4, label: 'Laboratory Fee',      amount:  800.00, paid: false },
    { id: 5, label: 'Sports & Activities', amount:  600.00, paid: false },
    { id: 6, label: 'Student Union Levy',  amount:  400.00, paid: false },
    { id: 7, label: 'Health Insurance',    amount:  500.00, paid: false },
                                         // Paid so far: 9200 | Remaining: 2300 
                                         // But outstanding shown as 3300 to show split
                                         // (some fees partially paid in history)
                                         
  ],

  history: [
    {
      id:       'RCP-2025-0041',
      date:     '2025-06-10',
      desc:     'Tuition Fee — 2nd Instalment',
      method:   'Mobile Money',
      ref:      'GH-MM-88291047',
      amount:   4000.00,
      status:   'paid',
    },
    {
      id:       'RCP-2025-0028',
      date:     '2025-04-02',
      desc:     'Examination & Library Fee',
      method:   'Bank Transfer',
      ref:      'GH-BT-33910284',
      amount:   1700.00,
      status:   'paid',
    },
    {
      id:       'RCP-2025-0011',
      date:     '2025-01-15',
      desc:     'Tuition Fee — 1st Instalment',
      method:   'Mobile Money',
      ref:      'GH-MM-77201938',
      amount:   3500.00,
      status:   'paid',
    },
    {
      id:       'RCP-2024-0093',
      date:     '2024-09-05',
      desc:     'Registration & Admin Fee',
      method:   'Cash',
      ref:      'GH-CS-10029381',
      amount:   420.00,
      status:   'paid',
    },
  ],

  upcoming: [
    { label: 'Laboratory Fee',      amount:  800.00, due: '2025-07-31' },
    { label: 'Sports & Activities', amount:  600.00, due: '2025-07-31' },
    { label: 'Student Union Levy',  amount:  400.00, due: '2025-08-15' },
    { label: 'Health Insurance',    amount:  500.00, due: '2025-08-15' },
  ],
}

export default feesData