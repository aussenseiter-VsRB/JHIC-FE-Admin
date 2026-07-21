import type { RouteObject } from "react-router-dom";
import Layout from "./layout";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <div className="text-2xl font-bold">Dashboard</div> },
      { path: "dashboard", element: <div className="text-2xl font-bold">Dashboard</div> },
      { path: "manajemen-user", element: <div className="text-2xl font-bold">Manajemen User</div> },
    ],
  },
];

export default routes;
