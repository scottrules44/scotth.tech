import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Apps from "./pages/Apps";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Plugins from "./pages/Plugins";
import PluginDoc from "./pages/PluginDoc";
import Contact from "./pages/Contact";
import ErrorHandlePage from "./pages/ErrorHandlePage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/apps",
    element: <Apps/>,
  },
  {
    path: "/projects",
    element: <Projects/>,
  },
  {
    path: "/plugins",
    element: <Plugins/>,
  },
  {
    path: "/plugin/:pluginName",
    element: <PluginDoc/>,
  },
  {
    path: "/contact",
    element: <Contact/>,
  },
  {
    path:"*",
    element:<ErrorHandlePage/>,
  }
], {
  //basename: "/scotth.tech",
});


export default router;
