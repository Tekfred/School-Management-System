import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import MobileNavbar from "./MobileNavbar.jsx";
export default function MainLayout() {
  return (
    <div className="flex h-screen app-shell">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar />
        <main className="flex-1 pb-24 overflow-auto lg:pb-0">
          <Outlet />
        </main>
      </div>
      <MobileNavbar />
    </div>
  );
}
