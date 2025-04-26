"use client";

import { useState } from "react";
import { GeneralSheet } from "../GeneralSheet";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { InputFormField } from "@/components/forms/fields/CustomInputField";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  addParticipantSchema,
  multipleParticipantSchema,
} from "@/lib/types/General";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { addParticipants } from "@/actions/mutation/participants/addParticipants";
import LoadingCircle from "@/components/animation/LoadingCircle";
import { useParticipantsContext } from "@/context/ParticipantsContext";

type AddParticipantSheetProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  eventUid: string;
};

export const AddParticipantSheet = ({
  open,
  setOpen,
  eventUid,
}: AddParticipantSheetProps) => {
  const { refreshParticipants } = useParticipantsContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [participantCount, setParticipantCount] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [participants, setParticipants] = useState<
    z.infer<typeof addParticipantSchema>[]
  >([]);

  const form = useForm<z.infer<typeof addParticipantSchema>>({
    resolver: zodResolver(addParticipantSchema),
    defaultValues: {
      name: "",
      email: "",
      position: "",
    },
  });

  const handleNext = (data: z.infer<typeof addParticipantSchema>) => {
    setParticipants((prev) => [...prev, data]);
    setCurrentIndex((i) => i + 1);
    form.reset();
  };

  const submitHandler = async (
    values: z.infer<typeof addParticipantSchema>,
  ) => {
    setIsLoading(true);
    setOpen(false);
    try {
      const validatedFields = multipleParticipantSchema.safeParse([
        ...participants,
        values,
      ]);
      if (!validatedFields.success) {
        toast.error("Invalid participant data.");
        return;
      }
      toast.promise(addParticipants(validatedFields.data, eventUid), {
        loading: "Adding participants...",
        success: (data) => {
          if (data.success) {
            refreshParticipants();
            return data.message;
          }
          throw new Error(data.message);
        },
        error: (error) => {
          return error.message;
        },
        finally: () => {
          setParticipants([]);
          setCurrentIndex(0);
          setParticipantCount(null);
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error adding participants:", error);
    }
  };
  return (
    <GeneralSheet
      title="Add Participant Manually"
      description="Add participant manually to the event"
      open={open}
      setOpen={setOpen}
    >
      <div className="px-4">
        {participantCount === null ? (
          <>
            <h2 className="text-sm">
              How many participants would you like to add?
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const value = parseInt(formData.get("total") as string);
                if (value > 0) setParticipantCount(value);
              }}
              className="space-y-4"
            >
              <Input
                placeholder="Enter the number of participants"
                type="number"
                className="bordered rounded-md min-h-12 border-b-4 border-black hover:border-1 w-full mt-4"
                name="total"
                required
              />
              <Button
                type="submit"
                className="bordered bg-greenn hover:bg-greenn/90 border-b-4 hover:border-b-1 text-black w-full"
                size={"lg"}
              >
                next
              </Button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-sm font-semibold mb-4">
              Add participant {currentIndex + 1} of {participantCount}
            </h2>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(
                  currentIndex + 1 === participantCount
                    ? submitHandler
                    : handleNext,
                )}
                className="flex flex-col w-full gap-4"
              >
                <InputFormField
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Participant Name"
                  form={form}
                  description="Name of participant"
                />
                <InputFormField
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="user@gmail.com"
                  form={form}
                  description="Email address of participant"
                />
                <InputFormField
                  type="text"
                  name="position"
                  label="Position"
                  placeholder="Manager"
                  form={form}
                  description="Position of participant"
                />
                <Button
                  type="submit"
                  className="bordered bg-greenn hover:bg-greenn/90 border-b-4 hover:border-b-1 text-black w-full"
                  size={"lg"}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <LoadingCircle />
                  ) : currentIndex + 1 === participantCount ? (
                    "submit all"
                  ) : (
                    `next (${currentIndex + 1}/${participantCount})`
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </GeneralSheet>
  );
};
