"use client";
import { useState } from "react";
import LoadingCircle from "../animation/LoadingCircle";
import Image from "next/image";

type QRCodeProps = {
  qrCodeSource: string;
  alt: string;
};
export const QRCodeImage = ({ qrCodeSource, alt }: QRCodeProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  return (
    <div className="w-full h-full flex items-center justify-center">
      {isLoading && <LoadingCircle />}
      <Image
        src={"https://certificate-be-production.up.railway.app" + qrCodeSource}
        alt={alt}
        width={60}
        height={60}
        className={`rounded-md transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
      />
    </div>
  );
};
