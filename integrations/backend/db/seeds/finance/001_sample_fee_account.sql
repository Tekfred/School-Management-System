INSERT INTO finance.fee_accounts (id, student_id, total_fees, total_paid, outstanding, due_date, status, is_primary)
SELECT 1, id, 12500, 9200, 3300, '2025-07-31', 'partial', TRUE
FROM core.students WHERE student_number = 'CS/2022/0047'
ON CONFLICT (id) DO NOTHING;
INSERT INTO finance.fee_items (id, fee_account_id, label, amount, paid) VALUES
(1, 1, 'Tuition Fee', 8000, TRUE), (2, 1, 'Examination Fee', 1200, TRUE),
(3, 1, 'Library Fee', 500, TRUE), (4, 1, 'Laboratory Fee', 800, FALSE),
(5, 1, 'Sports & Activities', 600, FALSE), (6, 1, 'Student Union Levy', 400, FALSE),
(7, 1, 'Health Insurance', 500, FALSE)
ON CONFLICT (id) DO NOTHING;

INSERT INTO finance.payments (student_id, receipt_number, description, method, reference, amount, status, paid_at)
SELECT s.id, p.receipt_number, p.description, p.method, p.reference, p.amount, 'paid', p.paid_at
FROM core.students s
CROSS JOIN (VALUES
  ('RCP-2025-0041', 'Tuition Fee — 2nd Instalment', 'Mobile Money', 'GH-MM-88291047', 4000.00::numeric, '2025-06-10'::timestamptz),
  ('RCP-2025-0028', 'Examination & Library Fee', 'Bank Transfer', 'GH-BT-33910284', 1700.00::numeric, '2025-04-02'::timestamptz),
  ('RCP-2025-0011', 'Tuition Fee — 1st Instalment', 'Mobile Money', 'GH-MM-77201938', 3500.00::numeric, '2025-01-15'::timestamptz),
  ('RCP-2024-0093', 'Registration & Admin Fee', 'Cash', 'GH-CS-10029381', 420.00::numeric, '2024-09-05'::timestamptz)
) AS p(receipt_number, description, method, reference, amount, paid_at)
WHERE s.student_number = 'CS/2022/0047'
AND NOT EXISTS (SELECT 1 FROM finance.payments existing WHERE existing.receipt_number = p.receipt_number);
