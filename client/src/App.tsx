import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import  Home from "./pages/Home";
import ArticleView from "./pages/article";
import EventsListing from "./pages/Event";

export const routerApp = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        element: <Home/>,
        path: "/"
      },
      {
        element: <ArticleView/>,
        path: "/article/:id"
      },
      {
        element: <EventsListing/>,
        path: "/eventos"
      }
    ]
  }
])