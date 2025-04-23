import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

type GeneralSheetProps = {
  title: string;
  description: string;
  open: boolean;
  setOpen: (value: boolean) => void;
  children?: React.ReactNode;
  sheetClose?: boolean;
  side?: "left" | "right";
};
export const GeneralSheet = ({
  title,
  description,
  open,
  setOpen,
  children,
  side = "right",
}: GeneralSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={side}
        className="w-full md:border-x-4 md:border-black"
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          <SheetDescription>{description}</SheetDescription>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
};
