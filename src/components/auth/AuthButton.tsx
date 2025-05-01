"use client";

import { userSignOut } from "@/actions/mutation/auth/signOut";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import LoadingCircle from "../animation/LoadingCircle";
import { LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AuthButton component for sign in and sign up button.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {boolean} [props.isLoading] - The loading state of the button.
 * @param {"signIn" | "signUp" | "forgotPassword" | "resetPassword" | "signOut"} props.mode - The mode of the button.
 *
 * @example
 * // Display a sign in button
 * <AuthButton mode="signIn" />
 *
 * @example
 * // Display a sign up button
 * <AuthButton mode="signUp" />
 *
 * @returns {JSX.Element} A styled button for sign in or sign up.
 **/
const AuthButton = ({
  isLoading,
  mode,
  className,
}: {
  isLoading?: boolean;
  mode: "signIn" | "signUp" | "forgotPassword" | "resetPassword" | "signOut";
  className?: string;
}) => {
  const router = useRouter();
  const handleSignOut = () => {
    toast.promise(userSignOut, {
      loading: "Signing out...",
      success: () => {
        router.push("/");
        return "Successfully signed out!";
      },
      error: "Failed to sign out",
    });
  };
  if (mode === "signOut") {
    return (
      <Button
        className={cn(
          "bordered w-full bg-redd hover:bg-redd/90 text-black",
          className,
        )}
        onClick={() => handleSignOut()}
        disabled={isLoading}
      >
        <span className="my-auto">
          {isLoading ? (
            <LoadingCircle />
          ) : (
            <div className="inline-flex items-center gap-1">
              log out
              <LogOut />
            </div>
          )}
        </span>
      </Button>
    );
  }
  return (
    <button
      className="bordered bg-purplee rounded-md hover:bg-purplee cursor-pointer"
      type="submit"
      disabled={isLoading}
    >
      {isLoading ? (
        <LoadingCircle />
      ) : mode == "signIn" ? (
        "sign in"
      ) : mode == "signUp" ? (
        "sign up"
      ) : mode == "forgotPassword" ? (
        "send email"
      ) : (
        "reset password"
      )}
    </button>
  );
};

export default AuthButton;
