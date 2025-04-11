"use client";
import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

type GeneralDialogProps = {
  title: string;
  message: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSuccess?: () => void;
  onCancel?: () => void;
  successText?: string;
  cancelText?: string;
  children?: React.ReactNode;
};

const GeneralDialog = ({
  open,
  setOpen,
  title,
  message,
  onCancel,
  onSuccess,
  children,
  successText = "continue",
  cancelText = "cancel",
}: GeneralDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="bordered-nonhover">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription className="text-xs md:text-sm">
            {message}
          </DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter>
          <Button
            className="bordered bg-red-400 hover:bg-red-400/90 border-b-4 hover:border-b-1 text-black"
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
          >
            {cancelText}
          </Button>
          <Button
            className="bordered bg-[#59FFAC] hover:bg-[#59FFAC]/90 text-black"
            onClick={() => {
              onSuccess?.();
              setOpen(false);
            }}
          >
            {successText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GeneralDialog;
