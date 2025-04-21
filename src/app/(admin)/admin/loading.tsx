import ThreeCircleLoading from "@/components/animation/ThreeCircleLoading";

const LoadingAdminPage = () => {
  return (
    <div className="flex items-center justify-center w-full mt-52">
      <ThreeCircleLoading message="loading users data" />
    </div>
  );
};

export default LoadingAdminPage;
