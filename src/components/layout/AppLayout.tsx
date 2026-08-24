import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const AppLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className=" min-h-screen flex flex-col">
      <Navbar />
      <main className=" flex-1  pt-27">{children}</main>
      <Footer />
    </div>
  );
};

export default AppLayout;
