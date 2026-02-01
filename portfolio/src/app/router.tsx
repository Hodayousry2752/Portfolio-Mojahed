import { createHashRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Skills from "../pages/Skills";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";
import GallerySection from "../pages/GallerySection";
import Contact from "../pages/Contact";

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/skills", element: <Skills /> },
      { path: "/projects", element: <Projects /> },
      { path: "/experience", element: <Experience /> },
      { path: "/gallary", element: <GallerySection/> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);
