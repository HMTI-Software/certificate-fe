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
import SignInField from "@/components/auth/signin/SignInField";
import ErrorMessage from "@/components/auth/ErrorMessage";
import SignInButton from "@/components/auth/AuthButton";

//SCHEMA
import { signInFormSchema } from "@/lib/definitions";
import { IUserData } from "@/lib/Interface";

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
  const [userAllData, setUserAllData] = useState<IUserData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/static/UserData.json");
      const data = await res.json();
      setUserAllData(data);
    };
    fetchData();
  }, []);

  const signInForm = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = (values: z.infer<typeof signInFormSchema>) => {
    try {
      const user = userAllData.find((user) => user.email === values.email);
      if (!user) {
        signInForm.setError("email", { message: "Email not found" });
        return;
      }
      if (user.password !== values.password) {
        signInForm.setError("password", { message: "Password incorrect." });
        return;
      }
      router.push("/dashboard");
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
        <div className="mb-3">
          <b className="text-xl">Halo, User</b>
          <p>Please sign in to continue</p>
        </div>
        <ErrorMessage message={signInForm.formState.errors.email?.message} />
        <ErrorMessage message={signInForm.formState.errors.password?.message} />

        <SignInField
          name="email"
          label="Email"
          type="email"
          placeholder="user@example.com"
          form={signInForm}
          error={signInForm.formState.errors.email}
        />
        <SignInField
          name="password"
          label="Password"
          type="password"
          placeholder="***********"
          form={signInForm}
          error={signInForm.formState.errors.password}
        />

        <div className="text-black text-end">
          <Link href="/auth/forgot-password" className="underline text-sm">
            Forget password?
          </Link>
        </div>

        <SignInButton
          isLoading={signInForm.formState.isSubmitting}
          mode="signIn"
        />
      </form>
    </Form>
  );
};

export default SignInForm;
