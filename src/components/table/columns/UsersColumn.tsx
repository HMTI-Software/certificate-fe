"use client";
import { ColumnDef } from "@tanstack/react-table";

//COMPONENTS
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

//LIBRARY
import { IEventParticipants } from "@/lib/types/Event";

import { FormatDate } from "@/lib/functions";

//ICONS
import { BookMarked, Tag } from "lucide-react";
import { useState } from "react";
import GeneralAlert from "../../popup/GeneralAlert";
import { IPremiumUsers } from "@/lib/Interface";

export const columns: ColumnDef<IPremiumUsers>[] = [
  {
    accessorKey: "id",
    enableHiding: false,
    header: () => {
      return <div className="text-center text-xs md:text-sm">No</div>;
    },
    cell: ({ row }) => (
      <div className="text-center text-xs md:text-sm">{row.getValue("id")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const getDate = new Date(row.original.premiumAt);
      return (
        <div className="flex flex-col justify-start">
          <div>{row.getValue("name")}</div>
          <div className="text-xs text-gray-400">
            Active Since {FormatDate({ children: getDate.toISOString() })}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return (
        <>
          <Badge
            variant={
              row.getValue("status") === "active" ? "default" : "destructive"
            }
            className={`border-black ${
              row.getValue("status") === "active"
                ? "bg-[#99B2FF]"
                : "bg-[#7A7A7A]"
            } text-black px-3 rounded-l-full rounded-r-full`}
          >
            {row.getValue("status")}
          </Badge>
        </>
      );
    },
  },
  {
    id: "actions",
    header: () => {
      return <div className="text-center text-xs md:text-sm">Actions</div>;
    },
    cell: ({ row }) => {
      const [isOpen, setIsOpen] = useState(false);
      const status = row.getValue("status");
      if (status === "active") {
        return (
          <>
            <div className="flex flex-row justify-center items-center space-x-2">
              <Button
                className="bordered bg-[#9B9B9B] hover:bg-[#9B9B9B]/90 text-black"
                onClick={() => setIsOpen(true)}
              >
                deactivate <Tag />
              </Button>
              <Button className="bordered bg-[#99B2FF] hover:bg-[#99B2FF]/90 text-black">
                show <BookMarked />
              </Button>
            </div>
            <GeneralAlert
              open={isOpen}
              setOpen={setIsOpen}
              title={"Deactivate Premium Feature"}
              message={
                "Are you sure you want to deactive the premium feature for this user?"
              }
            />
          </>
        );
      }
      return (
        <>
          <div className="flex flex-row justify-center items-center space-x-2">
            <Button
              className="bordered bg-[#59FFAC] hover:bg-[#59FFAC]/90 text-black"
              onClick={() => setIsOpen(true)}
            >
              activate <Tag />
            </Button>
            <Button className="bordered bg-[#99B2FF] hover:bg-[#99B2FF]/90 text-black">
              show <BookMarked />
            </Button>
          </div>
          <GeneralAlert
            open={isOpen}
            setOpen={setIsOpen}
            title={"Activate Premium Feature"}
            message={
              "Are you sure you want to activate the premium feature for this user?"
            }
          />
        </>
      );
    },
  },
];
