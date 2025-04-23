"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { AddAccountSheet } from "../sheet/form/AddAccountSheet";

export const AddAccountButton = () => {
  const [openAddAccountSheet, setOpenAddAccountSheet] =
    useState<boolean>(false);
  return (
    <>
      <Button
        className="bordered bg-[#59FFAC] hover:bg-[#59FFAC]/90 text-black"
        onClick={() => setOpenAddAccountSheet(true)}
      >
        <span className="hidden md:block">add account</span> <Plus />
      </Button>
      <AddAccountSheet
        open={openAddAccountSheet}
        setOpen={setOpenAddAccountSheet}
      />
    </>
  );
};
