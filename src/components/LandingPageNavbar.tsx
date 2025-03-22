import { ArrowUpRight, BadgeCheck, Link, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { INavMenu } from "./Navbar";

const LandingPageNavbar = () => {
  const NavMenu: INavMenu[] = [
    {
      id: 1,
      title: "about",
      link: "/#about",
    },
    {
      id: 2,
      title: "price",
      link: "/#price",
    },
    {
      id: 3,
      title: "contact",
      link: "/#contact",
    },
    {
      id: 4,
      title: "docs",
      link: "/docs",
    },
  ];

  return (
    <div className="w-full py-4 bg-white px-40">
      <div className="w-full inline-flex justify-between items-center">
        <div className="flex flex-row justify-start items-start gap-2">
          <BadgeCheck className="mt-[2px]" />
          <h1 className="font-bold text-lg">CertifiedCertification</h1>
        </div>
        <div className="flex flex-row justify-end items-center gap-10">
          {NavMenu.map((item) => {
            if (item.title == "docs")
              return (
                <a
                  key={item.id}
                  href={item.link}
                  className="text-sm group relative w-max"
                >
                  <span className="inline-flex">
                    {item.title} <ArrowUpRight className="w-4" />
                  </span>
                  <span className="absolute -bottom-2 left-0 w-0 transition-all h-[2px] bg-black group-hover:w-full"></span>
                </a>
              );
            return (
              <a
                key={item.id}
                href={item.link}
                className="text-sm group relative w-max"
              >
                <span>{item.title}</span>
                <span className="absolute -bottom-2 left-0 w-0 transition-all h-[2px] bg-black group-hover:w-full"></span>
              </a>
            );
          })}
          <Button className="bordered bg-[#99B2FF] hover:bg-[#99B2FF/90] text-black">
            login <LogIn />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageNavbar;
