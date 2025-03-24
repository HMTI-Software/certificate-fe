"use client";

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
        <form action="" className="w-full max-w-sm flex flex-col gap-4">
          <div className="mb-6">
            <b className="text-xl">Welcome!</b>
            <p>Please create an account to continue.</p>
          </div>
          {SigninField.map((field) => (
            <div className="w-full flex flex-col" key={field.id}>
              <label htmlFor={field.id} className="mb-2">
                {field.name}
              </label>
              {field.type === "password" ? (
                <div className="flex-col flex gap-2">
                  <div className="flex gap-2 items-stretch">
                    <input
                      type={
                        field.eyeId == 1
                          ? showPassword
                            ? "text"
                            : "password"
                          : showPasswordConfirmation
                          ? "text"
                          : "password"
                      }
                      name={field.id}
                      className="bordered rounded-md w-full"
                      id={field.id}
                      placeholder={field.placeholder}
                    />
                    <div
                      onClick={() => {
                        openPassword(field.eyeId);
                      }}
                      className="bg-purplee h-full aspect-square bordered rounded-md flex justify-center items-center"
                    >
                      {field.eyeId === 1 ? (
                        showPassword ? (
                          <Eye />
                        ) : (
                          <EyeClosed />
                        )
                      ) : showPasswordConfirmation ? (
                        <Eye />
                      ) : (
                        <EyeClosed />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <input
                  type={field.type}
                  name={field.id}
                  className="bordered rounded-md w-full"
                  id={field.id}
                  placeholder={field.placeholder}
                />
              )}
            </div>
          ))}
          <button className="bordered bg-purplee rounded-md">Sign Up</button>
        </form>
        <div className="flex gap-2 w-full items-center max-w-sm py-6">
          <div className="border border-black w-full"></div>
          <p className="whitespace-nowrap">or sign up using</p>
          <div className="border border-black w-full"></div>
        </div>
        <div className="flex gap-2 w-full max-w-sm">
          <button className="bordered rounded-md w-full justify-center bg-yelloww flex items-center gap-2 text-sm">
            <FcGoogle />
            Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
