import { NavLink } from "react-router-dom";
import {
  FiGrid,
  FiBookOpen,
  FiUsers,
  FiCreditCard,
  FiSettings,
} from "react-icons/fi";
const items = [
  ["Dashboard", "/app/dashboard", FiGrid],
  ["Courses", "/app/students", FiBookOpen],
  ["Lecturers", "/app/teachers", FiUsers],
  ["Fees", "/app/finance", FiCreditCard],
  ["Settings", "/app/settings", FiSettings],
];
export default function MobileNavbar() {
  return (
    <nav className="fixed z-50 bottom-4 left-3 right-3 lg:hidden">
      <div className="nav-pill flex items-center justify-around px-1 py-2 rounded-[28px]">
        {items.map(([name, to, Icon]) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `relative flex min-w-13 flex-col items-center gap-1 rounded-2xl px-2 py-1.5 text-[10px] ${isActive ? "text-[#E5BA73]" : "text-(--subtle-text)"}`
            }
          >
            <Icon className="text-xl" />
            {name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
