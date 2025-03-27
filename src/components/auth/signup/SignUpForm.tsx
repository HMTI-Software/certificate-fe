"use client";

//REACT / NEXTJS HOOKS AND LIBRARIES
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

//FORM COMPONENTS
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//UI / COMPONENTS LIBRARY
import { Form } from "@/components/ui/form";
import ErrorMessage from "@/components/auth/ErrorMessage";
import FormField from "@/components/auth/FormField";
import AuthButton from "@/components/auth/AuthButton";

//SCHEMA
import { signUpFormSchema } from "@/lib/definitions";
import { IUserData } from "@/lib/Interface";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed } from "lucide-react";

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
  const [userAllData, setUserAllData] = useState<IUserData[]>([]);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/static/UserData.json");
      const data = await res.json();
      setUserAllData(data);
    };
    fetchData();
  }, []);

  const signUpForm = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const submitHandler = (values: z.infer<typeof signUpFormSchema>) => {
    try {
      console.log(values);
      if (values.password !== values.confirmPassword) {
        signUpForm.setError("confirmPassword", {
          message: "Password not match",
        });
        return;
      }
      router.push("/auth/sign-in");
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
        <div className="mb-6">
          <b className="text-xl">Welcome!</b>
          <p>Please create an account to continue.</p>
        </div>
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
            className="bordered p-4 bg-purplee hover:bg-purplee min-h-12 min-w-12 rounded-md text-black"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Eye width={12} height={12} />
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
            className="bordered p-4 bg-purplee hover:bg-purplee min-h-12 min-w-12 rounded-md text-black"
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

        <AuthButton
          isLoading={signUpForm.formState.isSubmitting}
          mode="signUp"
        />
      </form>
    </Form>
  );
};

export default SignUpForm;
