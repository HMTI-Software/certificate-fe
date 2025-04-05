"use client";

//REACT / NEXTJS HOOKS AND LIBRARIES
import { useState } from "react";

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
import { resetPasswordFormSchema } from "@/lib/types/General";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { submitResetPasswordForm } from "@/actions/submitResetPasswordForm";

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
const ResetPasswordForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const query = useSearchParams();
  const token = query.get("token") || undefined;

  const resetPasswordForm = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = (values: z.infer<typeof resetPasswordFormSchema>) => {
    console.log("values", values);

    setIsLoading(true);
    try {
      toast.promise(submitResetPasswordForm(values, token), {
        loading: "Resetting Password...",
        success: (data) => {
          if (data.success) {
            router.push("/auth/sign-in");
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
      setIsLoading(false);
      console.error(error);
    }
  };

  return (
    <Form {...resetPasswordForm}>
      <form
        onSubmit={resetPasswordForm.handleSubmit(submitHandler)}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <ErrorMessage
          message={resetPasswordForm.formState.errors.password?.message}
        />
        <ErrorMessage
          message={resetPasswordForm.formState.errors.confirmPassword?.message}
        />

        <FormField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="***********"
          form={resetPasswordForm}
          error={resetPasswordForm.formState.errors.password}
        >
          <Button
            type="button"
            className="bordered p-4 bg-[#59FFAC] hover:bg-[#59FFAC/90] min-h-12 min-w-12 rounded-md text-black"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <Eye width={12} height={12} />
            ) : (
              <EyeClosed width={12} height={12} />
            )}
          </Button>
        </FormField>
        <FormField
          name="confirmPassword"
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="***********"
          form={resetPasswordForm}
          error={resetPasswordForm.formState.errors.confirmPassword}
        >
          <Button
            type="button"
            className="bordered p-4 bg-[#59FFAC] hover:bg-[#59FFAC/90] min-h-12 min-w-12 rounded-md text-black"
            onClick={() => {
              setShowConfirmPassword(!showConfirmPassword);
            }}
          >
            {showConfirmPassword ? (
              <Eye width={12} height={12} />
            ) : (
              <EyeClosed width={12} height={12} />
            )}
          </Button>
        </FormField>
        <AuthButton isLoading={isLoading} mode="resetPassword" />
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
