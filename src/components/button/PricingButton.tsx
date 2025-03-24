"use client";
import { Button } from "@/components/ui/button";
import { Tag } from "lucide-react";
import { useRouter } from "next/navigation";
const PricingButton = () => {
  const router = useRouter();
  return (
    <Button
      className="bordered bg-[#59FFAC] hover:bg-[#59FFAC/90] text-black"
      size={"lg"}
      onClick={() => router.push("/#price")}
    >
      pricing <Tag />
    </Button>
  );
};

export default PricingButton;
