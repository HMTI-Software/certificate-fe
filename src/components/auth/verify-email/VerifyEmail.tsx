"use client";
import submitVerifyEmail from "@/actions/mutation/auth/submitVerifyEmail";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IAuthSession } from "@/lib/types/Auth";
import { MailCheck, MailX } from "lucide-react";
import ThreeCircleLoading from "@/components/animation/ThreeCircleLoading";
import { SendVerifyEmail } from "./SendVerifyEmail";

export const VerifyEmail = ({ session }: { session: IAuthSession }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
  }, [queryToken]);

  if (!queryToken || queryToken.length < 1) {
    return <SendVerifyEmail session={session} />;
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
                      Email verified successfully
                    </span>
                  </div>
                  <p className="text-sm text-center">
                    You can now return to the sign-in page and log in to your
                    account.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3 items-center justify-center">
                  <div className="inline-flex gap-2 items-center justify-center">
                    <MailX size={50} />
                    <span className="my-auto font-bold">
                      Email verification failed
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
