import { Outlet } from "react-router-dom";
import Sidebar from "../components/sidebar/Sidebar";

function Layout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="ml-[240px] flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
