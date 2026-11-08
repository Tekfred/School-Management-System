import { useState } from "react";
import { PageSection, Card } from "../../components/PageSection.jsx";
export default function SubmitWork() {
  const [file, setFile] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  return (
    <PageSection
      title="Submit Work"
      subtitle="Upload an assignment for assessment."
    >
      <Card className="mx-auto max-w-3xl">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSubmitted(true);
          }}
        >
          <label className="block text-sm font-semibold">
            Assignment
            <select
              required
              className="mt-2 w-full rounded-xl border border-(--surface-border) bg-(--surface-muted) px-4 py-3"
            >
              <option value="">Choose an assignment</option>
              <option>Software Engineering Project</option>
              <option>Data Structures — Assignment 4</option>
              <option>Database Systems Report</option>
            </select>
          </label>
          <label className="mt-5 block text-sm font-semibold">
            Submission notes
            <textarea
              rows="4"
              className="mt-2 w-full rounded-xl border border-(--surface-border) bg-(--surface-muted) px-4 py-3"
              placeholder="Add a note for your lecturer"
            />
          </label>
          <label className="mt-5 block rounded-2xl border-2 border-dashed border-(--surface-border-strong) p-8 text-center">
            <span className="block font-semibold heading-text">
              {file ? file.name : "Choose your assignment file"}
            </span>
            <span className="mt-1 block text-xs muted-text">
              PDF, DOCX or ZIP · up to 20 MB
            </span>
            <input
              type="file"
              accept=".pdf,.doc,.docx,.zip"
              onChange={(e) => setFile(e.target.files?.[0])}
              className="mt-4 text-sm"
            />
          </label>
          <button className="mt-5 rounded-xl bg-(--accent) px-5 py-3 font-bold text-(--navy)">
            Submit assignment
          </button>
          {submitted && (
            <p
              role="status"
              className="mt-4 text-sm font-semibold text-emerald-600"
            >
              Submission saved successfully.
            </p>
          )}
        </form>
      </Card>
    </PageSection>
  );
}
