"use client";
import { Button } from "@/components/ui/button";
import { BookMarked } from "lucide-react";
import { useRouter } from "next/navigation";
const GetStartedButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bordered bg-[#99B2FF] hover:bg-[#99B2FF/90] text-black"
      size={"lg"}
      onClick={() => router.push("/docs")}
    >
      get started <BookMarked />
    </Button>
  );
};

export default GetStartedButton;
