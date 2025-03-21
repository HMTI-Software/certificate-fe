import type { Metadata } from "next";
import "../../globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Admin",
  description: "Certified Certification Super Admin Page",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-40 min-h-screen">
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
}
