import ThreeCircleLoading from "@/components/animation/ThreeCircleLoading";

const LoadingCertificatePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <ThreeCircleLoading message="waiting for event data" />
    </div>
  );
};

export default LoadingCertificatePage;
