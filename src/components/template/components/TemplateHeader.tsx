import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export const TemplateHeader = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center gap-3",
        className,
      )}
    >
      {children}
    </div>
  );
};
