"use client";
import { ColumnDef } from "@tanstack/react-table";

//COMPONENTS
import { Button } from "@/components/ui/button";

//LIBRARY
import { IEventParticipantsTable } from "@/lib/types/Event";

//ICONS
import { BookMarked, Tag } from "lucide-react";
import { useState } from "react";
import GeneralAlert from "@/components/popup/GeneralAlert";

const [isOpen, setIsOpen] = useState(false);
const EventParticipantColumn: ColumnDef<IEventParticipantsTable>[] = [
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
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "qrcode",
    header: () => {
      return <div className="text-center text-xs md:text-sm">QR Code</div>;
    },
    cell: ({ row }) => (
      <div className="text-center text-xs md:text-sm">
        {row.getValue("qrcode")}
      </div>
    ),
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

export default EventParticipantColumn;
