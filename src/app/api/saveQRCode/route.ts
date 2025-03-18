import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import QRCode from "qrcode";

export async function POST(req: Request) {
  try {
    const { text, owner } = await req.json()
    if (!text) return NextResponse.json({ error: "Text is required" }, { status: 400 })

    const fileName = `${owner} - QR Code - ${Date.now()}.png`
    const filePath = path.join(process.cwd(), "public/qrcodes", fileName)

    await QRCode.toFile(filePath, text, {
      margin: 2,
      color: { dark: "#000000", light: "#ffffff" },
    });

    setTimeout(() => {
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting QR Code:", err);
        else console.log(`Deleted QR Code: ${fileName}`);
      });
    }, 30000)

    return NextResponse.json({ url: `/qrcodes/${fileName}`, fileName })
  } catch (error) {
    console.error("QR Code Generation Error:", error)
    return NextResponse.json({ error: "Failed to generate QR code" }, { status: 500 })
  }
}
