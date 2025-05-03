"use client";
import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

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
  autoClose?: boolean;
  additionalButton?: boolean;
  additionalButtonText?: string;
  additionalButtonOnClick?: () => void;
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
  autoClose = true,
  additionalButton = false,
  additionalButtonText,
  additionalButtonOnClick = () => {},
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
        <DialogFooter className={cn("flex flex-row justify-end")}>
          <Button
            className="bordered bg-red-400 hover:bg-red-400/90 border-b-4 hover:border-b-1 text-black"
            onClick={() => {
              onCancel?.();
              if (autoClose) {
                setOpen(false);
              }
            }}
          >
            {cancelText}
          </Button>
          <Button
            className="bordered bg-[#59FFAC] hover:bg-[#59FFAC]/90 text-black"
            onClick={() => {
              onSuccess?.();
              if (autoClose) {
                setOpen(false);
              }
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
