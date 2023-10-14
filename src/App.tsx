import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/Home";
import UserListPage from "./pages/UserList";
import UserDetailPage from "./pages/UserDetail";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/user-list", element: <UserListPage /> },
  { path: "/user-detail", element: <UserDetailPage /> },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
