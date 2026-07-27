import type { RouteObject } from "react-router-dom";
import Layout from "./layout";
import ManajemenUser from "../modules/manajemenUser/manajemenUser";
import ManajemenPkl from "../modules/manajemenPkl/manajemenPkl";
import StatusPpdb from "../modules/statusPpdb/statusPpdb";
import Login from "../modules/login/login";

const routes: RouteObject[] = [
  { path: "/", element: <Login /> },
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <div className="text-2xl font-bold">Dashboard</div> },
      { path: "manajemen-user", element: <ManajemenUser /> },
      { path: "manajemen-pkl", element: <ManajemenPkl /> },
      { path: "status-ppdb", element: <StatusPpdb /> },
    ],
  },
];

export default routes;
