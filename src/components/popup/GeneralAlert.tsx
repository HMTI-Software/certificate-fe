"use client";
import * as React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface GeneralAlertProps {
  title: string;
  message: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const GeneralAlert = ({
  open,
  setOpen,
  title,
  message,
  onCancel,
  onSuccess,
}: GeneralAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="bordered-nonhover">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            className="bordered bg-red-400 hover:bg-red-400/90 text-black"
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bordered bg-[#59FFAC] hover:bg-[#59FFAC]/90 text-black"
            onClick={() => {
              onSuccess?.();
              setOpen(false);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GeneralAlert;
