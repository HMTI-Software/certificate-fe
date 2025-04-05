import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Certified Certification Dashboard",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-h-screen">
      <header>
        <Navbar clickable />
      </header>
      <div className="px-4 md:px-20 lg:px-40">
        <main>{children}</main>
      </div>
    </div>
  );
}
