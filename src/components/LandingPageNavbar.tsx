"use client";
import { useState } from "react";
import { ArrowUpRight, BadgeCheck, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { INavMenu } from "./Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LandingPageNavbar = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const NavMenu: INavMenu[] = [
    { id: 1, title: "about", link: "/#about" },
    { id: 2, title: "price", link: "/#price" },
    { id: 3, title: "contact", link: "/#contact" },
    { id: 4, title: "docs", link: "/docs" },
  ];

  return (
    <nav className="w-full py-4 bg-white  ">
      <div className="px-6 md:px-20 lg:px-40">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex flex-row justify-start items-center gap-2">
            <BadgeCheck className="mt-[2px]" />
            <h1 className="font-bold text-lg">CertifiedCertification</h1>
          </div>
          {/* Desktop Menu */}
          <div className="hidden md:flex flex-row justify-end items-center gap-10">
            {NavMenu.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="text-sm group relative w-max"
              >
                <span className="inline-flex items-center gap-1">
                  {item.title}
                  {item.title === "docs" && <ArrowUpRight className="w-4" />}
                </span>
                <span className="absolute -bottom-2 left-0 w-0 transition-all h-[2px] bg-black group-hover:w-full"></span>
              </Link>
            ))}
            <Button
              className="bordered bg-[#99B2FF] hover:bg-[#99B2FF]/90 text-black flex items-center gap-2"
              onClick={() => router.push("/auth/sign-in")}
            >
              login <LogIn />
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden flex flex-col space-y-1.5 p-2 "
            onClick={() => setIsOpen(!isOpen)}
          >
            <div
              className={`w-6 h-0.5 bg-black transition-all ${
                isOpen ? "rotate-45 translate-y-2 " : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`w-6 h-0.5 bg-black transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`transition-all duration-300 ${
          isOpen ? "h-auto opacity-100 py-3" : "h-0 opacity-0 overflow-hidden"
        } md:hidden mt-4 space-y-4 bg-white p-4 rounded-lg shadow-lg `}
      >
        {NavMenu.map((item) => (
          <Link
            key={item.id}
            href={item.link}
            className="block text-sm text-black px-2 py-1 hover:bg-gray-200 rounded-md transition-all"
          >
            {item.title}
            {item.title === "docs" && (
              <ArrowUpRight className="inline-flex w-4" />
            )}
          </Link>
        ))}
        <Button
          className="bordered w-full bg-[#99B2FF] hover:bg-[#99B2FF]/90 text-black flex items-center gap-2"
          onClick={() => router.push("/auth/sign-in")}
        >
          login <LogIn />
        </Button>
      </div>
    </nav>
  );
};

export default LandingPageNavbar;
