import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiBell,
  FiChevronDown,
  FiLogOut,
  FiMoon,
  FiSearch,
  FiSettings,
  FiSun,
  FiUser,
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";
import profile from "../assets/images/profile_img_3.png";
const titles = {
  "/app/dashboard": "Student Command Center",
  "/app/students": "Courses",
  "/app/teachers": "Lecturers",
  "/app/finance": "Fees & Payments",
  "/app/settings": "Settings",
  "/app/submit-work": "Submit Work",
  "/app/view-results": "View Results",
};
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("loggedIn");
    navigate("/login");
  };
  return (
    <header className="sticky top-0 z-40 border-b border-(--surface-border) bg-(--surface)/88 shadow-[0_10px_30px_rgba(24,29,49,0.05)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 px-4 py-3 md:px-6 lg:px-8">
        <div className="min-w-0">
          <p className="hidden text-[.65rem] font-bold uppercase tracking-[.18em] accent-text sm:block">
            School Overview
          </p>
          <h1 className="text-lg font-bold leading-tight truncate heading-text md:text-xl lg:text-2xl">
            {titles[location.pathname] || "EduSuite"}
          </h1>
        </div>
        <div className="flex items-center gap-2 md:gap-3 shrink-0">
          <label className="relative hidden md:block md:w-56 lg:w-80">
            <FiSearch className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400" />
            <input
              className="h-10 w-full rounded-2xl border border-(--surface-border) bg-(--surface-muted) py-2 pl-10 pr-4 text-sm outline-none"
              placeholder="Search courses, assignments..."
            />
          </label>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-full border border-(--surface-border) bg-(--surface-muted)"
          >
            {isDark ? <FiSun /> : <FiMoon />}
          </button>
          <button
            aria-label="Notifications"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-(--surface-border) bg-(--surface-muted)"
          >
            <FiBell />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-(--accent)" />
          </button>
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 rounded-2xl px-1.5 py-1 hover:bg-(--surface-muted)"
            >
              <img
                src={profile}
                alt="Profile"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-[#E5BA73]/50"
              />
              <div className="hidden text-sm text-left lg:block">
                <b className="block heading-text">Audi Mensah</b>
                <span className="text-xs muted-text">Computer Science</span>
              </div>
              <FiChevronDown className="text-slate-400" />
            </button>
            {open && (
              <div className="absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl border border-(--surface-border) bg-(--surface-strong) shadow-xl">
                <button className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-(--surface-muted)">
                  <FiUser /> Student Profile
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    navigate("/app/settings");
                  }}
                  className="flex w-full items-center gap-3 px-4 py-3 text-sm hover:bg-(--surface-muted)"
                >
                  <FiSettings /> Settings
                </button>
                <button
                  onClick={logout}
                  className="flex items-center w-full gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
