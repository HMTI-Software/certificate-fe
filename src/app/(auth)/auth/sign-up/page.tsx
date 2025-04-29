"use client";

import SignUpForm from "@/components/auth/signup/SignUpForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <div className="w-full py-6 md:py-0 px-10 md:px-20 lg:px-40 min-h-screen flex flex-col items-center md:justify-center">
      <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-start">
        <div className="max-w-sm flex flex-col gap-1 mb-5">
          <b className="text-xl">Welcome!</b>
          <p>Please create an account to continue.</p>
        </div>
        <SignUpForm />
        <div className="inline-flex text-sm justify-center mt-3 mx-auto">
          <p>Already have a account?</p>
          <Link href="/auth/sign-in" className="underline cursor-pointer ml-1">
            Login Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
