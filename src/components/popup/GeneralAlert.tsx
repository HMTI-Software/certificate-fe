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
        <AlertDialogFooter className="flex flex-row justify-end">
          <AlertDialogCancel
            className="bordered bg-red-400 hover:bg-red-400/90 border-b-4 hover:border-b-1 text-black hover:cursor-pointer"
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
          >
            cancel
          </AlertDialogCancel>
          <AlertDialogAction
            className="bordered bg-[#59FFAC] hover:bg-[#59FFAC]/90 text-black hover:cursor-pointer"
            onClick={() => {
              onSuccess?.();
              setOpen(false);
            }}
          >
            continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default GeneralAlert;
