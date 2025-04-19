import { useCallback, useEffect, useRef, useState } from "react";
import { GeneralSheet } from "../GeneralSheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { IEventData } from "@/lib/types/Event";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  updateStakeholderSchema,
  uploadStakeholderImageSchema,
} from "@/lib/types/General";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/forms/fields/CustomInputField";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { updateStakeholderData } from "@/actions/mutation/events/updateStakeholderData";
import GeneralDialog from "@/components/popup/GeneralDialog";
import LoadingCircle from "@/components/animation/LoadingCircle";
import { FileUploadField } from "@/components/forms/fields/CustomFileUpload";
import { uploadStakeholderImage } from "@/actions/mutation/events/uploadStakeholderImage";
import Cropper from "react-easy-crop";
import ImageCropper from "@/components/image/ImageCropper";
import { useRouter } from "next/navigation";

type EventStakeholderDetailSheetProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  eventData: IEventData;
  token: string;
};

type Point = {
  x: number;
  y: number;
};

type Area = { x: number; y: number; width: number; height: number };

export const EventStakeholderDetailSheet = ({
  open,
  setOpen,
  eventData,
  token,
}: EventStakeholderDetailSheetProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  if (!eventData) return null;
  if (!eventData.stakeholders) return null;
  if (eventData.stakeholders.length === 0) return null;
  const stakeholderUid = eventData.stakeholders[0].uid;
  const stakeholderName = eventData.stakeholders[0].name;

  const form = useForm<z.infer<typeof updateStakeholderSchema>>({
    resolver: zodResolver(updateStakeholderSchema),
    defaultValues: {
      eventStakeholderName: eventData.stakeholders[0].name,
      eventStakeholderPosition: eventData.stakeholders[0].position,
    },
  });

  const uploadStakeholderImageForm = useForm<
    z.infer<typeof uploadStakeholderImageSchema>
  >({
    resolver: zodResolver(uploadStakeholderImageSchema),
    defaultValues: {
      file: null,
    },
  });
  const handleSubmitStakeholderData = (
    values: z.infer<typeof updateStakeholderSchema>,
  ) => {
    setIsLoading(true);
    setOpen(false);
    try {
      toast.promise(
        updateStakeholderData(values, token, eventData.uid, stakeholderUid),
        {
          loading: "Updating stakeholder data...",
          success: (data) => {
            if (data.success) {
              setOpen(false);
              router.push("/events/" + eventData.uid);
              return data.message;
            }
            throw new Error(data.message as string);
          },
          error: (error) => {
            console.error("Error updating stakeholder data:", error);
            return error.message;
          },
          finally: () => {
            setIsLoading(false);
          },
        },
      );
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleFileChange = (
    values: z.infer<typeof uploadStakeholderImageSchema>,
  ) => {
    const file = values.file[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
    } else {
      setSelectedImage(null);
    }
  };
  const handleImageUploadSubmit = (file: File) => {
    try {
      toast.promise(uploadStakeholderImage(file, token, eventData.uid), {
        loading: "Uploading stakeholder image...",
        success: (data) => {
          if (data.success) {
            setOpenDialog(false);
            setOpen(false);
            router.push("/events/" + eventData.uid);
            return data.message;
          }
          throw new Error(data.message);
        },
        error: (error) => {
          console.error("Error uploading image:", error);
          return error.message;
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    }
  };
  return (
    <>
      <GeneralSheet
        open={open}
        setOpen={setOpen}
        title="Stakeholder Details"
        description="View and manage stakeholder details for this event."
      >
        <div className="">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmitStakeholderData)}
              className="w-full flex flex-col justify-center gap-4 px-4"
            >
              <div className="flex flex-row items-start justify-start">
                <div className="w-[70px] h-[70px] mr-4 rounded-full overflow-hidden border-2 border-black">
                  <Image
                    src={
                      ("https://certificate-be-production.up.railway.app" +
                        eventData.stakeholders[0].photoPath) as string
                    }
                    width={70}
                    height={70}
                    className="object-cover object-center"
                    alt={eventData.stakeholders[0].name.slice(0, 2)}
                    onLoad={() => {}}
                  />
                </div>

                <div className="flex flex-col gap-[1px] items-start justify-center">
                  <h1 className="text-lg font-bold">
                    {eventData.stakeholders[0].name}
                  </h1>
                  <p className="text-sm text-grayy">
                    {eventData.stakeholders[0].position}
                  </p>
                </div>
              </div>
              <Separator
                orientation="horizontal"
                className="text-black bg-black pb-[1px]"
              />
              <div className="flex flex-col gap-4">
                <InputFormField
                  form={form}
                  name="eventStakeholderName"
                  label="Stakeholder Name"
                  placeholder="Stakeholder Name"
                  type="text"
                  description="Enter the name of the stakeholder."
                />
                <InputFormField
                  form={form}
                  name="eventStakeholderPosition"
                  label="Stakeholder Position"
                  placeholder="Stakeholder Position"
                  type="text"
                  description="Enter the name position of the stakeholder."
                />
                <Button
                  type="button"
                  size={"lg"}
                  className="bordered bg-purplee hover:bg-purplee/90 border-b-4 hover:border-b-1 text-black w-full"
                  onClick={() => setOpenDialog(true)}
                >
                  upload stakeholder image
                </Button>
                <Button
                  type="submit"
                  className="bordered bg-greenn hover:bg-greenn/90 border-b-4 hover:border-b-1 text-black w-full"
                  size={"lg"}
                  disabled={isLoading}
                >
                  update
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </GeneralSheet>
      <GeneralDialog
        title="Upload Image"
        message="Upload a new image for the stakeholder."
        open={openDialog}
        setOpen={setOpenDialog}
        successText="upload"
        onSuccess={() => {
          handleImageUploadSubmit(uploadStakeholderImageForm.getValues("file"));
          setOpenDialog(false);
          setSelectedImage(null);
          setCroppedImage(null);
        }}
        onCancel={() => {
          setOpenDialog(false);
          setSelectedImage(null);
          setCroppedImage(null);
        }}
      >
        <Form {...uploadStakeholderImageForm}>
          <form
            onSubmit={uploadStakeholderImageForm.handleSubmit(handleFileChange)}
          >
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
              type="submit"
              className={`bordered bg-greenn hover:bg-greenn/90 border-b-4 hover:border-b-1 text-black w-full mt-3 ${
                !selectedImage ? "" : "hidden"
              }`}
            >
              resize image
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
            <img
              src={croppedImage}
              alt="Cropped Avatar"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        )}
      </GeneralDialog>
    </>
  );
};
