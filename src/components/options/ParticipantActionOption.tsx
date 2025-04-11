"use client";

import { MoreHorizontal, QrCode, SquarePen, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IParticipantDataTable } from "@/lib/types/Participants";
import GeneralAlert from "../popup/GeneralAlert";
import { useState } from "react";
import { toast } from "sonner";
import { deleteParticipant } from "@/actions/deleteParticipant";
import { useRouter } from "next/navigation";
import { UpdateParticipantSheet } from "../sheet/form/UpdateParticipantSheet";

type ParticantActionOptionProps = {
  data: IParticipantDataTable;
  eventUid: string;
  token: string;
};
export const ParticipantActionOption = ({
  data,
  eventUid,
  token,
}: ParticantActionOptionProps) => {
  const router = useRouter();
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const [openUpdateSheet, setOpenUpdateSheet] = useState<boolean>(false);
  const handleDownload = () => {
    console.log("Download QR Code : ", data.pathQr);
  };
  const handleUpdate = () => {
    console.log("Update participant : ", data.uid);
  };
  const handleDelete = () => {
    try {
      toast.promise(deleteParticipant(eventUid, data.uid, token), {
        loading: "Deleting participant...",
        success: (data) => {
          if (data.success) {
            router.push("/events/" + eventUid);
            return "Participant deleted successfully";
          }
          throw new Error(data.message);
        },
        error: (error) => {
          return error.message as string;
        },
        finally: () => {
          setOpenDeleteAlert(false);
        },
      });
    } catch (error) {
      console.error("Error deleting participant:", error);
    }
  };
  return (
    <>
      <div className="w-full lg:flex flex-1 justify-end items-end space-x-2 hidden">
        <Button
          className="bordered bg-redd hover:bg-redd/90 text-black"
          onClick={() => setOpenDeleteAlert(true)}
        >
          delete <Trash2 />
        </Button>
        <Button
          className="bordered bg-[#99B2FF] hover:bg-[#99B2FF]/90 text-black"
          onClick={() => setOpenUpdateSheet(true)}
        >
          update <SquarePen />
        </Button>
        <Button
          className="bordered bg-yelloww hover:bg-yelloww/90 text-black"
          onClick={() => handleDownload()}
        >
          download <QrCode />
        </Button>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="lg:hidden flex">
          <Button
            className="bordered bg-purplee hover:bg-purplee/90 hover:border-b-1 border-b-4 text-black"
            variant={"outline"}
          >
            <MoreHorizontal size={16} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bordered border-b-4 hover:border-b-1"
        >
          <DropdownMenuLabel>Event Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => handleDownload()}>
            <QrCode />
            download
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenUpdateSheet(true)}>
            <SquarePen />
            update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenDeleteAlert(true)}>
            <Trash2 /> delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <GeneralAlert
        open={openDeleteAlert}
        setOpen={setOpenDeleteAlert}
        message="This action will permanently remove the participant data from storage. This cannot be undone."
        title="Are you sure you want to delete this participant?"
        onSuccess={handleDelete}
      />
      <UpdateParticipantSheet
        open={openUpdateSheet}
        setOpen={setOpenUpdateSheet}
        data={data}
      />
    </>
  );
};
