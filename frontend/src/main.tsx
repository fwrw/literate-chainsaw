import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";

import { Home, Login, Register, About } from "./pages";
import Tasks from "./pages/userPages/Tasks/Tasks";
import useAuth from "./hooks/useAuth";
import UserHome from "./pages/userPages/UserHome/UserHome";
import NewTask from "./pages/userPages/Tasks/NewTask";
import Tags from "./pages/userPages/Tags/Tags";
import NewTag from "./pages/userPages/Tags/NewTag";
import UpdateTask from "./pages/userPages/Tasks/UpdateTask";
import UpdateTag from "./pages/userPages/Tags/UpdateTag";
import AddTags from "./pages/userPages/Tasks/AddTags";
import { JSX } from "react";

const ProtectedRoute = ({ element }: { element: JSX.Element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to="/home" />;
};

const router = createBrowserRouter([
  { path: "/", element: <ProtectedRoute element={<UserHome />} /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/about", element: <About /> },
  { path: "/tasks", element: <ProtectedRoute element={<Tasks />} /> },
  { path: "/tags", element: <ProtectedRoute element={<Tags />} /> },
  { path: "/new-task", element: <ProtectedRoute element={<NewTask />} /> },
  { path: "/new-tag", element: <ProtectedRoute element={<NewTag />} /> },
  { path: "/update-task/:id", element: <ProtectedRoute element={<UpdateTask />} /> },
  { path: "/update-tag/:id", element: <ProtectedRoute element={<UpdateTag />} /> },
  { path: "/add-tag/:id", element: <ProtectedRoute element={<AddTags />} /> },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
