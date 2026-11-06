export function PageSection({ title, subtitle, children, actions }) {
  return (
    <section className="min-h-full px-4 py-6 app-page sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[.18em] accent-text">
            EduSuite · Campus OS
          </p>
          <h2 className="mt-1 text-3xl font-bold heading-text">{title}</h2>
          {subtitle && <p className="mt-1 text-sm muted-text">{subtitle}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
export function Card({ children, className = "" }) {
  return (
    <div className={`surface-card rounded-2xl p-5 ${className}`}>
      {children}
    </div>
  );
}
export function Metric({ label, value, detail }) {
  return (
    <Card>
      <p className="text-sm muted-text">{label}</p>
      <p className="mt-2 text-3xl font-bold heading-text">{value}</p>
      {detail && <p className="mt-1 text-xs muted-text">{detail}</p>}
    </Card>
  );
}
export function SectionTitle({ children }) {
  return <h3 className="mb-4 font-bold heading-text">{children}</h3>;
}
