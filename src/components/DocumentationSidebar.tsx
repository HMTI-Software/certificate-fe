"use client";

import { IDocumentationSidebar } from "@/lib/types/Documentation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  sideBar: IDocumentationSidebar[];
};
export const DocumentationSidebar = ({ sideBar }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  useEffect(() => {
    const handleScroll = (): void => {
      const sections = document.querySelectorAll<HTMLElement>("[data-section]");
      let currentActiveSection = "";

      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < 200) {
          currentActiveSection = section.id;
        }
      });

      setActiveSection(currentActiveSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <div>
      {/* Mobile menu button */}
      <div
        className={cn(
          "fixed  left-4 z-30 lg:hidden",
          isOpen ? "top-4" : "top-18",
        )}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-md bg-purplee shadow-md border border-gray-200"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* "Back to top" button
      {/* Sidebar - desktop */}
      <div
        className="hidden lg:flex flex-col w-64 pr-8 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-100
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-300 pb-20 border-r border-gray-200"
      >
        <nav aria-label="Documentation navigation">
          <ul className="flex flex-col gap-3 list-none m-0 p-0">
            {sideBar.map((link, index) => (
              <li key={index}>
                <Link
                  className={`
                            ${
                              link.type === "subheading"
                                ? "pl-7 text-sm"
                                : "font-medium"
                            } 
                            ${
                              activeSection === link.id
                                ? "text-black font-semibold "
                                : "text-gray-700"
                            } 
                            py-1.5 pr-5 block whitespace-nowrap relative group
                          `}
                  href={"/docs/#" + link.id}
                  aria-current={activeSection === link.id ? "page" : undefined}
                >
                  {link.name}
                  <span
                    className={cn(
                      "absolute -bottom-2 left-0 w-0 transition-all h-[2px] bg-black ",
                      activeSection === link.id
                        ? "w-full"
                        : "group-hover:w-full",
                    )}
                  ></span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Sidebar - mobile */}
      <div
        className={`
                  fixed z-20 top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden
                  ${isOpen ? "translate-x-0" : "-translate-x-full"}
                `}
        aria-hidden={!isOpen}
      >
        <div className="p-4 pt-20 h-full overflow-y-auto">
          <nav aria-label="Mobile documentation navigation">
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {sideBar.map((link, index) => (
                <li key={index}>
                  <Link
                    className={`
                              ${
                                link.type === "subheading"
                                  ? "pl-4 text-sm"
                                  : "font-medium"
                              } 
                              ${
                                activeSection === link.id
                                  ? "text-black font-semibold"
                                  : "text-gray-700"
                              } 
                              py-1.5 pr-5 block whitespace-nowrap relative group
                              ${
                                activeSection === link.id
                                  ? "border-l-blue-600"
                                  : "border-l-transparent hover:border-l-gray-300"
                              }
                            `}
                    href={"/docs/#" + link.id}
                    onClick={() => setIsOpen(false)}
                    aria-current={
                      activeSection === link.id ? "page" : undefined
                    }
                  >
                    {link.name}
                    <span
                      className={cn(
                        "absolute -bottom-2 left-0 w-0 transition-all h-[2px] bg-black group-hover:w-full",
                      )}
                    ></span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-white/70 bg-opacity-30 z-10 lg:hidden"
          onClick={() => setIsOpen(false)}
          role="presentation"
        />
      )}
    </div>
  );
};
