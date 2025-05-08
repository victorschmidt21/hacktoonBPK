import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ArticleView } from "./pages/articleView";
import { EventsListing } from "./pages/eventListing";
import { EventRegistration } from "./pages/eventRegistration";
import { LoginScreen } from "./pages/loginScreen";
import { RequireAuth } from "./components/RequireAuth";
import { MyArticle } from "./pages/myArticle";
import { EventRegistrationEdit } from "./pages/eventRegistrationEdit";

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
        ],
      },
    ],
  },
]);
