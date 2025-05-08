import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/user/Layout";
import { Home } from "./pages/user/Home";
import { HomeAvaliador } from "./pages/avaliador/Home";
import { ArticleView } from "./pages/user/articleView";
import { EventsListing } from "./pages/user/eventListing";
import { EventRegistration } from "./pages/user/eventRegistration";
import { LoginScreen } from "./pages/loginScreen";
import { RequireAuth } from "./components/RequireAuth";
import { MyArticle } from "./pages/user/myArticle";
import { EventRegistrationEdit } from "./pages/user/eventRegistrationEdit";
import { EventView } from "./pages/user/eventView";
import { LayoutAvaliador } from "./components/avaliador/LayoutAvaliador";
import { EventViewAv } from "./pages/avaliador/eventView";
import { ArticleViewAv } from "./pages/avaliador/articleView";

export const routerApp = createBrowserRouter([
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        element: <Layout />,
        children: [
          {
            element: <Home />,
            path: "/",
          },
          {
            element: <ArticleView />,
            path: "/article/:id",
          },
          {
            element: <MyArticle />,
            path: "/artigos",
          },
          {
            element: <EventsListing />,
            path: "/eventos",
          },
          {
            element: <EventRegistration />,
            path: "/eventregistration/new/:id",
          },
          {
            element: <EventRegistrationEdit />,
            path: "/eventregistration/:id",
          },
          {
            element: <EventView />,
            path: "/event/:id",
          },
        ],
      },
      {
        element: <LayoutAvaliador />,
        children: [
          {
            element: <HomeAvaliador />,
            path: "/avaliador",
          },
          {
            element: <EventViewAv />,
            path: "/avaliador/event/:id",
          },
          {
            element: <ArticleViewAv />,
            path: "/avaliador/article/:id",
          },
        ],
      },
    ],
  },
]);
