import { FileUploadField } from "@/components/forms/fields/CustomFileUpload";
import { GeneralSheet } from "../GeneralSheet";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { uploadParticipantByExcelSchema } from "@/lib/types/General";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import { addParticipantsByExcel } from "@/actions/mutation/participants/addParticipantsExcel";

type Props = {
  open: boolean;
  setOpen: (value: boolean) => void;
  token: string;
  eventUid: string;
};
export const AddParticantByExcelSheet = ({
  open,
  setOpen,
  token,
  eventUid,
}: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof uploadParticipantByExcelSchema>>({
    resolver: zodResolver(uploadParticipantByExcelSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const uploadHandler = async (
    data: z.infer<typeof uploadParticipantByExcelSchema>,
  ) => {
    try {
      const file = data.file[0];
      if (!file) {
        toast.error("No file selected");
        return;
      }

      toast.promise(addParticipantsByExcel(file, token!, eventUid!), {
        loading: "Uploading file...",
        success: (data) => {
          if (data.success) {
            setOpen(false);
            form.reset();
            return data?.message || "File uploaded successfully!";
          }
          throw new Error(
            data?.message || "Failed to upload file. Please try again.",
          );
        },
        error: (error) => {
          console.error("Error uploading file:", error);
          return error?.message || "Failed to upload file. Please try again.";
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file. Please try again.");
    }
  };

  return (
    <GeneralSheet
      open={open}
      setOpen={setOpen}
      title="Add Participant By Excel"
      description="Upload an Excel file to add multiple participants at once. Please ensure your file follows the required format."
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(uploadHandler)}
          className="w-full flex flex-col gap-4 px-4"
        >
          <FileUploadField
            form={form}
            name="file"
            label="Upload Excel File"
            description="Please upload an Excel file (.xlsx) containing participant details."
            placeholder="Choose file..."
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bordered bg-greenn hover:bg-greenn/90 border-b-4 hover:border-b-1 text-black w-full"
          >
            submit file
          </Button>
        </form>
      </Form>
    </GeneralSheet>
  );
};
