import { submitRequestVerify } from "@/actions/submitRequestVerify";
import LoadingCircle from "@/components/animation/LoadingCircle";
import { Button } from "@/components/ui/button";
import { IAuthSession } from "@/lib/types/Auth";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type SendVerifyEmailProps = {
  session: IAuthSession;
};
export const SendVerifyEmail = ({ session }: SendVerifyEmailProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleResendEmail = () => {
    setIsLoading(true);
    try {
      toast.promise(submitRequestVerify(session.token!), {
        loading: "Sending email...",
        success: (data) => {
          if (data.message) {
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
    }
  };
  return (
    <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-start gap-3">
      <div className="max-w-lg flex flex-col gap-1">
        <b className="text-xl">Send Verification Link</b>
        <p className="text-sm">
          Please check your email inbox and click on the verification link to
          confirm your email address.
        </p>
      </div>
      <Button
        onClick={() => handleResendEmail()}
        disabled={isLoading}
        className="bordered bg-greenn hover:bg-greenn/90 hover:border-b-1 border-b-4 border-black text-black w-full"
      >
        {isLoading ? (
          <>
            <LoadingCircle />
            <span>Sending...</span>
          </>
        ) : (
          <>
            <MailCheck size={18} />
            <span>Send Verification Email</span>
          </>
        )}
      </Button>
      <p className="text-xs text-gray-600">
        If you don't see the email in your inbox, please check your spam or junk
        folder.
      </p>
    </div>
  );
};
