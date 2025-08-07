import React from "react";
import { toast, ToastContainer } from "react-toastify";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./utils/AppRoute";

const App: React.FC = () => {
  const router = createBrowserRouter(AppRoutes);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
};

export default App;
