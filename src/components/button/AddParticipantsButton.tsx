"use client";
import { Plus, Sheet } from "lucide-react";
import { Button } from "../ui/button";
import { AddParticipantSheet } from "../sheet/form/AddParticipantSheet";
import { useState } from "react";
import { AddParticantByExcelSheet } from "../sheet/form/AddParticipantByExcelSheet";

type Props = {
  eventUid: string;
};

export const AddParticipantsButton = ({ eventUid }: Props) => {
  const [openAddParticipantSheet, setOpenAddParticipantSheet] =
    useState<boolean>(false);
  const [openAddParticipantSheetExcel, setOpenAddParticipantSheetExcel] =
    useState<boolean>(false);
  return (
    <>
      <div className="inline-flex">
        <Button
          className="bordered rounded-r-none hover:bg-purplee/90 bg-purplee text-black hover:border-b-1"
          onClick={() => setOpenAddParticipantSheet(true)}
        >
          add participants
          <Plus />
        </Button>
        <Button
          className="bordered rounded-l-none hover:bg-purplee/90 bg-purplee text-black hover:border-b-1"
          onClick={() => setOpenAddParticipantSheetExcel(true)}
        >
          <Sheet />
        </Button>
      </div>
      <AddParticipantSheet
        open={openAddParticipantSheet}
        setOpen={setOpenAddParticipantSheet}
        eventUid={eventUid}
      />
      <AddParticantByExcelSheet
        eventUid={eventUid}
        open={openAddParticipantSheetExcel}
        setOpen={setOpenAddParticipantSheetExcel}
      />
    </>
  );
};
