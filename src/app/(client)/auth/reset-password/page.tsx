import ResetPasswordForm from "@/components/auth/reset-password/ResetPasswordForm";

const ResetPasswordPage = () => {
  return (
    <div className="w-full py-6 md:py-0 px-10 md:px-20 lg:px-40 min-h-screen flex flex-col items-center md:justify-center">
      <div className="min-w-sm flex flex-col border-black p-4 rounded-lg items-start">
        <div className="max-w-sm flex flex-col mb-5 gap-1">
          <b className="text-xl">Reset Password</b>
          <p className="text-sm ">
            Please enter your new password to reset your account password.
          </p>
        </div>
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;
