"use client";

//REACT / NEXTJS HOOKS AND LIBRARIES

//FORM COMPONENTS
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//UI / COMPONENTS LIBRARY
import FormField from "@/components/auth/FormField";
import { Form } from "@/components/ui/form";
import ErrorMessage from "@/components/auth/ErrorMessage";
import AuthButton from "@/components/auth/AuthButton";

//SCHEMA
import { forgotPasswordFormSchema } from "@/lib/definitions";

/**
 * @returns
 * Forgot Password component
 *
 * @description
 * This component is used to render the forgot password form
 *
 * @example
 * <ForgotPasswordForm />
 */
const ForgotPasswordForm = () => {
  const forgotPasswordForm = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const submitHandler = (values: z.infer<typeof forgotPasswordFormSchema>) => {
    try {
      console.log(values);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...forgotPasswordForm}>
      <form
        onSubmit={forgotPasswordForm.handleSubmit(submitHandler)}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <ErrorMessage
          message={forgotPasswordForm.formState.errors.email?.message}
        />

        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="user@example.com"
          form={forgotPasswordForm}
          error={forgotPasswordForm.formState.errors.email}
        />
        <AuthButton
          isLoading={forgotPasswordForm.formState.isSubmitting}
          mode="forgotPassword"
        />
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
