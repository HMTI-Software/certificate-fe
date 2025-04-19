"use client";

import Cropper from "react-easy-crop";
import { useState, useCallback } from "react";
import { getCroppedImg } from "@/lib/functions";
import { Button } from "@/components/ui/button";

export default function ImageCropper({
  imageSrc,
  onCropDone,
}: {
  imageSrc: string;
  onCropDone: (blob: Blob, previewUrl: string) => void;
}) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCrop = async () => {
    const { blob, previewUrl } = await getCroppedImg(
      imageSrc,
      croppedAreaPixels!,
    );
    onCropDone(blob, previewUrl);
  };

  return (
    <div className="relative w-full h-[400px] bg-white">
      <Cropper
        image={imageSrc}
        crop={crop}
        zoom={zoom}
        aspect={1} // Avatar = 1:1
        onCropChange={setCrop}
        onZoomChange={setZoom}
        onCropComplete={onCropComplete}
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col">
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
        <Button
          onClick={handleCrop}
          className="bordered bg-greenn hover:bg-greenn/90 border-b-4 hover:border-b-1 text-black w-full mt-3"
        >
          crop image
        </Button>
      </div>
    </div>
  );
}
