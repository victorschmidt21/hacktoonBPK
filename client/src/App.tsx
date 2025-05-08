import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { ArticleView } from "./pages/articleView";
import { EventsListing } from "./pages/eventListing";
import { EventRegistration } from "./pages/eventRegistration";
import { LoginScreen } from "./pages/loginScreen";
import { RequireAuth } from "./components/RequireAuth";
import { MyArticle } from "./pages/myArticle";

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
            path: "/article",
          },
          {
            element: <EventsListing />,
            path: "/eventos",
          },
          {
            element: <EventRegistration />,
            path: "/eventregistration/new/:id",
          },
        ],
      },
    ],
  },
]);
