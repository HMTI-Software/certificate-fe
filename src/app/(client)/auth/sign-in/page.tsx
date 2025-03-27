"use client";
import OAuthGoogle from "@/components/auth/OAuthGoogle";
import SignInForm from "@/components/auth/signin/SignInForm";

const SignInPage = () => {
  return (
    <div className="w-full px-10 md:px-20 lg:px-40 min-h-screen flex flex-col items-center md:justify-center">
      <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-center">
        <SignInForm />
        <div className="flex gap-2 w-full items-center max-w-sm py-6">
          <div className="border border-black w-full"></div>
          <p className="whitespace-nowrap">or login using</p>
          <div className="border border-black w-full"></div>
        </div>
        <OAuthGoogle mode="signIn" />
      </div>
    </div>
  );
};

export default SignInPage;
