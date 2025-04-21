"use client";
import { ColumnDef } from "@tanstack/react-table";

//COMPONENTS
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

//LIBRARY

import { FormatDate } from "@/lib/functions";

//ICONS
import { BookMarked, Tag } from "lucide-react";
import { useState } from "react";
import GeneralAlert from "../../popup/GeneralAlert";
import { IUsersDataTable } from "@/lib/types/User";
import { UsersActionOption } from "@/components/options/UsersActionOption";

export const columns: ColumnDef<IUsersDataTable>[] = [
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
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      const getDate = new Date(row.original.premiumAt as string);
      return (
        <div className="flex flex-col justify-start">
          <div>{row.getValue("email")}</div>
          <div className={`text-xs text-gray-400`}>
            {row.original.isPremium ? (
              <span>
                active since {FormatDate({ children: getDate.toISOString() })}
              </span>
            ) : (
              <span className="text-gray-400">user not premium yet </span>
            )}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "isPremium",
    header: "Status",
    cell: ({ row }) => {
      return (
        <>
          <Badge
            variant={row.getValue("isPremium") ? "default" : "destructive"}
            className={`border-black ${
              row.getValue("isPremium") ? "bg-[#99B2FF]" : "bg-[#7A7A7A]"
            } text-black px-3 rounded-l-full rounded-r-full`}
          >
            {row.getValue("isPremium") ? "active" : "inactive"}
          </Badge>
        </>
      );
    },
  },
  {
    accessorKey: "premiumPackage",
    header: "Package",
    cell: ({ row }) => {
      return (
        <>
          <Badge
            variant={row.getValue("isPremium") ? "default" : "destructive"}
            className={`border-black ${
              row.getValue("premiumPackage") === "FREEPLAN"
                ? "bg-[#D1D5DB]"
                : row.getValue("premiumPackage") === "SILVER"
                ? "bg-[#C0C0C0]"
                : row.getValue("premiumPackage") === "PLATINUM"
                ? "bg-[#E5E4E2]"
                : "bg-[#FFD700]"
            } text-black px-3 rounded-l-full rounded-r-full`}
          >
            {row.getValue("premiumPackage") === "FREEPLAN"
              ? "free plan"
              : row.getValue("premiumPackage") === "SILVER"
              ? "silver plan"
              : row.getValue("premiumPackage") === "PLATINUM"
              ? "platinum plan"
              : "gold plan"}
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
      const data = row.original;
      return <UsersActionOption data={data} />;
    },
  },
];
