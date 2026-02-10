import { createHashRouter } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/Home";
import About from "../pages/About";
import Skills from "../pages/Skills";
import Projects from "../pages/Projects";
import Experience from "../pages/Experience";
import DroneGallery from "../pages/DroneGallery";
import Contact from "../pages/Contact";
import RealEstateVideos from '../pages/RealEstateVideos';
import CommercialVideos from '../pages/CommercialVideos';
import IndustrialVideos from '../pages/IndustrialVideos';
import MedicalVideos from '../pages/MedicalVideos';
import CorporateVideos from '../pages/CorporateVideos';
import MotionGraphics from '../pages/MotionGraphics';

export const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/about", element: <About /> },
      { path: "/skills", element: <Skills /> },
      { path: "/projects", element: <Projects /> },
      { path: "/experience", element: <Experience /> },
      { path: "/drone", element: <DroneGallery/> },
      { path: "/contact", element: <Contact /> },
      {path: "/projects/real-estate",element: <RealEstateVideos />},
      {path: "/projects/commercial",element: <CommercialVideos />},
      {path: "/projects/industrial",element: <IndustrialVideos />},
      {path: '/projects/medical',element: <MedicalVideos />},
      {path: '/projects/corporate',element: <CorporateVideos />},
      {path: '/projects/motion',element: <MotionGraphics />}

    ],
  },
]);
