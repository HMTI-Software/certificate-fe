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
import { toast } from "sonner";
import { uploadStakeholderImage } from "@/actions/mutation/events/uploadStakeholderImage";

type Props = {
  openDialog: boolean;
  setOpenDialog: (open: boolean) => void;
  eventUid: string;
};
export const UploadStakeholderImageDialog = ({
  openDialog,
  setOpenDialog,
  eventUid,
}: Props) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [croppedImage, setCroppedImage] = useState<File | null>(null);

  const uploadStakeholderImageForm = useForm<
    z.infer<typeof uploadStakeholderImageSchema>
  >({
    resolver: zodResolver(uploadStakeholderImageSchema),
    defaultValues: {
      file: null,
    },
  });
  const handleDirectUpload = async (
    values: z.infer<typeof uploadStakeholderImageSchema>,
  ) => {
    const file = values.file[0];
    try {
      toast.promise(uploadStakeholderImage(file, eventUid), {
        loading: "Uploading stakeholder image...",
        success: (data) => {
          if (data.success) {
            setOpenDialog(false);
            uploadStakeholderImageForm.reset();
            return "Stakeholder image uploaded successfully!";
          }
          throw new Error(data.message);
        },
        error: (err) => {
          setOpenDialog(false);
          uploadStakeholderImageForm.reset();
          return err.message;
        },
        finally: () => {
          setSelectedImage(null);
          setCroppedImage(null);
          uploadStakeholderImageForm.reset();
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const handleCroppedUpload = async (
    values: z.infer<typeof uploadStakeholderImageSchema>,
  ) => {
    const file = values.file[0];
    try {
      toast.promise(uploadStakeholderImage(file, eventUid), {
        loading: "Uploading stakeholder image...",
        success: (data) => {
          if (data.success) {
            setOpenDialog(false);
            uploadStakeholderImageForm.reset();
            return "Stakeholder image uploaded successfully!";
          }
          throw new Error(data.message);
        },
        error: (err) => {
          setOpenDialog(false);
          uploadStakeholderImageForm.reset();
          return err.message;
        },
        finally: () => {
          setSelectedImage(null);
          setCroppedImage(null);
          uploadStakeholderImageForm.reset();
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };

  const cropStakeholderImage = async (
    values: z.infer<typeof uploadStakeholderImageSchema>,
  ) => {
    setSelectedImage(values.file[0]);
  };
  return (
    <GeneralDialog
      title="Upload Image"
      message="Upload a new image for the stakeholder."
      open={openDialog}
      setOpen={setOpenDialog}
      successText="upload"
      onSuccess={() => {
        if (croppedImage) {
          uploadStakeholderImageForm.handleSubmit(handleCroppedUpload)();
        } else {
          uploadStakeholderImageForm.handleSubmit(handleDirectUpload)();
        }
        setSelectedImage(null);
      }}
      onCancel={() => {
        uploadStakeholderImageForm.reset();
        setCroppedImage(null);
        setSelectedImage(null);
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
      {selectedImage && (
        <ImageCropper
          imageSrc={URL.createObjectURL(selectedImage)}
          onCropDone={(blob: Blob, previewUrl: string) => {
            const file = new File([blob], previewUrl, {
              type: blob.type,
            });
            setCroppedImage(file);

            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            uploadStakeholderImageForm.setValue("file", dataTransfer.files);

            setSelectedImage(null);
          }}
        />
      )}
      {croppedImage && (
        <div className="flex flex-col items-center justify-center">
          <p className="mb-2 text-sm font-medium">Cropped Image Preview: </p>
          <Image
            src={URL.createObjectURL(croppedImage)}
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
