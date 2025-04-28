import { cn } from "@/lib/utils";

const ThreeCircleLoading = ({
  message = "loading data",
  className = "",
}: {
  message?: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "w-full",
        "flex",
        "flex-col",
        "items-center",
        "justify-center",
        className,
      )}
    >
      <div className="flex gap-2 mb-2">
        <div className="rounded-full aspect-square h-10 animate-bounce bg-greenn bordered-nonhover"></div>
        <div className="rounded-full aspect-square h-10 animate-bounce delay-100 bg-purplee bordered-nonhover"></div>
        <div className="rounded-full aspect-square h-10 animate-bounce delay-200 bg-redd bordered-nonhover"></div>
      </div>
      <h1 className="">{message}</h1>
    </div>
  );
};

export default ThreeCircleLoading;
