// components/events/CreateEventForm.tsx
"use client";

import { createEventSchema } from "@/lib/types/General";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { DatePickerFormField } from "./fields/CustomDatePickerField";
import { InputFormField } from "./fields/CustomInputField";
import { SelectFormField } from "./fields/CustomSelectField";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createEvent } from "@/actions/mutation/events/createEvent";
import { useRouter } from "next/navigation";
import LoadingCircle from "../animation/LoadingCircle";
import GeneralDialog from "../popup/GeneralDialog";
import { DefaultDesignTemplate } from "../template/DefaultDesignTemplate";
import { FormalDesign1Template } from "../template/FormalDesign1Template";
import { FormalDesign2Template } from "../template/FormalDesign2Template";
import { FormalDesign3Template } from "../template/FormalDesign3Template";
import { TechnologyDesign1Template } from "../template/TechnologyDesign1Template";
import { TechnologyDesign2Template } from "../template/TechnologyDesign2Template";
import { TechnologyDesign3Template } from "../template/TechnologyDesign3Template";
import { IEventParticipantCertificate } from "@/lib/types/Event";

const templateOptions = [
  { value: "DEFAULTDESIGN", label: "Default Design" },
  { value: "TECHNOLOGYDESIGN_1", label: "Technology Design 1" },
  { value: "TECHNOLOGYDESIGN_2", label: "Technology Design 2" },
  { value: "TECHNOLOGYDESIGN_3", label: "Technology Design 3" },
  { value: "FORMALDESIGN_1", label: "Formal Design 1" },
  { value: "FORMALDESIGN_2", label: "Formal Design 2" },
  { value: "FORMALDESIGN_3", label: "Formal Design 3" },
];
const CreateEventForm = () => {
  const router = useRouter();
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof createEventSchema>>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      eventName: "",
      eventDescription: "",
      eventDate: new Date().toISOString(),
      eventCertificatePrefixCode: "",
      eventCertificateSuffixCode: 1,
      eventOrganizer: "",
      eventTheme: "",
      eventStakeholderName: "",
      eventStakeholderPosition: "",
      eventTemplate: "DEFAULTDESIGN",
    },
  });

  const [participantCertificateData, setParticipantCertificateData] =
    useState<IEventParticipantCertificate>({
      eventName: form.getValues().eventName || "Name of the event",
      eventDescription:
        form.getValues().eventDescription || "Description of the event",
      activityAt: form.getValues().eventDate,
      eventTemplate: form.getValues().eventTemplate,
      eventTheme: form.getValues().eventTheme || "Theme of the event",
      organizer: form.getValues().eventOrganizer || "Organizer of the event",
      logoFirst: null,
      logoSecond: null,
      name: null,
      email: null,
      position: null,
      addedAt: null,
      certificateNumber: `${form.getValues().eventCertificatePrefixCode}${
        form.getValues().eventCertificateSuffixCode
      }`,
      stakeholders: {
        name:
          form.getValues().eventStakeholderName || "Name of the stakeholder",
        position:
          form.getValues().eventStakeholderPosition ||
          "Position of the stakeholder",
        photoPath: null,
      },
      qrCodes: null,
    });
  const submitHandler = async (values: z.infer<typeof createEventSchema>) => {
    setIsLoading(true);
    try {
      toast.promise(createEvent(values), {
        loading: "Creating event...",
        success: (data) => {
          if (data.success) {
            router.push("/dashboard");
            return "Event created successfully!";
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
      console.error("Error creating event: ", error);
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form>
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
              name="eventDescription"
              label="Event Description"
              description="Provide a brief description of your event"
              placeholder="SEMINAR NASIONAL TEKNOLOGI INFORMASI 2024"
            />
            <DatePickerFormField
              form={form}
              name="eventDate"
              label="Event Date"
              description="Activity date of your event"
            />
            <InputFormField
              form={form}
              name="eventCertificatePrefixCode"
              label="Event Certificate Prefix Code"
              description="Starting Serial of your certificate"
              placeholder="001/HMTI/SEMNASTI/XI/2024"
            />
            <InputFormField
              form={form}
              name="eventCertificateSuffixCode"
              label="Event Certificate Suffix Code"
              description="The starting number for the certificate suffix"
              placeholder="1"
              type="number"
            />
            <InputFormField
              form={form}
              name="eventOrganizer"
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
            <InputFormField
              form={form}
              name="eventStakeholderName"
              label="Event Stakeholder Name"
              description="Name of the stakeholder for the event"
              placeholder="Mr. John Doe"
            />
            <InputFormField
              form={form}
              name="eventStakeholderPosition"
              label="Event Stakeholder Position"
              description="Position of the stakeholder for the event"
              placeholder="Manager"
            />
            <Button
              type="button"
              disabled={isLoading}
              className="md:col-span-2 min-h-10 mt-4 w-full bordered hover:bg-purplee/90 border-b-4 bg-purplee hover:border-b-1 text-black"
              onClick={() => {
                setOpenTemplateDialog(true);
                setParticipantCertificateData({
                  ...participantCertificateData,
                  eventName: form.getValues().eventName || "rerer",
                  eventDescription: form.getValues().eventDescription,
                  activityAt: form.getValues().eventDate,
                  eventTemplate: form.getValues().eventTemplate,
                  eventTheme: form.getValues().eventTheme,
                  organizer: form.getValues().eventOrganizer,
                  stakeholders: {
                    name: form.getValues().eventStakeholderName,
                    position: form.getValues().eventStakeholderPosition,
                    photoPath: null,
                  },
                  certificateNumber: `${
                    form.getValues().eventCertificatePrefixCode
                  }${form.getValues().eventCertificateSuffixCode}`,
                });
              }}
            >
              {isLoading ? <LoadingCircle /> : "preview template"}
            </Button>
          </div>
          <GeneralDialog
            open={openTemplateDialog}
            setOpen={setOpenTemplateDialog}
            title="Template Preview"
            message="Preview the template before creating the event. If you want to change the template, please select another template."
            onSuccess={() => {
              setOpenTemplateDialog(false);
              form.handleSubmit(submitHandler)();
            }}
            successText="create event"
          >
            {form.getValues().eventTemplate === "DEFAULTDESIGN" ? (
              <DefaultDesignTemplate eventData={form.getValues()} />
            ) : form.getValues().eventTemplate === "FORMALDESIGN_1" ? (
              <FormalDesign1Template eventData={form.getValues()} />
            ) : form.getValues().eventTemplate === "FORMALDESIGN_2" ? (
              <FormalDesign2Template eventData={form.getValues()} />
            ) : form.getValues().eventTemplate === "FORMALDESIGN_3" ? (
              <FormalDesign3Template eventData={form.getValues()} />
            ) : form.getValues().eventTemplate === "TECHNOLOGYDESIGN_1" ? (
              <TechnologyDesign1Template
                mode="CREATE/EDIT"
                participantCertificateData={participantCertificateData}
              />
            ) : form.getValues().eventTemplate === "TECHNOLOGYDESIGN_2" ? (
              <div className="flex flex-col items-center justify-center">
                <TechnologyDesign2Template eventData={form.getValues()} />
              </div>
            ) : form.getValues().eventTemplate === "TECHNOLOGYDESIGN_3" ? (
              <TechnologyDesign3Template eventData={form.getValues()} />
            ) : null}
          </GeneralDialog>
        </form>
      </Form>
    </>
  );
};

export default CreateEventForm;
