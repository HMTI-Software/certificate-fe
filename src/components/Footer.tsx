import { BadgeCheck } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-white px-6 md:px-40 pt-20 pb-5">
      <div className="flex flex-col items-center md:items-start gap-6">
        {/* Logo */}
        <div className="flex flex-row items-center gap-2">
          <BadgeCheck className="mt-[2px]" />
          <h1 className="font-bold text-lg uppercase">Certify</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 w-full text-center md:text-left">
          {/* Menu */}
          <div className="flex flex-row md:items-start md:justify-normal justify-center gap-2">
            <Link href="/#about" className="text-sm hover:underline">
              About
            </Link>
            <Link href="/#price" className="text-sm hover:underline">
              Price
            </Link>
            <Link href="/#contact" className="text-sm hover:underline">
              Contact
            </Link>
          </div>
          {/* Contact */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Contact</h1>
            <Link href="/#contact" className="text-sm hover:underline">
              Contact Us (HMTI)
            </Link>
            <Link href="/#contact" className="text-sm hover:underline">
              Contact Person
            </Link>
          </div>
          {/* Social Media */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Social Media</h1>
            <Link
              href="https://www.instagram.com/hmtiudinus?igsh=dWh5aGo4ZmYzZDhw"
              className="text-sm hover:underline"
            >
              Instagram
            </Link>
            <Link href="/#contact" className="text-sm hover:underline">
              WhatsApp
            </Link>
          </div>
          {/* Docs */}
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-xl">Docs</h1>
            <Link href="/docs" className="text-sm hover:underline">
              Docs
            </Link>
            <Link href="/docs" className="text-sm hover:underline">
              API
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center pt-8">
        <h1 className="text-sm text-center mt-4">
          ©2025 HMTI Software Team. All rights reserved.
        </h1>
      </div>
    </footer>
  );
};

export default Footer;
