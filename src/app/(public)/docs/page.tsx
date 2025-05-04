"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp, Menu, X, Copy, Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ISpan {
  content: string;
  color: string;
}

interface IContentItem {
  content: string;
  span?: ISpan;
}

interface ISection {
  title: string;
  id: string;
  content: IContentItem[];
}

interface IDocContent {
  content: string;
  span?: ISpan;
  section?: ISection[];
}

interface IContent {
  page: string;
  url: string;
  id: string;
  desc: string;
  content: IDocContent[];
}

interface ISidebarLink {
  name: string;
  url: string;
  id: string;
  type?: "main" | "sub";
}

const DocsPage = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [filteredSidebarLinks] = useState<ISidebarLink[]>([
    {
      name: "Create Event",
      url: "/docs/#create-event",
      id: "create-event",
      type: "main",
    },
    {
      name: "Manage Participant",
      url: "/docs/#manage-participant",
      id: "manage-participant",
      type: "main",
    },
    {
      name: "Add Participant Manually",
      type: "sub",
      url: "/docs/#manage-participant-add-manually",
      id: "manage-participant-add-manually",
    },
    {
      name: "Add Participant by Excel File",
      type: "sub",
      url: "/docs/#manage-participant-add-by-excel-file",
      id: "manage-participant-add-by-excel-file",
    },
    {
      name: "Download QR Code",
      url: "/docs/#qr-code",
      id: "qr-code",
      type: "main",
    },
    {
      name: "Manage Event",
      url: "/docs/#manage-event",
      id: "manage-event",
      type: "main",
    },
    {
      name: "Manage Event Steakholder",
      type: "sub",
      url: "/docs/#manage-event-steakholder",
      id: "manage-event-steakholder",
    },
    {
      name: "Manage Event Preview",
      type: "sub",
      url: "/docs/#manage-event-preview",
      id: "manage-event-preview",
    },
    {
      name: "Edit Event",
      type: "sub",
      url: "/docs/#manage-event-edit",
      id: "manage-event-edit",
    },
  ]);
  const [copied, setCopied] = useState<string | boolean>(false);
  const [rawData, setRawData] = useState<IContent[]>([]);

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

  const copyToClipboard = (id: string): void => {
    const url = `${window.location.origin}/docs/#${id}`;
    navigator.clipboard.writeText(url).catch((err) => {
      console.error("Failed to copy URL:", err);
    });
    setCopied(id);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

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
      .then((json) => setRawData(json))
      .catch((err) => console.error("Error loading documentation data:", err));
  }, []);

  if (!rawData) return null;

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
        <div className="hidden lg:flex flex-col w-64 pr-8 sticky top-24 self-start h-[calc(100vh-6rem)] overflow-y-auto pb-20 border-r border-gray-200">
          <nav aria-label="Documentation navigation">
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {filteredSidebarLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    className={`
                      ${link.type === "sub" ? "pl-7 text-sm" : "font-medium"} 
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
                    href={link.url}
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
                {filteredSidebarLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      className={`
                        ${link.type === "sub" ? "pl-4 text-sm" : "font-medium"} 
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
                      href={link.url}
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
          {rawData.map((item, index) => (
            <article
              key={index}
              id={item.id}
              data-section={item.id}
              className="mb-24"
            >
              <header className="mb-10">
                <div className="flex items-center gap-2 group">
                  <h1 className="font-bold text-3xl text-gray-900">
                    {item.page}
                  </h1>
                  <button
                    onClick={() => copyToClipboard(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Copy link to ${item.page}`}
                  >
                    {copied === item.id ? (
                      <Check size={18} className="text-green-500" />
                    ) : (
                      <Copy
                        size={18}
                        className="text-gray-500 hover:text-gray-700"
                      />
                    )}
                  </button>
                </div>
                <p className="mt-3 text-lg text-gray-600 max-w-3xl">
                  {item.desc}
                </p>
              </header>

              <div className="flex flex-col gap-6">
                {item.content.map((doc, idx) => (
                  <div className="flex gap-3" key={idx}>
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-medium">
                      {idx + 1}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-gray-800">{doc.content}</p>
                      {doc.span && (
                        <div className="mt-4 mb-2">
                          <span
                            className={`bordered border-b-4 hover:border-b-1 border-black bg-${doc.span.color} p-4 block rounded-md border  shadow-sm hover:shadow-md`}
                          >
                            {doc.span.content}
                          </span>
                        </div>
                      )}
                      {doc.section && (
                        <div className="flex flex-col gap-6 mt-8">
                          {doc.section.map((section, sectionIdx) => (
                            <section
                              className="flex flex-col gap-4 text-gray-700 hover:text-gray-900 duration-300"
                              key={sectionIdx}
                              id={section.id}
                              data-section={section.id}
                            >
                              <hr className="border-b my-6 border-gray-200 w-full" />
                              <div className="flex items-center gap-2 group">
                                <h2 className="font-bold text-2xl">
                                  {section.title}
                                </h2>
                                <button
                                  onClick={() => copyToClipboard(section.id)}
                                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                                  aria-label={`Copy link to ${section.title}`}
                                >
                                  {copied === section.id ? (
                                    <Check
                                      size={16}
                                      className="text-green-500"
                                    />
                                  ) : (
                                    <Copy
                                      size={16}
                                      className="text-gray-500 hover:text-gray-700"
                                    />
                                  )}
                                </button>
                              </div>
                              {section.content.map((content, contentIdx) => (
                                <div
                                  className="flex gap-3 mt-2"
                                  key={contentIdx}
                                >
                                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center font-medium">
                                    {contentIdx + 1}
                                  </div>
                                  <div className="flex flex-col">
                                    <p className="text-gray-700">
                                      {content.content}
                                    </p>
                                    {content.span && (
                                      <div className="mt-4 mb-2">
                                        <span
                                          className={`bordered border-b-4 hover:border-b-1 border-black bg-${content.span.color} p-4 block rounded-md shadow-sm hover:shadow-md`}
                                        >
                                          {content.span.content}
                                        </span>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </section>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
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
