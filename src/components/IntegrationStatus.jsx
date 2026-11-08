export default function IntegrationStatus({ loading, error }) {
  if (!loading && !error) return null;
  return (
    <div
      className={`mb-4 rounded-xl border px-4 py-3 text-sm ${error ? "border-red-200 bg-red-50 text-red-700" : "border-sky-200 bg-sky-50 text-sky-800"}`}
      role={error ? "alert" : "status"}
    >
      {error ? `Could not load live data: ${error}` : "Loading live data…"}
    </div>
  );
}
