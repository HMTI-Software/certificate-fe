import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  className?: string;
};
export const TemplateContent = ({ className, children }: Props) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-center items-center w-full h-full  text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};
