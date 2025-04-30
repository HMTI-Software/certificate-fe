import "../../globals.css";
import { auth } from "@/auth";
import LandingPageNavbar from "@/components/LandingPageNavbar";
import Footer from "@/components/Footer";

export default async function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="w-full min-h-screen">
      <header>
        <LandingPageNavbar session={session!} />
      </header>
      <div className="px-4 md:px-20 lg:px-40">
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
