import { PageSection, Card } from "../../components/PageSection.jsx";
const results = [
  ["Software Engineering", "A-", "88%", "Dr. Michael Brown"],
  ["Data Structures", "A", "92%", "Dr. Angela Mensah"],
  ["Database Systems", "B+", "84%", "Prof. Samuel Owusu"],
  ["Mathematics Essentials", "B", "79%", "Prof. Samuel Owusu"],
];
export default function ViewResults() {
  return (
    <PageSection
      title="View Results"
      subtitle="Review your course results for the current semester."
    >
      <Card>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="font-bold heading-text">Semester 2 — 2024/2025</h3>
            <p className="text-xs muted-text">
              Your results and lecturer feedback
            </p>
          </div>
          <span className="px-3 py-2 text-sm font-bold rounded-xl bg-emerald-100 text-emerald-700">
            GPA 3.45
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[540px] text-left text-sm">
            <thead className="text-xs uppercase muted-text">
              <tr>
                <th className="py-3">Course</th>
                <th>Grade</th>
                <th>Score</th>
                <th>Lecturer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-(--surface-border)">
              {results.map(([course, grade, score, lecturer]) => (
                <tr key={course}>
                  <td className="py-4 font-semibold heading-text">{course}</td>
                  <td>
                    <span className="rounded-lg bg-(--surface-muted) px-3 py-1 font-bold">
                      {grade}
                    </span>
                  </td>
                  <td>{score}</td>
                  <td className="muted-text">{lecturer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageSection>
  );
}
