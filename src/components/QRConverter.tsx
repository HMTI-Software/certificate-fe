"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeProps {
  children: string;
  width?: string; // Custom width (e.g., "200px", "100%", "10rem")
  height?: string; // Custom height (optional)
  margin?: number; // Margin in QR code generation (not CSS)
  color?: string; // Hex color for QR dots
  background?: string; // Hex color for QR background
  className?: string; // Custom Tailwind or CSS class
  onGenerate?: (qrCode: string) => void;
}

const TextToQR = ({
  children,
  width = "200px",
  height,
  margin = 2,
  color = "#000000",
  background = "#ffffff",
  className = "",
  onGenerate, 
}: QRCodeProps) => {
  const [qrCode, setQrCode] = useState<string>("");

  useEffect(() => {
    const generateQR = async () => {
      if (children) {
        const options = {
          margin: margin,
          color: {
            dark: color,
            light: background,
          },
        };

        try {
          const dataUrl = await QRCode.toDataURL(children, options);
          setQrCode(dataUrl);
          if ( onGenerate ) onGenerate(dataUrl);
        } catch (error) {
          console.error("Error generating QR Code:", error);
        }
      }
    };

    generateQR();
  }, [children, margin, color, background, onGenerate]);

  return qrCode ? (
    <img
      src={qrCode}
      alt="QR Code"
      style={{
        width: width,
        height: height || "auto", // Default to aspect-ratio scaling
      }}
      className={className}
    />
  ) : null;
};

export default TextToQR;
