"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { submitRequestVerify } from "@/actions/mutation/auth/submitRequestVerify";

const ResendEmailButton = ({ token }: { token: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = () => {
    setIsLoading(true);
    toast.promise(submitRequestVerify(token), {
      loading: "Sending email...",
      success: (data) => {
        if (data.message) {
          return "Verification email sent successfully";
        }
        throw new Error("Failed to send verification email");
      },
      error: (error) => error.message,
      finally: () => setIsLoading(false),
    });
  };

  return (
    <Button
      onClick={handleResendEmail}
      variant="outline"
      size="sm"
      className="h-6 px-2 py-0 text-xs bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800"
      disabled={isLoading}
    >
      <AlertCircle className="h-3 w-3 mr-1" />
      {isLoading ? "Sending..." : "Not Verified"}
    </Button>
  );
};

export default ResendEmailButton;
