import React, { lazy } from "react";

const Dashboard = lazy(() => import("../Pages/Dashboard"));
const Login = lazy(() => import("../Pages/Login"));
const Register = lazy(() => import("../Pages/Register"));

const routes = [
  {
    path: "register",
    element: <Register />,
    isPrivate: false,
  },
  {
    path: "login",
    element: <Login />,
    isPrivate: false,
  },
  {
    path: "",
    element: <Dashboard />,
    isPrivate: true,
  },
];

export default routes;
