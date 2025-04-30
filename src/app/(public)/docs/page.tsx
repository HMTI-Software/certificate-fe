import fs from "fs";
import { ChevronUp } from "lucide-react";
import Link from "next/link";
import path from "path";

interface IContent {
  page: string;
  url: string;
  id: string;
  desc: string;
  content: Array<{
    content: string;
    span?: {
      content: string;
      color: string;
    };
    section?: Array<{
      title: string;
      id: string;
      content: Array<{
        content: string;
        span?: {
          content: string;
          color: string;
        };
      }>;
    }>;
  }>;
}

const page = () => {
  const sideBarLink = [
    {
      name: "Create Event",
      url: "/docs/#create-event",
    },
    {
      name: "Manage Participant",
      url: "/docs/#manage-participant",
    },
    {
      name: "Add Participant Manually",
      type: "sub",
      url: "/docs/#manage-participant-add-manually",
    },
    {
      name: "Add Participant by Excel File",
      type: "sub",
      url: "/docs/#manage-participant-add-by-excel-file",
    },
    {
      name: "Download QR Code",
      url: "/docs/#qr-code",
    },
    {
      name: "Manage Event",
      url: "/docs/#manage-event",
    },
    {
      name: "Manage Event Steakholder",
      type: "sub",
      url: "/docs/#manage-event-steakholder",
    },
    {
      name: "Manage Event Preview",
      type: "sub",
      url: "/docs/#manage-event-preview",
    },
    {
      name: "Edit Event",
      type: "sub",
      url: "/docs/#manage-event-edit",
    },
  ];

  const filePath = path.join(process.cwd(), "public/static", "Docs.json");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const rawData: IContent[] = JSON.parse(fileContent);

  return (
    //

    <>
      <div className="mt-5 md:mt-10 flex items-stretch">
        <Link
          href="#create-event"
          className="rounded-full bg-yelloww p-4 right-5 bottom-5 md:right-20 md:bottom-20 fixed border border-black"
        >
          <ChevronUp />
        </Link>
        <div className="sidebar pr-10 md:flex flex-col gap-4 h-full border-r border-black hidden ">
          {sideBarLink.map((link, index) => (
            <Link
              className={
                (link.type === "sub" ? "pl-4 " : "") +
                " pr-5 pb-2 whitespace-nowrap group relative w-max"
              }
              href={link.url}
              key={index}
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 transition-all h-[2px] bg-black group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col px-2 md:px-10 gap-20 mb-96">
          {rawData.map((item, index) => (
            <div key={index} id={item.id}>
              <h1 className="font-bold text-2xl">{item.page}</h1>
              <p className="mt-2 mb-8">{item.desc}</p>
              <div className="flex flex-col gap-4 ">
                {item.content.map((doc, index) => (
                  <div className="flex gap-2" key={index}>
                    <p>{index + 1}. </p>
                    <div className="flex flex-col">
                      <p>{doc.content}</p>
                      {doc.span && (
                        <span
                          className={`bg-${doc.span.color} p-4 hover:scale-110 duration-300 rounded-md border border-black `}
                        >
                          {doc.span.content}
                        </span>
                      )}
                      {doc.section && (
                        <div className="flex flex-col gap-2 mt-4 ">
                          {doc.section.map((section, index) => (
                            <div
                              className="flex flex-col gap-2 text-gray-700 hover:text-black duration-500"
                              key={index}
                              id={section.id}
                            >
                              <hr className="border-b my-10 border-b-black w-full opacity-15" />
                              <h2 className="font-bold text-xl">
                                {section.title}
                              </h2>
                              {section.content.map((content, index) => (
                                <div className="flex gap-2" key={index}>
                                  <p>{index + 1}. </p>
                                  <div className="flex flex-col">
                                    <p>{content.content}</p>
                                    {content.span && (
                                      <span
                                        className={`bg-${content.span.color} p-4 hover:scale-110 duration-300 rounded-md border border-black`}
                                      >
                                        {content.span.content}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <hr className="border-b mt-16 border-b-black w-full opacity-15" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default page;
