"use client";

import React, { useState, useEffect } from "react";
import parse from "html-react-parser";
import { ChevronUp, Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  IDocumentationSection,
  IDocumentationSidebar,
} from "@/lib/types/Documentation";
import Image from "next/image";

const DocsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [sideBar, setSideBar] = useState<IDocumentationSidebar[]>([]);
  const [documentationData, setDocumentationData] = useState<
    IDocumentationSection[]
  >([]);

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
  useEffect(() => {
    fetch("/static/Docs.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((json: IDocumentationSection[]) => {
        const sideBar: IDocumentationSidebar[] = json.flatMap((item) => {
          const result: IDocumentationSidebar[] = [
            {
              id: item.id,
              name: item.title,
              type: "heading",
            },
          ];

          const subheadings: IDocumentationSidebar[] = item
            .content!.filter((contentItem) => contentItem.type === "sub")
            .map((subItem) => ({
              id: subItem.id || "",
              name: subItem.title || "Untitled",
              type: "subheading",
            }));

          return [...result, ...subheadings];
        });

        setDocumentationData(json);
        setSideBar(sideBar);
      })
      .catch((err) => console.error("Error loading documentation data:", err));
  }, []);

  if (!documentationData) return null;
  return (
    <div className="min-h-screen bg-white pb-20">
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

      {/* "Back to top" button */}
      <Link
        href="#"
        className="rounded-full bg-yelloww p-3 right-6 bottom-6 fixed shadow-lg border border-black hover:bg-yellow-200 transition-all duration-300"
        aria-label="Back to top"
      >
        <ChevronUp size={24} />
      </Link>

      <div className="flex mt-16 items-stretch">
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
                    aria-current={
                      activeSection === link.id ? "page" : undefined
                    }
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

        {/* Main content */}
        <main className="flex-1 lg:pl-10  pl-2">
          {documentationData.map((item, index) => (
            <article
              key={index}
              id={item.id}
              data-section={item.id}
              className="mb-15"
            >
              <header>
                <div className="flex items-center gap-2 group">
                  <h1 className="font-bold text-3xl text-gray-900">
                    {item.title}
                  </h1>
                </div>
                <p className="my-3 text-lg text-gray-600 max-w-3xl">
                  {item.description}
                </p>
              </header>

              <div className="flex flex-col">
                {item.content &&
                  item.content.map((content, contentIdx) => {
                    return (
                      <div
                        key={contentIdx}
                        id={content.type === "sub" ? content.id : undefined}
                        data-section={
                          content.type === "sub" ? content.id : undefined
                        }
                        className={cn(
                          "flex flex-col gap-3",
                          content.type === "sub" ? "pl-9" : "",
                        )}
                      >
                        {content.type === "sub" && (
                          <hr className="border-b my-8 border-gray-200 w-full" />
                        )}
                        {content.title && (
                          <h2 className="font-bold text-xl text-gray-900">
                            {content.title}
                          </h2>
                        )}
                        <div
                          className={cn(
                            content.description ? "mt-0" : "mt-5",
                            "text-justify",
                          )}
                        >
                          {parse(content.description || "", {
                            replace: (domNode) => {
                              if (domNode.type === "tag") {
                                const { attribs } = domNode;

                                // Cek jika memiliki ID atau class tertentu
                                const targetId =
                                  attribs?.id === "inject-class-target";
                                const targetClass =
                                  attribs?.class?.includes("target-class");

                                if (targetId || targetClass) {
                                  // Tambahkan class Tailwind ke elemen yang cocok
                                  const existingClass = attribs.class || "";
                                  attribs.class = `${existingClass}`.trim();
                                }
                              }
                            },
                          })}
                        </div>
                        {content?.image && (
                          <Image
                            src={content.image.url}
                            alt={content.image.alt}
                            width={500}
                            height={500}
                            className={cn(
                              content.image.bordered
                                ? "bordered-nonhover rounded-md"
                                : "",
                              content.image.className,
                            )}
                          />
                        )}
                        {content?.list &&
                          content.list.map((list, listIdx) => {
                            return (
                              <div className="flex gap-3" key={listIdx}>
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                                  {listIdx + 1}
                                </div>
                                <div className="flex flex-col">
                                  <p className="text-gray-800">
                                    {list.description}
                                  </p>
                                  {list.span &&
                                    list.span.map((span, spanIdx) => {
                                      return (
                                        <div
                                          className="mt-4 mb-2"
                                          key={spanIdx}
                                        >
                                          <span
                                            className={`bordered border-b-4 hover:border-b-1 border-black bg-${span.color} p-4 block rounded-md border  shadow-sm hover:shadow-md`}
                                          >
                                            {span.description}
                                          </span>
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    );
                  })}
              </div>
              <hr className="border-b mt-16 border-gray-200 w-full" />
            </article>
          ))}
        </main>
      </div>
    </div>
  );
};

export default DocsPage;
