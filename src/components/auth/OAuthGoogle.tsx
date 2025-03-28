import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";
import { set } from "zod";

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
  // const handleSubmit = async () => {
  //   await toastPromise(
  //     () =>
  //       new Promise((resolve, reject) => {
  //         setTimeout(() => {
  //           Math.random() > 0.5
  //             ? resolve("Data Saved!")
  //             : reject(new Error("Failed to save data"));
  //         }, 3000);
  //       }),
  //     {
  //       title: "Operation Status",
  //       description: "This is the result of the operation.",
  //       button: {
  //         label: "Dismiss",
  //         onClick: () => console.log("Toast dismissed"),
  //       },
  //     },
  //   );
  // };
  return (
    <div className="flex gap-2 w-full max-w-sm">
      <button
        className="bordered rounded-md w-full justify-center bg-yelloww flex items-center gap-2 text-sm cursor-pointer"
        type="button"
        onClick={() => {
          if (mode === "signIn") {
            const myPromise = new Promise((resolve, reject) => {
              setTimeout(() => {
                const value = Math.random();
                const data = value > 0.5;
                data ? resolve(value) : reject("Data failed!");
              }, 3000);
            });
            toast.promise(myPromise, {
              loading: "Loading...",
              success: (data) => `Data saved: ${data}`,
              error: "Failed to save data",
            });
            console.log("Google Sign In");
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
