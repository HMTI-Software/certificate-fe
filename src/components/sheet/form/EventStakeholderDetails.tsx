import { useRef, useState } from "react";
import { GeneralSheet } from "../GeneralSheet";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";
import { IEventData } from "@/lib/types/Event";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateStakeholderSchema } from "@/lib/types/General";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputFormField } from "@/components/forms/fields/CustomInputField";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { toast } from "sonner";
import { updateStakeholderData } from "@/actions/mutation/events/updateStakeholderData";

type EventStakeholderDetailSheetProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  eventData: IEventData;
  token: string;
};
export const EventStakeholderDetailSheet = ({
  open,
  setOpen,
  eventData,
  token,
}: EventStakeholderDetailSheetProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (!eventData) return null;
  if (!eventData.stakeholders) return null;
  if (eventData.stakeholders.length === 0) return null;
  const stakeholderUid = eventData.stakeholders[0].uid;
  const form = useForm<z.infer<typeof updateStakeholderSchema>>({
    resolver: zodResolver(updateStakeholderSchema),
    defaultValues: {
      eventStakeholderName: eventData.stakeholders[0].name,
      eventStakeholderPosition: eventData.stakeholders[0].position,
    },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleFallbackClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = (values: z.infer<typeof updateStakeholderSchema>) => {
    setIsLoading(true);
    setOpen(false);
    try {
      toast.promise(
        updateStakeholderData(values, token, eventData.uid, stakeholderUid),
        {
          loading: "Updating stakeholder data...",
          success: (data) => {
            if (data.success) {
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

  return (
    <GeneralSheet
      open={open}
      setOpen={setOpen}
      title="Stakeholder Details"
      description="View and manage stakeholder details for this event."
    >
      <div className="flex flex-col justify-center gap-4 px-4">
        <div className="flex flex-row items-start justify-start">
          <Avatar className="w-[70px] h-[70px] mr-4 cursor-pointer">
            <Image
              src={
                "https://certificate-be-production.up.railway.app" +
                eventData.stakeholders[0].photoPath
              }
              width={70}
              height={70}
              className="object-cover object-center"
              alt="User avatar"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1 items-start justify-center">
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
            <p className="font-semibold text-sm mb-3">
              Update Stakeholder Data :
            </p>
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
  );
};
