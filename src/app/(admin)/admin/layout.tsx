import type { Metadata } from "next";
import "../../globals.css";
import Navbar from "@/components/Navbar";
import { auth } from "@/auth";
import { ParticipantsProvider } from "@/context/ParticipantsContext";

export const metadata: Metadata = {
  title: "Admin",
  description: "Certify Admin Dashboard",
};

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="w-full min-h-screen">
      <header>
        <Navbar clickable session={session!} />
      </header>
      <div className="px-4 md:px-20 lg:px-40">
        <main>
          <ParticipantsProvider>{children}</ParticipantsProvider>
        </main>
      </div>
    </div>
  );
}
