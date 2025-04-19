import QRcode from "qrcode";
export const FormatDate = ({
  children,
  withDay,
}: {
  children: string;
  withDay?: boolean;
}) => {
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = new Date(children);
  const dayName = days[date.getUTCDay()];
  const day = date.getUTCDate();
  const monthName = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();

  if (!withDay) return `${day} ${monthName} ${year}`;
  return `${dayName} ${day} ${monthName} ${year}`;
};

export const textToQR = async (children: string) => {
  const qrCodeString = await QRcode.toDataURL(children);
  return `<img src=${qrCodeString} alt="QR Code" />`;
};

export const getCroppedImg = async (imageSrc: string, cropArea: any) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  const { width, height, x, y } = cropArea;
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, x, y, width, height, 0, 0, width, height);

  return new Promise<{ blob: Blob; previewUrl: string }>((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        const previewUrl = URL.createObjectURL(blob);
        resolve({ blob, previewUrl });
      }
    });
  });
};

const createImage = (url: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
  });
};
