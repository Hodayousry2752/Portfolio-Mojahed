import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import PageTransition from "./PageTransition";
import { useLenis } from "../../hooks/useLenis";
import Footer from "./Footer";


export default function Layout() {
useLenis();


return (
<div className="bg-background text-foreground">
<Navbar />
<PageTransition>
<Outlet />
</PageTransition>
<Footer/>
</div>
);
}