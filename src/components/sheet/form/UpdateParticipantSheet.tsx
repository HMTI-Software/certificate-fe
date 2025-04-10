"use client";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { GeneralSheet } from "../GeneralSheet";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateParticipantSchema } from "@/lib/types/General";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/forms/fields/CustomInputField";
import { toast } from "sonner";
import { updateParticipant } from "@/actions/updateParticipant";
import { useRouter } from "next/navigation";
import { IParticipantDataTable } from "@/lib/types/Participants";

type UpdateParticipantSheetProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  data: IParticipantDataTable;
};
export const UpdateParticipantSheet = ({
  open,
  setOpen,
  data,
}: UpdateParticipantSheetProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof updateParticipantSchema>>({
    resolver: zodResolver(updateParticipantSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      position: data.position,
    },
  });

  const submitHandler = async (
    values: z.infer<typeof updateParticipantSchema>,
  ) => {
    try {
      toast.promise(
        updateParticipant(values, data.token, data.eventUid, data.uid),
        {
          loading: "Updating participant...",
          success: (status) => {
            if (status.success) {
              router.push("/events/" + data.eventUid);
              return "Participant updated successfully!";
            }
            throw new Error(status.message as string);
          },
          error: (error) => {
            return error as string;
          },
          finally: () => {
            setOpen(false);
          },
          duration: 3000,
        },
      );
    } catch (error) {
      setOpen(false);
      console.error("Error updating participant: ", error);
      toast.error("Failed to update participant. ", {
        duration: 3000,
      });
    }
  };

  return (
    <GeneralSheet
      title="Update Participant"
      description="Make changes to your participant data here. Click save when you're done."
      open={open}
      setOpen={setOpen}
    >
      <div className="grid grid-cols-1 gap-2 px-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(submitHandler)}
            className="w-full flex flex-col gap-4 "
          >
            <InputFormField
              form={form}
              name="name"
              label="Name"
              placeholder="Mr. John Doe"
              description="Enter the name of the participant"
            />
            <InputFormField
              form={form}
              name="email"
              label="Email"
              placeholder="user@gmail.com"
              description="Enter the email of the participant"
            />
            <InputFormField
              form={form}
              name="position"
              label="Position"
              placeholder="Manager"
              description="Enter the position of the participant"
            />
            <Button
              type="submit"
              className="bordered bg-greenn hover:bg-greenn/90 text-black"
              size={"lg"}
              onClick={() => form.handleSubmit(submitHandler)}
            >
              save changes
            </Button>
          </form>
        </Form>
      </div>
    </GeneralSheet>
  );
};
