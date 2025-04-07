"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import ErrorMessage from "@/components/auth/ErrorMessage";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

type DatePickerFormFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  description: string;
};

export function DatePickerFormField<T extends FieldValues>({
  form,
  name,
  label,
  description,
}: DatePickerFormFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel className="mb-2">{label}</FormLabel>
          <ErrorMessage
            message={form.formState.errors[name]?.message as string | undefined}
          />
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={`bordered rounded-md min-h-12 border-b-4 border-black hover:border-1 ${
                      form.formState.errors[name] ? "border-redd" : ""
                    }'`}
                  >
                    {field.value ? (
                      format(new Date(field.value), "iiii - dd/MM/yyyy")
                    ) : (
                      <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={(date) => {
                    if (date) field.onChange(date.toISOString());
                  }}
                />
              </PopoverContent>
            </Popover>
          </FormControl>
          <FormDescription className="text-xs">{description}</FormDescription>
        </FormItem>
      )}
    />
  );
}
