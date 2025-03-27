import ForgotPasswordForm from "@/components/auth/forgot-password/ForgotPasswordForm";

const ForgotPasswordPage = () => {
  return (
    <div className="w-full py-6 md:py-0 px-10 md:px-20 lg:px-40 min-h-screen flex flex-col items-center md:justify-center">
      <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-start">
        <div className="max-w-sm flex flex-col gap-1 mb-3">
          <b className="text-xl">Forgot Password</b>
          <p className="text-sm">
            Please enter your email address to receive a link to reset your
            account password.
          </p>
        </div>
        <ForgotPasswordForm />
        <div className="flex gap-2 w-full items-start max-w-sm py-6">
          <p className="text-xs">
            * We will send you an email to reset your password
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
