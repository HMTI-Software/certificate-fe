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

type EventStakeholderDetailSheetProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  eventData: IEventData;
};
export const EventStakeholderDetailSheet = ({
  open,
  setOpen,
  eventData,
}: EventStakeholderDetailSheetProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (!eventData.stakeholders) return null;
  const eventStakeholderPhotoPath = eventData.stakeholders.find((value) => {
    return value.eventId === eventData.uid;
  });
  console.log(eventData.stakeholders);

  if (eventData.stakeholders.length === 0) return null;
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

  const handleSubmit = (data: z.infer<typeof updateStakeholderSchema>) => {
    console.log(data);
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
          <Avatar className="w-[70px] h-[70px] mr-4 cursor-pointer relative overflow-hidden">
            <AvatarImage
              src={
                process.env.BACKEND_URL !== null || undefined
                  ? `${process.env.BACKEND_URL}${eventData.stakeholders[0].photoPath}`
                  : `https://certificate-be-production.up.railway.app/${eventData.stakeholders[0].photoPath}`
              }
              alt="User avatar"
            />
            <AvatarFallback className="bg-gray-200 text-grayy flex flex-col items-center justify-center">
              CN
            </AvatarFallback>
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
