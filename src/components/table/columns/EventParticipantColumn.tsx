"use client";
import { ColumnDef } from "@tanstack/react-table";

//COMPONENTS
import { Button } from "@/components/ui/button";

//LIBRARY

//ICONS
import { BookMarked, QrCode, SquarePen, Tag, Trash2 } from "lucide-react";
import { IParticipantDataTable } from "@/lib/types/Participants";
import Image from "next/image";

const EventParticipantColumn: ColumnDef<IParticipantDataTable>[] = [
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
    header: () => {
      return <div className="text-center text-xs md:text-sm">Name</div>;
    },
    cell: ({ row }) => (
      <div className="text-center text-xs md:text-sm">
        <h1>{row.getValue("name")}</h1>
        <p>{row.getValue("certificateNumber")}</p>
      </div>
    ),
  },
  {
    accessorKey: "pathQr",
    header: () => {
      return <div className="text-center text-xs md:text-sm">QR Code</div>;
    },
    cell: ({ row }) => {
      return (
        <Image
          src={
            `https://certificate-be-production.up.railway.app` +
            row.getValue("pathQr")
          }
          alt={`QR Code : ${row.getValue("name")}`}
          width={60}
          height={60}
          className="rounded-md mx-auto"
        />
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
      const { uid, name, certificateNumber } = data;
      return (
        <>
          <div className="w-full flex flex-1 justify-end items-end space-x-2">
            <Button className="bordered bg-redd hover:bg-redd/90 text-black">
              delete <Trash2 />
            </Button>
            <Button className="bordered bg-[#99B2FF] hover:bg-[#99B2FF]/90 text-black">
              update <SquarePen />
            </Button>
            <Button className="bordered bg-yelloww hover:bg-yelloww/90 text-black">
              download <QrCode />
            </Button>
          </div>
        </>
      );
    },
  },
];

export default EventParticipantColumn;
