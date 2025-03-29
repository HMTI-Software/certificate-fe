"use client";

//REACT / NEXTJS HOOKS AND LIBRARIES
import { useRouter } from "next/navigation";
import { useState } from "react";

//FORM COMPONENTS
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitSignUpForm } from "@/actions/submitSignUpForm";

//UI / COMPONENTS LIBRARY
import { Form } from "@/components/ui/form";
import ErrorMessage from "@/components/auth/ErrorMessage";
import FormField from "@/components/auth/FormField";
import AuthButton from "@/components/auth/AuthButton";

//SCHEMA
import { signUpFormSchema } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";
import { toast } from "sonner";

/**
 * @returns
 * SignUpForm component
 *
 * @description
 * This component is used to render the sign up form
 *
 * @example
 * <SignUpForm />
 */
const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = (values: z.infer<typeof signUpFormSchema>) => {
    setIsLoading(true);
    try {
      if (values.password !== values.confirmPassword) {
        signUpForm.setError("confirmPassword", {
          message: "Password not match",
        });
        return;
      }
      toast.promise(submitSignUpForm(values), {
        loading: "Signing up...",
        success: (data) => {
          if (data?.data?.status === 201 && data.data.status) {
            router.push("/auth/sign-in");
            return data?.message;
          } else {
            return data.error;
          }
        },
        error: (error) => {
          return error;
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
    <Form {...signUpForm}>
      <form
        onSubmit={signUpForm.handleSubmit(submitHandler)}
        className="w-full max-w-sm flex flex-col gap-4"
      >
        <ErrorMessage message={signUpForm.formState.errors.email?.message} />
        <ErrorMessage message={signUpForm.formState.errors.password?.message} />
        <ErrorMessage
          message={signUpForm.formState.errors.confirmPassword?.message}
        />

        <FormField
          name="email"
          label="Email"
          type="email"
          placeholder="user@example.com"
          form={signUpForm}
          error={signUpForm.formState.errors.email}
          description="We'll never share your email with anyone else."
        />
        <FormField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          placeholder="***********"
          form={signUpForm}
          error={signUpForm.formState.errors.password}
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
          form={signUpForm}
          error={signUpForm.formState.errors.confirmPassword}
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
        <AuthButton isLoading={isLoading} mode="signUp" />
      </form>
    </Form>
  );
};

export default SignUpForm;
