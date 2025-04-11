import { GeneralSheet } from "../GeneralSheet";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
};
export const AddParticantByExcelSheet = ({ open, setOpen }: Props) => {
  return (
    <GeneralSheet
      open={open}
      setOpen={setOpen}
      title="Add Participant By Excel"
      description="eoeokeokoekoe"
    >
      oefkoekfeof
    </GeneralSheet>
  );
};
