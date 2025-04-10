"use client";
import OAuthGoogle from "@/components/auth/OAuthGoogle";
import SignInForm from "@/components/auth/signin/SignInForm";
import Link from "next/link";

const SignInPage = () => {
  return (
    <div className="w-full py-6 md:py-0 px-10 md:px-20 lg:px-40 min-h-screen flex flex-col items-center md:justify-center">
      <div className="min-w-sm flex flex-col border-black p-4 rounded-lg">
        <div className="max-w-sm flex flex-col gap-1 mb-3">
          <b className="text-xl">Halo, User</b>
          <p>Please sign in to continue</p>
        </div>
        <SignInForm />
        <div className="flex gap-2 w-full items-center max-w-sm py-6">
          <div className="border border-black w-full"></div>
          <p className="whitespace-nowrap">or login using</p>
          <div className="border border-black w-full"></div>
        </div>
        <OAuthGoogle />
        <div className="inline-flex text-sm justify-center mt-3">
          <p>Don&#39;t have an account yet?</p>
          <Link href="/auth/sign-up" className="underline cursor-pointer ml-1">
            Register Here!
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
