// components/events/CreateEventForm.tsx
"use client";

import { updateEventSchema } from "@/lib/types/General";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DatePickerFormField } from "./fields/CustomDatePickerField";
import { InputFormField } from "./fields/CustomInputField";
import { SelectFormField } from "./fields/CustomSelectField";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { IEventData } from "@/lib/types/Event";
import { updateEvent } from "@/actions/mutation/events/updateEvent";
import LoadingCircle from "../animation/LoadingCircle";

const templateOptions = [
  { value: "DEFAULTDESIGN", label: "Default Design" },
  { value: "TECHNOLOGYDESIGN_1", label: "Technology Design 1" },
  { value: "TECHNOLOGYDESIGN_2", label: "Technology Design 2" },
  { value: "TECHNOLOGYDESIGN_3", label: "Technology Design 3" },
  { value: "FORMALDESIGN_1", label: "Formal Design 1" },
  { value: "FORMALDESIGN_2", label: "Formal Design 2" },
  { value: "FORMALDESIGN_3", label: "Formal Design 3" },
];

interface CreateEventFormProps {
  eventData: IEventData;
}

const UpdateEventForm = ({ eventData }: CreateEventFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof updateEventSchema>>({
    resolver: zodResolver(updateEventSchema),
    defaultValues: {
      eventName: eventData.eventName,
      description: eventData.description,
      activityAt: eventData.activityAt,
      prefixCode: eventData.prefixCode,
      suffixCode: eventData.suffixCode,
      organizer: eventData.organizer,
      eventTheme: eventData.eventTheme,
      eventTemplate: eventData.eventTemplate,
    },
  });

  const submitHandler = async (values: z.infer<typeof updateEventSchema>) => {
    setIsLoading(true);
    try {
      toast.promise(updateEvent(values, eventData.uid), {
        loading: "Updating event...",
        success: (data) => {
          if (data.success) {
            router.push(`/events/${eventData.uid}`);
            return "Event updated successfully!";
          }
          throw new Error(data.message as string);
        },
        error: (error) => {
          return error.message;
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error updating event: ", error);
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="mt-4 grid w-full grid-cols-1 md:grid-cols-2 gap-4">
          <InputFormField
            form={form}
            name="eventName"
            label="Event Name"
            description="The name of your event"
            placeholder="SEMNASTI 2024"
          />
          <InputFormField
            form={form}
            name="description"
            label="Event Description"
            description="Provide a brief description of your event"
            placeholder="SEMINAR NASIONAL TEKNOLOGI INFORMASI 2024"
          />
          <DatePickerFormField
            form={form}
            name="activityAt"
            label="Event Date"
            description="Activity date of your event"
          />
          <InputFormField
            form={form}
            name="prefixCode"
            label="Event Certificate Prefix Code"
            description="Starting Serial of your certificate"
            placeholder="001/HMTI/SEMNASTI/XI/2024"
          />
          <InputFormField
            form={form}
            name="suffixCode"
            label="Event Certificate Suffix Code"
            description="The starting number for the certificate suffix"
            placeholder="1"
            type="number"
          />
          <InputFormField
            form={form}
            name="organizer"
            label="Event Organizer"
            description="Name a organizer for your event"
            placeholder="Himpunan Mahasiswa Teknik Informatika"
          />
          <InputFormField
            form={form}
            name="eventTheme"
            label="Event Theme"
            description="Name a theme for your event"
            placeholder="Technology"
          />
          <SelectFormField
            form={form}
            name="eventTemplate"
            label="Event Template"
            description="Choose a template for your event certificate"
            placeholder="Select a certificate theme"
            options={templateOptions}
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="md:col-span-2 min-h-10 mt-4 w-full bordered hover:bg-purplee/90 border-b-4 bg-purplee hover:border-b-1 text-black"
          >
            {isLoading ? (
              <div>
                <LoadingCircle />
                <span className="ml-2">updating...</span>
              </div>
            ) : (
              "update event"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UpdateEventForm;
