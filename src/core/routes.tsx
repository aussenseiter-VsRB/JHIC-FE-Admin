import type { RouteObject } from "react-router-dom";
import Layout from "./layout";
import Dashboard from "../modules/dashboard/dashboard";
import ManajemenUser from "../modules/manajemenUser/manajemenUser";
import ManajemenPkl from "../modules/manajemenPkl/manajemenPkl";
import StatusPpdb from "../modules/statusPpdb/statusPpdb";
import Login from "../modules/login/login";
import BuatBerita from "../modules/buatBerita/buatBerita";
import Proses from "../modules/manajemenSiswaBaru/proses/page";
import Approve from "../modules/manajemenSiswaBaru/approve/page";
import Cancel from "../modules/manajemenSiswaBaru/cancel/page";
import RequireAuth from "./requireAuth";
import RequireRole from "./requireRole";

const routes: RouteObject[] = [
  { path: "/", element: <Login /> },
  {
    element: <RequireAuth />,
    children: [
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "dashboard", element: <RequireRole roles={["admin", "guru"]}><Dashboard /></RequireRole> },
          { path: "buat-berita", element: <RequireRole roles={["jurnal"]}><BuatBerita /></RequireRole> },
          { path: "manajemen-user", element: <RequireRole roles={["admin"]}><ManajemenUser /></RequireRole> },
          { path: "manajemen-pkl", element: <RequireRole roles={["admin", "guru"]}><ManajemenPkl /></RequireRole> },
          { path: "status-ppdb", element: <RequireRole roles={["admin", "guru"]}><StatusPpdb /></RequireRole> },
          {
            path: "manajemen-siswa-baru",
            children: [
              { path: "proses", element: <RequireRole roles={["admin"]}><Proses /></RequireRole> },
              { path: "approve", element: <RequireRole roles={["admin"]}><Approve /></RequireRole> },
              { path: "cancel", element: <RequireRole roles={["admin"]}><Cancel /></RequireRole> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;