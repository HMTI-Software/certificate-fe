import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  stakeholderData: {
    name: string;
    photoPath: string | null;
    position: string;
  };
};
export const TemplateStakeholderName = ({
  className,
  stakeholderData,
}: Props) => {
  return (
    <h1 className={cn("font-bold  tracking-widest text-center", className)}>
      {stakeholderData.name.toUpperCase()}
    </h1>
  );
};
