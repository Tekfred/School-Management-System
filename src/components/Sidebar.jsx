import { NavLink } from "react-router-dom";
import {
  FiBookOpen,
  FiChevronLeft,
  FiGrid,
  FiUsers,
  FiCreditCard,
} from "react-icons/fi";
import { useUI } from "../contexts/UIContext.jsx";
const items = [
  ["Dashboard", "/app/dashboard", FiGrid],
  ["Courses", "/app/students", FiBookOpen],
  ["Lecturers", "/app/teachers", FiUsers],
  ["Fees", "/app/finance", FiCreditCard],
];
export default function Sidebar() {
  const { isSidebarOpen, toggleSidebar } = useUI();
  return (
    <aside
      className={`hidden shrink-0 flex-col border-r border-white/10 bg-(--navy) text-white shadow-2xl transition-all duration-300 lg:flex ${isSidebarOpen ? "w-72" : "w-24"}`}
    >
      <div className="p-6">
        <div
          className={`flex items-center gap-3 ${isSidebarOpen ? "justify-between" : "justify-center"}`}
        >
          <div className="flex items-center min-w-0 gap-3">
            <div className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-(--accent) text-(--navy)">
              <FiBookOpen />
            </div>
            {isSidebarOpen && (
              <div>
                <p className="text-xl font-bold">EduSuite</p>
                <p className="text-xs font-semibold uppercase tracking-[.18em] text-(--accent)">
                  Campus OS
                </p>
              </div>
            )}
          </div>
          <button
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            className="grid border h-9 w-9 place-items-center rounded-xl border-white/10 bg-white/10"
          >
            <FiChevronLeft className={!isSidebarOpen ? "rotate-180" : ""} />
          </button>
        </div>
      </div>
      <div className="p-4 mx-4 border rounded-2xl border-white/10 bg-white/10">
        <p className="text-sm font-semibold">Level 5 Student</p>
        <div className="h-2 mt-3 rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-(--accent)" />
        </div>
        <div className="flex justify-between mt-3 text-xs">
          <span>Semester progress</span>
          <span>68%</span>
        </div>
      </div>
      <nav
        className={`mt-6 flex-1 space-y-1.5 ${isSidebarOpen ? "px-4" : "px-3"}`}
      >
        {items.map(([label, to, Icon]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center rounded-2xl border border-transparent py-3 font-semibold text-slate-300 hover:bg-white/10 ${isSidebarOpen ? "gap-3 px-4" : "justify-center"} ${isActive ? "bg-(--accent)! text-(--navy)!" : ""}`
            }
          >
            <Icon className="text-xl shrink-0" />
            {isSidebarOpen && label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
