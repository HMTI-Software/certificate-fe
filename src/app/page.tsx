import { auth } from "@/auth";
import GetStartedButton from "@/components/button/GetStartedButton";
import PricingButton from "@/components/button/PricingButton";
import ContactCard from "@/components/card/ContactCard";
import PricingCard from "@/components/card/PricingCard";
import DashboardView from "@/components/DashboardView";
import LandingPageNavbar from "@/components/LandingPageNavbar";
import { IAdminContact, IPricingPackage } from "@/lib/types/General";
import { BadgeCheck, SquareCheckBig } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/*
  This is the Landing Page Component
  This component will be used as the main page for the website
  CACHING : SSG (Static Site Generation) - This page will be generated at build time
*/
const LandingPage = async () => {
  const session = await auth();

  const pricingPackage: IPricingPackage[] = [
    {
      id: 1,
      packageName: "🥈 Silver Package",
      packageDescription: "Perfect for Small Events",
      packagePrice: 150000,
      packageFeatures: [
        {
          feature: "Create up to 2 events",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "150 Participants each event",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "QR Code generator included",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "Priority support",
          icon: <SquareCheckBig className="text-redd" />,
        },
        {
          feature: "Exclusive email sending (via external app)",
          icon: <SquareCheckBig className="text-redd" />,
        },
      ],
      packageStyle: "bg-[#FFFB86] border-black",
    },
    {
      id: 2,
      packageName: "💎 Platinum Package",
      packageDescription: "Ideal for Medium-Sized Events",
      packagePrice: 300000,
      packageFeatures: [
        {
          feature: "Create up to 4 events",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "300 Participants each event",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "QR Code generator included",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "Priority support (admin help, lag issues, tutorials)",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "Exclusive email sending (via external app)",
          icon: <SquareCheckBig className="text-redd" />,
        },
      ],
      packageStyle: "bg-[#99B2FF] border-black",
    },
    {
      id: 3,
      packageName: "🏆 Gold Package",
      packageDescription: "Best for Large-Scale Events",
      packagePrice: 500000,
      packageFeatures: [
        {
          feature: "Create up to 6 events",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "600 Participants each event",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "QR Code generator included",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "Priority support (admin help, lag issues, tutorials)",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
        {
          feature: "Exclusive email sending (via external app)",
          icon: <SquareCheckBig className="text-[#5AB95F]" />,
        },
      ],
      packageStyle: "bg-[#59FFAC] border-black",
    },
  ];
  const contacts: IAdminContact[] = [
    {
      name: "Deris Firmansyah",
      description: "contact person",
      noTelp: 628123456789,
      igUsername: "@derisfirmansyah",
      adminImage: "/sheep-image.svg",
      cardStyle: "bg-[#99B2FF] snap-center",
      imageStyle:
        "absolute -top-[149px] left-[140px] transform -translate-x-1/2 w-52 h-auto",
    },
    {
      name: "Alif Mahendra",
      description: "contact person",
      noTelp: 628123456789,
      igUsername: "@alifmahendra",
      adminImage: "/dog-image.svg",
      cardStyle: "bg-[#59FFAC] snap-center",
      imageStyle:
        "absolute -top-[190px] left-[180px] transform -translate-x-1/2 w-64 h-auto",
    },
    {
      name: "Fatih Attala",
      description: "contact person",
      noTelp: 628123456789,
      igUsername: "@fatihattala",
      adminImage: "/pig-image.svg",
      cardStyle: "bg-[#FFFB86] snap-center",
      imageStyle:
        "absolute -top-[152px] left-[185px] transform -translate-x-1/2 w-64 h-auto",
    },
  ];
  return (
    <>
      <main>
        <div className="w-full min-h-screen">
          <LandingPageNavbar session={session!} />
          {/* Hero Section */}
          <section
            id="hero"
            className="relative w-full h-auto md:h-auto lg:h-[700px] px-10 md:px-20 lg:px-40 flex flex-col items-center gap-8 pt-28"
          >
            <div className="inline-flex border-1 border-black rounded-lg p-1 px-4 gap-1 items-center">
              <Image
                src="/logo-hmti.png"
                width={20}
                height={20}
                alt="Picture of the author"
              />
              <h1 className="text-xs text-center">hmtiudinusproduct</h1>
            </div>
            <h1 className="text-4xl font-bold flex items-center text-center lg:px-[350px]">
              Easier to Make Certificate for Your Hectic Event
            </h1>
            <p className="text-center text-lg md:text-lg">
              wondering you just focus on your event without thinking in
              certification, think again!
            </p>
            <div className="flex flex-row justify-center gap-3">
              <PricingButton />
              <GetStartedButton />
            </div>
          </section>
          {/* Dashboard Section */}
          <section className="relative w-full h-auto justify-center items-center hidden lg:flex">
            <div className="absolute z-10 px-40">
              <DashboardView session={session!} />
            </div>
            <Image
              src={"/landing-page-bg-1.png"}
              className="object-cover object-center w-full h-full "
              width={1000}
              height={1000}
              alt="landing-page-bg-1"
            />
          </section>
          {/* About Section */}
          <section className="w-full px-10 md:px-40 pb-20 pt-36 md:pt-52">
            <div className="flex flex-col items-center gap-12">
              <span id="about"></span>
              <Image
                src={"/logo-hmti.png"}
                className="object-cover object-center"
                width={130}
                height={130}
                alt="logo-hmti-udinus"
              />
              <h1 className="font-bold text-4xl">About</h1>
              <p className="font-normal text-lg md:text-lg text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam dolore officiis voluptatibus, veritatis minima delectus
                velit? Officiis, aspernatur? Veniam deleniti quibusdam,
                architecto aperiam velit expedita suscipit perferendis voluptate
                at id in nesciunt nobis quaerat ab accusantium rerum quia quam
                ad debitis fuga eius omnis quas animi. Ex repudiandae deserunt
                quis.
              </p>
            </div>
          </section>
          {/* Pricing Section */}
          <section
            className="md:flex w-full px-10 md:px-20 lg:px-40 py-20"
            id="price"
          >
            <div className="flex flex-col items-center gap-4">
              <h1 className="font-bold text-4xl text-center">Pricing</h1>
              <p className="text-center text-lg md:text-lg font-normal pb-7">
                Discover our competitive pricing packages, each designed to
                offer unique features that cater to your event&#39;s specific
                needs. Explore the benefits and find the perfect fit for your
                budget and requirements.
              </p>
              <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-1 md:gap-4">
                {pricingPackage.map((packageData, index) => {
                  return <PricingCard key={index} packageData={packageData} />;
                })}
              </div>
            </div>
          </section>
          {/* Contact Section */}
          <section
            id="contact"
            className="md:block w-full px-10 md:px-20 lg:px-40 py-20"
          >
            <div className="flex flex-col gap-10 md:gap-36">
              <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-4xl">Contact</h1>
                <p className="font-normal text-lg text-center">
                  Contact us to get Something Special from Us
                </p>
              </div>
              {/* Contact Card Desktop*/}
              <div className="hidden md:grid grid-cols-3 gap-5 md:gap-4 lg:gap-10">
                {contacts.map((contact, index) => {
                  return (
                    <ContactCard key={index} contacts={contact}>
                      <Image
                        src={contact.adminImage}
                        width={200}
                        height={250}
                        alt={contact.name}
                        className="relative md:-mt-52 lg:-mt-64 mx-auto "
                      />
                    </ContactCard>
                  );
                })}
              </div>
              {/* Contact Card Mobile */}
              <div className="md:hidden flex flex-col gap-3.5 ">
                {contacts.map((contact, index) => (
                  <ContactCard contacts={contact} key={index}>
                    <Image
                      src={contact.adminImage}
                      width={200}
                      height={100}
                      alt="admin-image"
                      className={contact.imageStyle}
                    />
                  </ContactCard>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Footer Section */}
      <footer className="w-full bg-black text-white px-6 md:px-40 pt-20 pb-5">
        <div className="flex flex-col items-center md:items-start gap-6">
          {/* Logo */}
          <div className="flex flex-row items-center gap-2">
            <BadgeCheck className="mt-[2px]" />
            <h1 className="font-bold text-lg">CertifiedCertification</h1>
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
              <Link href="/#contact" className="text-sm hover:underline">
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
    </>
  );
};

export default LandingPage;
