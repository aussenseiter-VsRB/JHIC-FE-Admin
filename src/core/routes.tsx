import type { RouteObject } from "react-router-dom";
import Layout from "./layout";
import Dashboard from "../modules/dashboard/dashboard";
import ManajemenUser from "../modules/manajemenUser/manajemenUser";
import ManajemenPkl from "../modules/manajemenPkl/manajemenPkl";
import StatusPpdb from "../modules/statusPpdb/statusPpdb";
import Login from "../modules/login/login";
import Proses from "../modules/manajemenSiswaBaru/proses/page";
import Approve from "../modules/manajemenSiswaBaru/approve/page";
import Cancel from "../modules/manajemenSiswaBaru/cancel/page";

const routes: RouteObject[] = [
  { path: "/", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "manajemen-user", element: <ManajemenUser /> },
      { path: "manajemen-pkl", element: <ManajemenPkl /> },
      { path: "status-ppdb", element: <StatusPpdb /> },
      {
        path: "manajemen-siswa-baru",
        children: [
          { path: "proses", element: <Proses /> },
          { path: "approve", element: <Approve /> },
          { path: "cancel", element: <Cancel /> },
        ],
      },
    ],
  },
];

export default routes;
