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
