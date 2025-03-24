import type { Metadata } from "next";
import "../../globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Profile",
  description: "Certified Certification Dashboard",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-40 min-h-screen">
      <header>
        <Navbar clickable />
      </header>
      <main>{children}</main>
    </div>
  );
}
