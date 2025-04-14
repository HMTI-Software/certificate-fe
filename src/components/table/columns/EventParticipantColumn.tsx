"use client";

import { ColumnDef } from "@tanstack/react-table";

//ICONS
import { IParticipantDataTable } from "@/lib/types/Participants";
import { QRCodeImage } from "@/components/image/QRCodeImage";
import { ParticipantActionOption } from "@/components/options/ParticipantActionOption";

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
    cell: ({ row }) => {
      const data = row.original;
      const { certificateNumber } = data;
      return (
        <div className="text-center text-xs md:text-sm flex flex-col items-start">
          <h1>{row.getValue("name")}</h1>
          <p className="text-[10px] md:text-xs">{certificateNumber}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "pathQr",
    header: () => {
      return <div className="text-center text-xs md:text-sm">QR Code</div>;
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <QRCodeImage qrCodeSource={row.getValue("pathQr")} alt={data.name} />
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
      return (
        <ParticipantActionOption
          data={data}
          eventUid={data.eventUid}
          token={data.token}
        />
      );
    },
  },
];

export default EventParticipantColumn;
