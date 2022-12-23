import { ReactNode } from "react";
import Navbar from "./Navbar/Navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="px-4 mt-32">
        <h1 className="text-3xl text-center mt-4 font-bold uppercase">
          Bulk import system
        </h1>
        <p className="text-center text-gray-500 mb-5">
          Add and update yout campaigns by uploading CSV files
        </p>
        {children}
      </div>
    </>
  );
}
