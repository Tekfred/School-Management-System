import { useState } from "react";
import { PageSection, Card } from "../../components/PageSection.jsx";
export default function SettingsView() {
  const [saved, setSaved] = useState(false);
  const [alerts, setAlerts] = useState(true);
  const [email, setEmail] = useState(true);
  return (
    <PageSection
      title="Settings"
      subtitle="Manage your profile and student portal preferences."
    >
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <Card>
          <h3 className="mb-5 text-lg font-bold heading-text">
            Student Profile
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full name" value="Audi Mensah" />
            <Field label="Student ID" value="CS/2022/0047" />
            <Field label="Email address" value="audi.mensah@edusuite.edu" />
            <Field label="Programme" value="Computer Science" />
          </div>
          <button
            onClick={() => {
              setSaved(true);
              setTimeout(() => setSaved(false), 2500);
            }}
            className="mt-6 rounded-xl bg-(--navy) px-5 py-3 text-sm font-bold text-white"
          >
            Save changes
          </button>
          {saved && (
            <p role="status" className="mt-3 text-sm text-emerald-600">
              Your preferences have been saved.
            </p>
          )}
        </Card>
        <Card>
          <h3 className="mb-5 text-lg font-bold heading-text">Notifications</h3>
          <Toggle
            title="Portal notifications"
            description="Important academic activity"
            checked={alerts}
            onChange={setAlerts}
          />
          <Toggle
            title="Email updates"
            description="Deadlines and payment receipts"
            checked={email}
            onChange={setEmail}
          />
        </Card>
      </div>
    </PageSection>
  );
}
function Field({ label, value }) {
  return (
    <label className="text-sm font-semibold body-text">
      {label}
      <input
        defaultValue={value}
        className="mt-2 w-full rounded-xl border border-(--surface-border) bg-(--surface-muted) px-4 py-3 outline-none"
      />
    </label>
  );
}
function Toggle({ title, description, checked, onChange }) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 border-b border-(--surface-border) py-4 last:border-0">
      <span>
        <b className="block text-sm heading-text">{title}</b>
        <small className="muted-text">{description}</small>
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-5 h-5 accent-amber-500"
      />
    </label>
  );
}
