"use client";
import { submitRequestVerify } from "@/actions/submitRequestVerify";
import submitVerifyEmail from "@/actions/submitVerifyEmail";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IAuthSession } from "@/lib/types/Auth";
import { MailCheck, MailX } from "lucide-react";
import ThreeCircleLoading from "@/components/animation/ThreeCircleLoading";
import LoadingCircle from "@/components/animation/LoadingCircle";

export const VerifyEmail = ({ session }: { session: IAuthSession }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [disableButton, setDisableButton] = useState<boolean>(false);
  const [isVerify, setIsVerify] = useState<boolean | null>(null);
  const [verifyMessage, setVerifyMessage] = useState<string>("");

  const query = useSearchParams();
  const queryToken = query.get("token");
  useEffect(() => {
    const verifyEmail = async () => {
      if (queryToken && queryToken.length > 1) {
        try {
          const data = await submitVerifyEmail(queryToken);
          if (data.success) {
            setIsVerify(true);
            setVerifyMessage(data.message as string);
            return;
          }
          setIsVerify(false);
          setVerifyMessage(data.message as string);
        } catch (error) {
          console.error("Error verifying email", error);
          setIsVerify(false);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    verifyEmail();
  });

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
          {isLoading ? (
            <LoadingCircle />
          ) : (
            <MailCheck size={18} className="mr-2" />
          )}
          {disableButton
            ? "Sending Verify Email..."
            : "Send Verification Email"}
        </Button>
      </div>
    );
  }
  return (
    <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-center justify-center">
      <div className="max-w-lg flex flex-col gap-1">
        <div className="flex flex-col text-2xl">
          {isLoading ? (
            <ThreeCircleLoading message="waiting verification..." />
          ) : (
            <>
              {isVerify ? (
                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="inline-flex gap-2 items-center justify-center">
                    <MailCheck size={50} />
                    <span className="my-auto font-bold">
                      {verifyMessage || "Email verified successfully"}
                    </span>
                  </div>
                  <p className="text-sm text-center">{verifyMessage}</p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="inline-flex gap-2 items-center justify-center">
                    <MailX size={50} />
                    <span className="my-auto font-bold">
                      {verifyMessage || "Email verification failed"}
                    </span>
                  </div>
                  <p className="text-sm text-center">
                    {verifyMessage === "Invalid or expired token"
                      ? "Please double check the URL or maybe the account has been successfully verified."
                      : "Please check your email inbox and click on the verification link to confirm your email address."}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
