import { auth } from "@/auth";
import { VerifyEmail } from "@/components/auth/verify-email/VerifyEmail";
import { IAuthSession } from "@/lib/types/Auth";
import { LayoutDashboard, MailCheck } from "lucide-react";
import Link from "next/link";
const VerifyEmailPage = async () => {
  const session: IAuthSession | null = await auth();
  return (
    <>
      {session?.user.isVerifiedEmail ? (
        <div className="w-full py-6 md:py-0 px-10 md:px-20 lg:px-40 flex flex-col items-center justify-start md:justify-center min-h-screen ">
          <MailCheck size={100} className="text-black w-[70px] md:w-[100px]" />
          <h1 className="text-2xl font-bold">Email already verified</h1>
          <p className="text-sm md:text-lg text-gray-600">
            You have already verified your email.
          </p>
          <div className="flex items-center gap-2 mt-4 ">
            <LayoutDashboard />
            <Link href={"/dashboard"}>
              <span className="underline ">Back to Dashboard</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full py-6 md:py-0 px-10 md:px-20 lg:px-40 min-h-screen flex flex-col items-center md:justify-center">
          <VerifyEmail session={session!} />
        </div>
      )}
    </>
  );
};

export default VerifyEmailPage;
