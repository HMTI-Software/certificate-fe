import { Suspense } from "react";
import ResetPasswordPage from "@/components/auth/ResetPasswordPages";

export default function Page() {
  return (
    <Suspense>
      <ResetPasswordPage />
    </Suspense>
  );
}
