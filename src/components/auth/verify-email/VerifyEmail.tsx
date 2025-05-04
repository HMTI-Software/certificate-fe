"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import submitVerifyEmail from "@/actions/mutation/auth/submitVerifyEmail";
import { IAuthSession } from "@/lib/types/Auth";
import { LayoutDashboard, MailCheck, MailX } from "lucide-react";
import ThreeCircleLoading from "@/components/animation/ThreeCircleLoading";
import { SendVerifyEmail } from "./SendVerifyEmail";

export const VerifyEmail = ({ session }: { session: IAuthSession }) => {
  const { status, update } = useSession();
  const query = useSearchParams();
  const token = query.get("token");

  const [isLoading, setIsLoading] = useState(true);
  const [isVerify, setIsVerify] = useState<boolean | null>(null);
  const [verifyMessage, setVerifyMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token || token.length < 1) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await submitVerifyEmail(token);

        setIsVerify(res.success);
        setVerifyMessage(res.message as string);

        // Only update session if user is authenticated
        if (res.success && status === "authenticated") {
          await update({ isVerifiedEmail: true });
        }
      } catch (err) {
        console.error("Verification error", err);
        setIsVerify(false);
        setVerifyMessage("Something went wrong during email verification.");
      } finally {
        setIsLoading(false);
      }
    };

    // wait until session is ready
    if (status !== "loading") {
      verify();
    }
  }, [status, token, update]);

  if (!token || token.length < 1) {
    return <SendVerifyEmail session={session} />;
  }

  return (
    <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-center justify-center pt-10">
      <div className="max-w-lg flex flex-col gap-1">
        <div className="flex flex-col text-lg md:text-2xl">
          {isLoading ? (
            <ThreeCircleLoading
              message="waiting for verification..."
              className="flex items-center justify-center min-h-screen"
            />
          ) : isVerify ? (
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
              <div className="flex items-center gap-2 mt-4 ">
                <LayoutDashboard />
                <Link href={"/dashboard"}>
                  <span className="underline text-sm md:text-lg">
                    Back to Dashboard
                  </span>
                </Link>
              </div>
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
                  : verifyMessage || "Something went wrong. Try again later."}
              </p>
              <div className="flex items-center gap-2 mt-4 ">
                <LayoutDashboard />
                <Link href={"/dashboard"}>
                  <span className="underline text-sm">Back to Dashboard</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
