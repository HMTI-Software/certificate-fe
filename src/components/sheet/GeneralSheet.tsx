import { Button } from "../ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
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
};
export const GeneralSheet = ({
  title,
  description,
  open,
  setOpen,
  children,
}: GeneralSheetProps) => {
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side={"right"}
        className="w-full md:border-l-4 md:border-black"
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

{
  /* <Sheet open={openUpdateSheet} onOpenChange={setOpenUpdateSheet}>
  <SheetContent>
    <SheetHeader>
      <SheetTitle>Edit profile</SheetTitle>
      <SheetDescription>
        Make changes to your profile here. Click save when you're done.
      </SheetDescription>
    </SheetHeader>
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Name
        </Label>
        <Input id="name" value="Pedro Duarte" className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="username" className="text-right">
          Username
        </Label>
        <Input id="username" value="@peduarte" className="col-span-3" />
      </div>
    </div>
    <SheetFooter>
      <SheetClose asChild>
        <Button type="submit">Save changes</Button>
      </SheetClose>
    </SheetFooter>
  </SheetContent>
</Sheet>; */
}
