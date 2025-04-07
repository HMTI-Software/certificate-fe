// components/forms/SelectField.tsx
"use client";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ErrorMessage from "@/components/auth/ErrorMessage";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  description: string;
  placeholder: string;
  options: SelectOption[];
}

export function SelectFormField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder,
  options,
}: SelectFieldProps<T>) {
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
          <Select
            onValueChange={(value) => field.onChange(value)}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger
                className={`bordered rounded-md min-h-12 border-b-4 border-black hover:border-1 w-full ${
                  form.formState.errors[name] ? "border-redd" : ""
                }`}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormDescription className="text-xs">{description}</FormDescription>
        </FormItem>
      )}
    />
  );
}
