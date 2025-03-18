import { NextResponse } from "next/server";
import QRCode from "qrcode";
import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";

const qrDir = path.join(process.cwd(), "public", "qrcodes"); // Save in 'public/qrcodes'

// Ensure directory exists
if (!fs.existsSync(qrDir)) {
  fs.mkdirSync(qrDir, { recursive: true });
}

export async function POST(req: Request) {
  try {
    const { texts, owner } = await req.json();
    if (!Array.isArray(texts) || texts.length === 0) {
      return NextResponse.json({ error: "Texts array is required" }, { status: 400 });
    }

    const zip = new AdmZip();
    const qrFiles: string[] = [];

    for (const text of texts) {
      const fileName = `qrcode-${Date.now()}.png`;
      const filePath = path.join(qrDir, fileName);

      await QRCode.toFile(filePath, text, {
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      });

      qrFiles.push(filePath);
      zip.addLocalFile(filePath);
    }

    const zipPath = path.join(qrDir, "qrcodes.zip");
    zip.writeZip(zipPath);

    return NextResponse.json({ zipUrl: `/qrcodes/qrcodes.zip`, qrFiles });
  } catch (error) {
    console.error("QR Code ZIP Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate QR codes" }, { status: 500 });
  }
}
