import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { signIn } from "@/auth";
import { useRouter } from "next/navigation";
/**
 * Component OAuthGoogle for Google OAuth button.
 *
 * @component
 * @param {Object} props - Objek properti.
 * @param {"signIn" | "signUp"} [props.mode] - Mode tombol OAuth.
 *        Jika "signIn", tombol akan mencetak "Google Sign In" saat diklik.
 *        Jika "signUp", tombol akan mencetak "Google Sign Up" saat diklik.
 *
 * @example
 * // Menampilkan tombol OAuth Google untuk sign in
 * <OAuthGoogle mode="signIn" />
 *
 * @example
 * // Menampilkan tombol OAuth Google untuk sign up
 * <OAuthGoogle mode="signUp" />
 *
 * @returns {JSX.Element} Komponen tombol yang sudah diberi gaya untuk OAuth Google.
 */
const OAuthGoogle = ({ mode }: { mode?: "signIn" | "signUp" }) => {
  const router = useRouter();
  const handleSubmit = async () => {
    await signIn("google");
  };
  return (
    <div className="flex gap-2 w-full max-w-sm">
      <button
        className="bordered rounded-md w-full justify-center bg-yelloww flex items-center gap-2 text-sm cursor-pointer"
        type="button"
        onClick={() => {
          if (mode === "signIn") {
            toast.promise(handleSubmit, {
              loading: "Signing with Google...",
              success: () => {
                return "Successfully signed in with Google!";
              },
              error: "Failed to save data",
            });
          } else {
            console.log("Google Sign Up");
          }
        }}
      >
        <FcGoogle />
        Google
      </button>
    </div>
  );
};

export default OAuthGoogle;
