/**
 * AuthButton component for sign in and sign up button.
 *
 * @component
 * @param {Object} props - The props object.
 * @param {boolean} [props.isLoading] - The loading state of the button.
 * @param {"signIn" | "signUp" | "forgotPassword" | "resetPassword"} props.mode - The mode of the button.
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
  mode: "signIn" | "signUp" | "forgotPassword" | "resetPassword";
}) => {
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
