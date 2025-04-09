import { auth } from "@/auth";
import { VerifyEmail } from "@/components/auth/verify-email/VerifyEmail";

const VerifyEmailPage = async () => {
  const session = await auth();
  const token = session?.token;
  return (
    <div className="w-full py-6 md:py-0 px-10 md:px-20 lg:px-40 min-h-screen flex flex-col items-center md:justify-center">
      <VerifyEmail token={token!} />
    </div>
  );
};

export default VerifyEmailPage;
