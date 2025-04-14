"use client";

//REACT / NEXTJS HOOKS AND LIBRARIES
import { FieldError, UseFormReturn } from "react-hook-form";

//UI / COMPONENTS LIBRARY
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

//SIGN IN FIELD PROPS
interface FieldFormProps {
  name: "email" | "password" | "confirmPassword";
  label: string;
  placeholder: string;
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: UseFormReturn<any>;
  error?: FieldError;
  children?: React.ReactNode;
  description?: string;
}

/**
 * @author fatih
 *
 * A reusable form field component for handling input fields in a form.
 * This component integrates with `react-hook-form` for form state management
 * and provides a consistent UI for form inputs.
 *
 * @component
 * @param {FieldFormProps} props - The props for the `FormField` component.
 *
 * @prop {"email" | "password" | "confirmPassword"} name - The name of the input field, used for form registration.
 * @prop {string} label - The label text displayed above the input field.
 * @prop {string} placeholder - The placeholder text displayed inside the input field.
 * @prop {string} type - The type of the input field (e.g., "text", "password", "email").
 * @prop {UseFormReturn<any>} form - The `react-hook-form` instance used for managing form state.
 * @prop {FieldError} [error] - Optional error object for displaying validation errors.
 * @prop {React.ReactNode} [children] - Optional child elements to render alongside the input field.
 * @prop {string} description - Optional description text displayed below the input field.
 *
 * @example
 * ```tsx
 * import { useForm } from "react-hook-form";
 * import FormField from "./FormField";
 *
 * const MyForm = () => {
 *   const form = useForm();
 *
 *   return (
 *     <form>
 *       <FormField
 *         name="email"
 *         label="Email Address"
 *         placeholder="Enter your email"
 *         type="email"
 *         form={form}
 *         error={form.formState.errors.email}
 *       />
 *     </form>
 *   );
 * };
 * ```
 */
const FormField = ({
  name,
  label,
  placeholder,
  type,
  form,
  error,
  children,
  description,
}: FieldFormProps) => {
  return (
    <FormItem className="w-full flex flex-col">
      <FormLabel className="mb-2">{label}</FormLabel>
      {children ? (
        <FormControl>
          <div className="flex gap-2 items-center">
            <Input
              type={type}
              className={`bordered rounded-md w-full min-h-12 border-b-4 border-black hover:border-1 ${
                error ? "border-redd" : ""
              }`}
              placeholder={placeholder}
              {...form.register(name)}
              aria-invalid={!!error}
            />
            {children}
          </div>
        </FormControl>
      ) : (
        <FormControl>
          <Input
            type={type}
            className={`bordered rounded-md w-full min-h-12 border-b-4 border-black hover:border-1 ${
              error ? "border-redd" : ""
            }`}
            placeholder={placeholder}
            {...form.register(name)}
            aria-invalid={!!error}
          />
        </FormControl>
      )}
      {description && (
        <FormDescription className="text-xs">{description}</FormDescription>
      )}
    </FormItem>
  );
};

export default FormField;
