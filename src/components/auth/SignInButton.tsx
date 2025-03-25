import { Button } from "@/components/ui/button";

const SignInButton = () => {
  return (
    <Button
      onClick={() => console.log("Sign in")}
      className="bg-white text-black"
    />
  );
};

export default SignInButton;
