"use client";

import OAuthGoogle from "@/components/auth/OAuthGoogle";
import SignUpForm from "@/components/auth/signup/SignUpForm";
import { Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

interface ISigninField {
  name: string;
  id: string;
  placeholder: string;
  type: string;
  eyeId?: number;
}

const SignupPage = () => {
  const SigninField: ISigninField[] = [
    {
      name: "Email",
      id: "user-email",
      placeholder: "user@gmail.com",
      type: "text",
    },
    {
      name: "Password",
      id: "user-password",
      placeholder: "***********",
      type: "password",
      eyeId: 1,
    },
    {
      name: "Password Confirmation",
      id: "user-password-confirmation",
      placeholder: "***********",
      type: "password",
      eyeId: 2,
    },
  ];

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const openPassword = (eyeId?: number) => {
    console.log(eyeId);
    if (eyeId === 1) {
      setShowPassword(!showPassword);
    } else if (eyeId === 2) {
      setShowPasswordConfirmation(!showPasswordConfirmation);
    }
  };

  return (
    <div className="w-full px-10 md:px-20 lg:px-40 min-h-screen flex flex-col items-center justify-center">
      <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-center">
        <SignUpForm />
        <div className="flex gap-2 w-full items-center max-w-sm py-6">
          <div className="border border-black w-full"></div>
          <p className="whitespace-nowrap">or sign up using</p>
          <div className="border border-black w-full"></div>
        </div>
        <OAuthGoogle mode="signUp" />
      </div>
    </div>
  );
};

export default SignupPage;
