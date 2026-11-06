import { useEffect, useState } from "react";
import {
  FiCreditCard,
  FiDownload,
  FiCheckCircle,
  FiClock,
  FiX,
  FiShield,
} from "react-icons/fi";
import { financeMock as feesData } from "../../integrations/mocks/financeMock.js";
import {
  PageSection,
  Card,
  Metric,
  SectionTitle,
} from "../../components/PageSection.jsx";
import IntegrationStatus from "../../components/IntegrationStatus.jsx";
import { useIntegrationResource } from "../../hooks/useIntegrationResource.js";
import { useWebSocket } from "../../hooks/useWebSocket.js";
import { getFinanceOverview, createPayment } from "../../integrations/api/financeApi.js";
import { integrationConfig } from "../../integrations/config.js";
const money = (n) =>
  `GHS ${Number(n).toLocaleString("en-GH", { minimumFractionDigits: 2 })}`;
export default function FinancialView() {
  const realtime = useWebSocket({ enabled: !integrationConfig.isMock });
  const resource = useIntegrationResource({ mockData: feesData, load: getFinanceOverview });
  const data = resource.data?.summary ? resource.data : feesData;
  const [payOpen, setPayOpen] = useState(false);
  const [amount, setAmount] = useState(feesData.summary.outstanding);
  const [method, setMethod] = useState("Mobile Money");
  const [toast, setToast] = useState("");
  const s = data.summary;
  useEffect(() => setAmount(s.outstanding), [s.outstanding]);
  const paid = Math.round((s.totalPaid / s.totalFees) * 100);
  const pay = async () => {
    try {
      if (!integrationConfig.isMock) await createPayment({ amount: Number(amount), method });
      setPayOpen(false);
      setToast(integrationConfig.isMock ? "Mock payment request prepared." : "Payment request submitted and is pending confirmation.");
    } catch (error) {
      setToast(error.message || "Could not submit the payment request.");
    }
    setTimeout(() => setToast(""), 3500);
  };
  return (
    <PageSection
      title="Fees & Payments"
      subtitle="Manage your student account and payment history."
      actions={
        <button
          onClick={() => setPayOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-(--accent) px-4 py-3 text-sm font-bold text-(--navy)"
        >
          <FiCreditCard /> Pay Fees
        </button>
      }
    >
      <IntegrationStatus loading={resource.loading} error={resource.error} />
      {!integrationConfig.isMock && <p className="mb-4 text-xs muted-text" role="status">Live payment updates: {realtime.status}</p>}
      <div className="grid gap-4 mb-6 sm:grid-cols-3">
        <Metric
          label="Total fees"
          value={money(s.totalFees)}
          detail={data.student.semester}
        />
        <Metric
          label="Amount paid"
          value={money(s.totalPaid)}
          detail={`${paid}% of fees paid`}
        />
        <Metric
          label="Outstanding balance"
          value={money(s.outstanding)}
          detail={`Due ${new Date(s.dueDate).toLocaleDateString("en-GH", { day: "numeric", month: "short", year: "numeric" })}`}
        />
      </div>
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-6">
          <Card>
            <div className="grid gap-6 md:grid-cols-[220px_1fr] md:items-center">
              <div className="relative grid mx-auto h-52 w-52 place-items-center">
                <svg className="-rotate-90" width="220" height="220">
                  <circle
                    cx="110"
                    cy="110"
                    r="96"
                    fill="none"
                    stroke="var(--surface-muted)"
                    strokeWidth="14"
                  />
                  <circle
                    cx="110"
                    cy="110"
                    r="96"
                    fill="none"
                    stroke="#E5BA73"
                    strokeWidth="14"
                    strokeLinecap="round"
                    strokeDasharray={603}
                    strokeDashoffset={603 * (1 - paid / 100)}
                  />
                </svg>
                <div className="absolute text-center">
                  <b className="block text-4xl heading-text">{paid}%</b>
                  <span className="text-xs muted-text">PAID</span>
                  <span className="block px-3 py-1 mt-2 text-xs font-bold rounded-full bg-amber-100 text-amber-800">
                    Partial
                  </span>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase muted-text">
                  Student
                </p>
                <h3 className="mt-1 text-xl font-bold heading-text">
                  {data.student.name}
                </h3>
                <p className="text-sm muted-text">
                  {data.student.id} · {data.student.program}
                </p>
                <div className="grid gap-3 mt-5 sm:grid-cols-3">
                  <div className="rounded-xl bg-(--surface-muted) p-3">
                    <small className="muted-text">Total fees</small>
                    <p className="font-bold heading-text">
                      {money(s.totalFees)}
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950 text-emerald-300">
                    <small>Amount paid</small>
                    <p className="font-bold">{money(s.totalPaid)}</p>
                  </div>
                  <div className="p-3 text-red-300 rounded-xl bg-red-950">
                    <small>Outstanding</small>
                    <p className="font-bold">{money(s.outstanding)}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <Card>
            <SectionTitle>Fees Breakdown</SectionTitle>
            <div className="divide-y divide-(--surface-border)">
              {(data.breakdown||[]).map((item) => (
                <div key={item.id} className="flex items-center gap-3 py-3">
                  <span
                    className={`grid h-8 w-8 place-items-center rounded-full ${item.paid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                  >
                    {item.paid ? <FiCheckCircle /> : <FiClock />}
                  </span>
                  <span className="flex-1 text-sm font-semibold body-text">
                    {item.label}
                  </span>
                  <span className="text-sm font-bold heading-text">
                    {money(item.amount)}
                  </span>
                  <span
                    className={`w-16 text-right text-xs font-bold ${item.paid ? "text-emerald-600" : "text-amber-600"}`}
                  >
                    {item.paid ? "Paid" : "Due"}
                  </span>
                </div>
              ))}
            </div>
          </Card>
          <Card>
            <div className="flex items-center justify-between">
              <SectionTitle>Payment History</SectionTitle>
              <button className="flex items-center gap-2 mb-4 text-xs font-bold accent-text">
                <FiDownload /> Export
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px] text-left text-sm">
                <thead className="text-xs uppercase muted-text">
                  <tr>
                    <th className="py-3">Receipt</th>
                    <th>Description</th>
                    <th>Date</th>
                    <th>Method</th>
                    <th className="text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-(--surface-border)">
                  {(data.history||[]).map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 font-semibold accent-text">{p.id}</td>
                      <td>{p.desc}</td>
                      <td>{new Date(p.date).toLocaleDateString("en-GH")}</td>
                      <td>{p.method}</td>
                      <td className="font-bold text-right">
                        {money(p.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <aside className="space-y-6">
          <Card>
            <SectionTitle>Upcoming Payments</SectionTitle>
            {(data.upcoming||[]).map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 border-b border-(--surface-border) py-3 last:border-0"
              >
                <FiClock className="mt-1 text-amber-600" />
                <div className="flex-1">
                  <b className="block text-sm heading-text">{item.label}</b>
                  <span className="text-xs muted-text">
                    Due{" "}
                    {new Date(item.due).toLocaleDateString("en-GH", {
                      day: "numeric",
                      month: "short",
                    })}
                  </span>
                </div>
                <b className="text-sm heading-text">{money(item.amount)}</b>
              </div>
            ))}
            <button
              onClick={() => setPayOpen(true)}
              className="mt-4 w-full rounded-xl bg-(--navy) py-3 text-sm font-bold text-white"
            >
              Pay outstanding
            </button>
          </Card>
          <Card className="bg-[#181D31] text-white">
            <div className="flex items-center gap-3">
              <FiShield className="text-2xl text-[#E5BA73]" />
              <b>Secure payments</b>
            </div>
            <p className="mt-3 text-sm text-slate-300">
              Payment information is protected and your receipts remain
              available here.
            </p>
          </Card>
        </aside>
      </div>
      {payOpen && (
        <div
          className="fixed inset-0 z-[100] grid place-items-center bg-slate-950/60 p-4"
          onMouseDown={(e) => e.target === e.currentTarget && setPayOpen(false)}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="payment-title"
            className="w-full max-w-lg rounded-3xl border border-(--surface-border) bg-(--surface-strong) p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-bold tracking-widest uppercase accent-text">
                  Secure checkout
                </p>
                <h2
                  id="payment-title"
                  className="mt-1 text-2xl font-bold heading-text"
                >
                  Make a payment
                </h2>
              </div>
              <button
                onClick={() => setPayOpen(false)}
                aria-label="Close"
                className="rounded-xl p-2 hover:bg-(--surface-muted)"
              >
                <FiX />
              </button>
            </div>
            <label className="block mt-6 text-sm font-semibold">
              Amount to pay{" "}
              <div className="mt-2 flex items-center rounded-xl border border-(--surface-border) bg-(--surface-muted) px-3">
                <span className="muted-text">GHS</span>
                <input
                  type="number"
                  min="1"
                  max={s.outstanding}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-3 py-3 bg-transparent outline-none"
                />
              </div>
            </label>
            <label className="block mt-4 text-sm font-semibold">
              Payment method
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="mt-2 w-full rounded-xl border border-(--surface-border) bg-(--surface-muted) px-3 py-3"
              >
                <option>Mobile Money</option>
                <option>Bank Transfer</option>
                <option>Card</option>
              </select>
            </label>
            <div className="mt-5 rounded-xl bg-(--surface-muted) p-4 text-sm">
              <div className="flex justify-between">
                <span className="muted-text">Student</span>
                <b>{data.student.name}</b>
              </div>
              <div className="flex justify-between mt-2">
                <span className="muted-text">Outstanding after payment</span>
                <b>{money(Math.max(0, s.outstanding - Number(amount || 0)))}</b>
              </div>
            </div>
            <button
              disabled={!Number(amount) || Number(amount) > s.outstanding}
              onClick={pay}
              className="mt-5 w-full rounded-xl bg-(--accent) py-3 font-bold text-(--navy) disabled:opacity-50"
            >
              Continue to {method}
            </button>
            <p className="flex items-center justify-center gap-2 mt-3 text-xs muted-text">
              <FiShield /> Encrypted and secure checkout
            </p>
          </section>
        </div>
      )}
      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-xl bg-(--navy) px-5 py-3 text-sm font-bold text-white shadow-xl"
        >
          {toast}
        </div>
      )}
    </PageSection>
  );
}
