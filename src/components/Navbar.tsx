import Link from "next/link";
import { Button } from "./ui/button";

export interface INavMenu {
  id: number;
  title: string;
  link: string;
}

const Navbar = ({ clickable }: { clickable?: boolean }) => {
  const role: string = "admin";
  const NavMenu: INavMenu[] = [
    {
      id: 1,
      title: "event",
      link: "/dashboard",
    },
    {
      id: 2,
      title: "profile",
      link: "/profile",
    },
    {
      id: 3,
      title: "subscription",
      link: "/subscription",
    },
    {
      id: 4,
      title: "admin",
      link: "/admin",
    },
  ];

  return (
    <div className="w-full py-4 bg-white">
      <div className="w-full inline-flex justify-between items-center">
        <div className="flex-1 inline-flex flex-col justify-start items-start">
          <div className="justify-start text-black text-lg font-bold font-['Plus_Jakarta_Sans']">
            Dashboard
          </div>
          <div className="w-64 justify-start text-grayy text-sm font-normal font-['Plus_Jakarta_Sans']">
            hi Alif, such a nice day to see you
          </div>
        </div>
        <div className="flex-1 self-stretch flex justify-center items-center gap-10">
          {NavMenu.map((item) => {
            if (!clickable)
              return (
                <span key={item.id} className="text-sm group relative w-max">
                  <span>{item.title === "admin" ? null : item.title}</span>
                  <span className="absolute -bottom-2 left-0 w-0 transition-all h-[2px] bg-black group-hover:w-full"></span>
                </span>
              );
            if (role !== "admin" && item.title === "admin") return null;
            return (
              <Link
                href={item.link}
                key={item.id}
                className="text-sm group relative w-max"
              >
                <span>{item.title}</span>
                <span className="absolute -bottom-2 left-0 w-0 transition-all h-[2px] bg-black group-hover:w-full"></span>
              </Link>
            );
          })}
        </div>
        <div className="flex-1 flex justify-end items-center gap-2.5">
          <Button className="bordered bg-redd hover:bg-redd/90">log out</Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
