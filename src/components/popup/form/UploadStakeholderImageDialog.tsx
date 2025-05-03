import { Form } from "@/components/ui/form";
import GeneralDialog from "../GeneralDialog";
import { FileUploadField } from "@/components/forms/fields/CustomFileUpload";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { uploadStakeholderImageSchema } from "@/lib/types/General";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import ImageCropper from "@/components/image/ImageCropper";
import Image from "next/image";
import { Crop } from "lucide-react";

type Props = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
};
export const UploadStakeholderImageDialog = ({
  openDialog,
  setOpenDialog,
}: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  const uploadStakeholderImageForm = useForm<
    z.infer<typeof uploadStakeholderImageSchema>
  >({
    resolver: zodResolver(uploadStakeholderImageSchema),
    defaultValues: {
      file: null,
    },
  });
  const uploadStakeholderImage = async (
    values: z.infer<typeof uploadStakeholderImageSchema>,
  ) => {
    console.log("values : ", values.file[0]);
  };
  const cropStakeholderImage = async (
    values: z.infer<typeof uploadStakeholderImageSchema>,
  ) => {
    console.log("cropped values : ", values.file[0]);
  };
  return (
    <GeneralDialog
      title="Upload Image"
      message="Upload a new image for the stakeholder."
      open={openDialog}
      setOpen={setOpenDialog}
      successText="upload"
      onSuccess={() => {
        uploadStakeholderImageForm.handleSubmit(uploadStakeholderImage)();
      }}
      onCancel={() => {
        uploadStakeholderImageForm.reset();
      }}
    >
      <Form {...uploadStakeholderImageForm}>
        <form className="flex flex-row items-center justify-center gap-2">
          <FileUploadField
            form={uploadStakeholderImageForm}
            name="file"
            label="Upload Image"
            placeholder="Upload Image"
            type="file"
            description="Upload an image for the stakeholder."
            accept="image/*"
          />
          <Button
            type="button"
            variant={"outline"}
            size={"lg"}
            className="bordered bg-purplee hover:bg-purplee/90 border-b-4 hover:border-b-1 text-black flex-1 mt-[6px]"
            onClick={() => {
              uploadStakeholderImageForm.handleSubmit(cropStakeholderImage)();
            }}
          >
            <Crop />
          </Button>
        </form>
      </Form>
      {selectedImage && !croppedImage && (
        <ImageCropper
          imageSrc={selectedImage!}
          onCropDone={(blob: Blob, previewUrl: string) => {
            setCroppedImage(previewUrl);
            setSelectedImage(null);
            uploadStakeholderImageForm.setValue(
              "file",
              new File([blob], previewUrl, {
                type: blob.type,
              }),
            );
          }}
        />
      )}
      {croppedImage && (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2 text-sm font-medium">Cropped Image Preview: </p>
          <Image
            src={croppedImage}
            alt="Cropped Avatar"
            className="w-32 h-32 rounded-full object-cover"
            width={100}
            height={100}
          />
        </div>
      )}
    </GeneralDialog>
  );
};
