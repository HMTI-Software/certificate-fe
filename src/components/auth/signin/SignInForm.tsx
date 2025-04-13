"use client";

//REACT / NEXTJS HOOKS AND LIBRARIES
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
import { signInFormSchema } from "@/lib/types/General";
import { toast } from "sonner";
import { submitSignInForm } from "@/actions/submitSignInForm";

/**
 * @returns
 * SignInForm component
 *
 * @description
 * This component is used to render the sign in form
 *
 * @example
 * <SignInForm />
 */
const SignInForm = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = (values: z.infer<typeof signInFormSchema>) => {
    setIsLoading(true);
    try {
      toast.promise(submitSignInForm(values), {
        loading: "Signing In...",
        success: (data) => {
          if (data.success) {
            router.push("/dashboard");
            return data.message;
          }
          throw new Error(data.message);
        },
        error: (error) => {
          return error.message;
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...signInForm}>
      <form
        onSubmit={signInForm.handleSubmit(submitHandler)}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <ErrorMessage message={signInForm.formState.errors.email?.message} />
        <ErrorMessage message={signInForm.formState.errors.password?.message} />

        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="user@example.com"
          form={signInForm}
          error={signInForm.formState.errors.email}
          description="Please enter your registered email address"
        />
        <FormField
          name="password"
          label="Password"
          type="password"
          placeholder="***********"
          form={signInForm}
          error={signInForm.formState.errors.password}
        />

        <div className="text-black text-end">
          <Link href="/auth/forgot-password" className="underline text-sm">
            Forgot password?
          </Link>
        </div>
        <AuthButton isLoading={isLoading} mode="signIn" />
      </form>
    </Form>
  );
};

export default SignInForm;
