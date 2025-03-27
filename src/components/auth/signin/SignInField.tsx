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
interface SignInFieldProps {
  name: "email" | "password";
  label: string;
  placeholder: string;
  type: string;
  form: UseFormReturn<any>;
  error?: FieldError;
}

/**
 * @returns
 * SignInField component
 *
 * @description
 * This component is used to render the sign in form fields
 *
 * @example
 * <SignInField />
 */
const SignInField = ({
  name,
  label,
  placeholder,
  type,
  form,
  error,
}: SignInFieldProps) => {
  return (
    <FormItem className="w-full flex flex-col">
      <FormLabel className="mb-2">{label}</FormLabel>
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
      <FormDescription className="text-sm">
        {name === "email" && "Enter the registered email address."}
      </FormDescription>
    </FormItem>
  );
};

export default SignInField;
