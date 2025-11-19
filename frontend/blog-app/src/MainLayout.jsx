import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto px-4 pt-16">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
