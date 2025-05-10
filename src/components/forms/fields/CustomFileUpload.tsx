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
import { cn } from "@/lib/utils";

type FileUploadFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: FieldPath<T>;
  label: string;
  description: string;
  placeholder?: string;
  type?: string;
  className?: string;
  accept: string;
  children?: React.ReactNode;
};

export function FileUploadField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  placeholder = "",
  className = "",
  accept,
  children,
}: FileUploadFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            "w-full",
            children ? "flex flex-row gap-2 items-center justify-center" : "",
          )}
        >
          <div className="flex flex-col gap-2">
            <FormLabel className="mb-2">{label}</FormLabel>
            <ErrorMessage
              message={
                form.formState.errors[name]?.message as string | undefined
              }
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
              />
            </FormControl>
            <FormDescription className="text-xs">{description}</FormDescription>
          </div>
          {children && <div className="flex flex-row gap-1">{children}</div>}
        </FormItem>
      )}
    />
  );
}
