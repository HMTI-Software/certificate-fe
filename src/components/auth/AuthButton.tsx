import { userSignOut } from "@/actions/signOut";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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
}: {
  isLoading?: boolean;
  mode: "signIn" | "signUp" | "forgotPassword" | "resetPassword" | "signOut";
}) => {
  const router = useRouter();
  const handleSignOut = () => {
    toast.promise(userSignOut, {
      loading: "Signing out...",
      success: () => {
        router.push("/auth/sign-in");
        return "Successfully signed out!";
      },
      error: "Failed to sign out",
    });
  };
  if (mode === "signOut") {
    return (
      <Button
        className="mt-3 bordered w-full bg-redd hover:bg-redd/90"
        onClick={() => handleSignOut()}
      >
        log out
      </Button>
    );
  }
  return (
    <button
      className="bordered bg-purplee rounded-md hover:bg-purplee cursor-pointer"
      type="submit"
      disabled={isLoading}
    >
      {isLoading
        ? "Loading..."
        : mode == "signIn"
        ? "Sign In"
        : mode == "signUp"
        ? "Sign Up"
        : mode == "forgotPassword"
        ? "Send Email"
        : "Reset Password"}
    </button>
  );
};

export default AuthButton;
