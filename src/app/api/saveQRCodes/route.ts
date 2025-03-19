import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import QRCode from "qrcode";
import archiver from "archiver";

export async function POST(req: Request) {
  try {
    const { texts, owner, name } = await req.json();
    if (!texts || !owner || texts.length !== owner.length) {
      return NextResponse.json({ error: "Invalid input data" }, { status: 400 });
    }

    const zipFileName = `${name} - Participants QRCodes - ${Date.now()}.zip`;
    const zipFilePath = path.join(process.cwd(), "public/qrcodes", zipFileName);

    // Ensure directory exists
    const qrDir = path.join(process.cwd(), "public/qrcodes");
    if (!fs.existsSync(qrDir)) fs.mkdirSync(qrDir, { recursive: true });

    const archive = archiver("zip", { zlib: { level: 9 } });
    const zipStream = fs.createWriteStream(zipFilePath);

    archive.pipe(zipStream);

    // Generate QR Codes
    for (let i = 0; i < texts.length; i++) {
      const fileName = `${owner[i]} - QR Code - ${Date.now()}.png`;
      const filePath = path.join(qrDir, fileName);

      await QRCode.toFile(filePath, texts[i], {
        margin: 2,
        color: { dark: "#000000", light: "#ffffff" },
      });

      archive.file(filePath, { name: fileName });

      // Delete the QR Code after 1 min
      setTimeout(() => fs.unlink(filePath, () => {}), 60000);
    }

    await archive.finalize();

    // Delete zip after 2 minutes
    setTimeout(() => fs.unlink(zipFilePath, () => {}), 120000);

    return NextResponse.json({ url: `/qrcodes/${zipFileName}`, fileName: zipFileName });
  } catch (error) {
    console.error("QR Code Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate QR codes" }, { status: 500 });
  }
}
