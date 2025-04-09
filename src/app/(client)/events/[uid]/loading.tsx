const LoadingSpesificEvent = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center pt-40">
      <div className="flex gap-2 mb-2">
        <div className="rounded-full aspect-square h-10 animate-bounce bg-greenn bordered-nonhover"></div>
        <div className="rounded-full aspect-square h-10 animate-bounce delay-100 bg-purplee bordered-nonhover"></div>
        <div className="rounded-full aspect-square h-10 animate-bounce delay-200 bg-redd bordered-nonhover"></div>
      </div>
      <h1 className="">Loading Data</h1>
    </div>
  );
};

export default LoadingSpesificEvent;
