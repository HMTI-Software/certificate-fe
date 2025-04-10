"use client";
import { submitRequestVerify } from "@/actions/submitRequestVerify";
import submitVerifyEmail from "@/actions/submitVerifyEmail";
import LoadingCircle from "@/components/animation/LoadingCircle";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { IAuthSession } from "@/lib/types/Auth";

export const VerifyEmail = ({ session }: { session: IAuthSession }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [disableButton, setDisableButton] = useState<boolean>(false);

  const router = useRouter();
  const query = useSearchParams();
  const queryToken = query.get("token");

  const handleResendEmail = () => {
    setIsLoading(true);
    try {
      toast.promise(submitRequestVerify(session.token!), {
        loading: "Sending email...",
        success: (data) => {
          if (data.message) {
            setDisableButton(true);
            return "Verification email sent successfully";
          }
          throw new Error("Failed to send verification email");
        },
        error: (error) => {
          return error.message;
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error verifying email", error);
      setIsLoading(false);
    }
  };

  const handleVerifyEmail = () => {
    setIsLoading(true);
    try {
      toast.promise(submitVerifyEmail(queryToken!), {
        loading: "Verifying email...",
        success: (data) => {
          if (data.message) {
            router.push("/auth/sign-in");
            return "Email verified successfully";
          }
          throw new Error("Email verification failed");
        },
        error: (error) => {
          return error.message;
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error verifying email", error);
      setIsLoading(false);
    }
  };
  if (!queryToken || queryToken.length < 1) {
    return (
      <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-start">
        <div className="max-w-lg flex flex-col gap-1 mb-3">
          <b className="text-xl">Send Verification Link</b>
          <p className="text-sm">
            Please check your email inbox and click on the verification link to
            confirm your email address.
          </p>
        </div>
        <Button
          onClick={() => handleResendEmail()}
          disabled={disableButton || isLoading}
          className="bordered bg-greenn hover:bg-greenn/90 hover:border-b-1 border-b-4 border-black text-black w-full"
        >
          {disableButton
            ? "Sending Verify Email..."
            : "Send Verification Email"}
        </Button>
      </div>
    );
  }
  return (
    <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-start">
      <div className="max-w-lg flex flex-col gap-1 mb-3">
        <b className="text-xl">Verify Your Email</b>
        <p className="text-sm">
          Please check your email inbox and click on the verification link to
          confirm your email address.
        </p>
      </div>
      <Button
        onClick={() => handleVerifyEmail()}
        disabled={isLoading}
        className="bordered bg-greenn hover:bg-greenn/90 hover:border-b-1 border-b-4 border-black text-black w-full"
      >
        {isLoading ? "Wait..." : "Verify Email"}
      </Button>
    </div>
  );
};
