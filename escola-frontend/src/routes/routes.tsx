import { createBrowserRouter } from "react-router-dom";

// import BaseLayout from "@/components/global/BaseLayout";
import ClientLayout from "@/components/global/ClientLayout";
// import AdminLayout from "@/components/global/AdminLayout";

// import Landing from "@/pages/Landing/Landing";
// import Login from "@/pages/Login/Login";

import Home from "@/pages/ClientPages/Home/Home";
import Sobre from "@/pages/ClientPages/Sobre/Sobre";
// import Event from "@/pages/ClientPages/Event/Events";
import FAQ from "@/pages/ClientPages/FAQ/FAQ";
import Contact from "@/pages/ClientPages/Contact/Contact";

// import AdminHome from "@/pages/AdminPages/Home/AdminHome";
// import AdminPromotion from "@/pages/AdminPages/Promotion/AdminPromotion";
// import AdminFeedback from "@/pages/AdminPages/Feedback/AdminFeedback";
// import AdminEvent from "@/pages/AdminPages/Event/AdminEvent";
// import AdminFAQ from "@/pages/AdminPages/FAQ/AdminFAQ";

import NotFoundPage from "@/pages/NotFound/NotFoundPage";
// import AdminRoutes from "./AdminRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ClientLayout>
        <Home />
      </ClientLayout>
    ),
  },
  // {
  //   path: "/login",
  //   element: (
  //     <BaseLayout>
  //       <Login />
  //     </BaseLayout>
  //   ),
  // },
  // {
  //   path: "/painel",
  //   element: (
  //     <BaseLayout>
  //       <Landing />
  //     </BaseLayout>
  //   ),
  // },
  {
    path: "/sobre",
    element: (
      <ClientLayout>
        <Sobre />
      </ClientLayout>
    ),
  },
  // {
  //   path: "/eventos",
  //   element: (
  //     <ClientLayout>
  //       <Event />
  //     </ClientLayout>
  //   ),
  // },
  {
    path: "/perguntas-frequentes",
    element: (
      <ClientLayout>
        <FAQ />
      </ClientLayout>
    ),
  },
  {
    path: "/contato",
    element: (
      <ClientLayout>
        <Contact />
      </ClientLayout>
    ),
  },

  // {
  //   path: "/admin",
  //   element: <AdminRoutes />,
  //   children: [
  //     {
  //       path: "inicio",
  //       element: (
  //         <AdminLayout>
  //           <AdminHome />
  //         </AdminLayout>
  //       ),
  //     },
  //     {
  //       path: "promocao",
  //       element: (
  //         <AdminLayout>
  //           <AdminPromotion />
  //         </AdminLayout>
  //       ),
  //     },
  //     {
  //       path: "feedback",
  //       element: (
  //         <AdminLayout>
  //           <AdminFeedback />
  //         </AdminLayout>
  //       ),
  //     },
  //     {
  //       path: "eventos",
  //       element: (
  //         <AdminLayout>
  //           <AdminEvent />
  //         </AdminLayout>
  //       ),
  //     },
  //     {
  //       path: "perguntas-frequentes",
  //       element: (
  //         <AdminLayout>
  //           <AdminFAQ />
  //         </AdminLayout>
  //       ),
  //     },
  //   ],
  // },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
