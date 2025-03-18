"use client";

import { ColumnDef } from "@tanstack/react-table";
import { BookMarked, MoreHorizontal, Tag } from "lucide-react";

import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "../ui/badge";
import { IPremiumUsers } from "@/lib/Interface";
import { useState } from "react";

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
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
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
      const status = row.getValue("status");
      if (status === "active") {
        return (
          <>
            <div className="flex flex-row justify-center items-center space-x-2">
              <Button className="bordered bg-[#99B2FF] hover:bg-[#99B2FF]/90 text-black">
                deactivate <Tag />
              </Button>
              <Button className="bordered bg-[#FF5959] hover:bg-[#FF5959]/90 text-black">
                show <BookMarked />
              </Button>
            </div>
          </>
        );
      }
      return (
        <>
          <div className="flex flex-row justify-center items-center space-x-2">
            <Button className="bordered bg-[#59FFAC] hover:bg-[#59FFAC]/90 text-black ">
              activate <Tag />
            </Button>
            <Button className="bordered bg-[#FF5959] hover:bg-[#FF5959]/90 text-black">
              show <BookMarked />
            </Button>
          </div>
        </>
      );
    },
  },
];
