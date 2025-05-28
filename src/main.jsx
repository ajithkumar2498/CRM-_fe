import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/login/LoginPage.jsx";
import ProtectedRoute from "./utils/protectedRoute.jsx";
import Dashboard from "./pages/dashboard.jsx";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { ToastContainer } from "react-toastify";
import ContactsPage from "./pages/ContactsPage.jsx";
import CompanyPage from "./pages/CompanyPage.jsx";
import DealsPage from "./pages/DealsPage.jsx";
import { Layout } from "./App.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children:[
      {
         path: "/dashboard",
         element: (       <ProtectedRoute>  <Dashboard />  </ProtectedRoute>     ),
    },
    {
        path:"/contacts",
        element: (<ProtectedRoute><ContactsPage/></ProtectedRoute>)
    },
    {
        path:"/deals",
        element: (<ProtectedRoute><DealsPage/></ProtectedRoute>)
    },
    {
        path:"/company",
        element: (<ProtectedRoute><CompanyPage/></ProtectedRoute>)
    },
    {
      path:"*",
      element:(<div>404 Page Not Found</div>)
    }
  ]
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right"  autoClose={3000}/>
        </>
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
