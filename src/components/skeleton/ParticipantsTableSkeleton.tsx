import { Skeleton } from "../ui/skeleton";

const ParticipantsTableSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3 mt-3">
      <div className="flex flex-row space-x-3">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-1/3 " />
      </div>
      <Skeleton className="h-20 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <Skeleton className="h-10 w-full rounded-xl" />
      <div className="flex flex-row justify-between items-center">
        <Skeleton className="h-8 w-8" />
        <div className="flex flex-row space-x-3">
          <Skeleton className="h-8 w-36" />
          <Skeleton className="h-8 w-32" />
        </div>
      </div>
    </div>
  );
};

export default ParticipantsTableSkeleton;
