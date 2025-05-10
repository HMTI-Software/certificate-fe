import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children: React.ReactNode;
};
export const TemplateFooter = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-end items-center w-full h-full space-y-1 text-white font-light tracking-wider text-center",
        className,
      )}
    >
      {children}
    </div>
  );
};
