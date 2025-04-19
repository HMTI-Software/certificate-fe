import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import ErrorMessage from "@/components/auth/ErrorMessage";
import { Input } from "@/components/ui/input";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";

type FileUploadFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  description: string;
  placeholder?: string;
  type?: string;
  className?: string;
  accept: string;
};

export function FileUploadField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder = "",
  className = "",
  accept,
}: FileUploadFieldProps<T>) {
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
            <Input
              placeholder={placeholder}
              type="file"
              accept={accept}
              {...field}
              multiple={false}
              value={undefined} // Prevent uncontrolled input warning
              onChange={(e) => field.onChange(e.target.files)}
              className={`bordered placeholder:text-grayy rounded-md min-h-10 border-b-4 border-black hover:border-1 w-full ${
                form.formState.errors[name] ? "border-redd" : ""
              } ${className}`}
              required
            />
          </FormControl>
          <FormDescription className="text-xs">{description}</FormDescription>
        </FormItem>
      )}
    />
  );
}
