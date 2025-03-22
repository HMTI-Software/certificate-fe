import ContactCard from "@/components/card/ContactCard";
import PricingCard from "@/components/card/PricingCard";
import DashboardView from "@/components/DashboardView";
import LandingPageNavbar from "@/components/LandingPageNavbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BadgeCheck, BookMarked, SquareCheckBig, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type featureType = {
  feature: string;
  icon: React.ReactNode;
};
export interface IPricingPackage {
  packageName: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: featureType[];
  packageStyle: string;
}

interface IAdminContact {
  name: string;
  description: string;
  noTelp: number;
  igUsername: string;
  adminImage: string;
  cardStyle?: string;
  imageStyle?: string;
}

const Home = async () => {
  const pricingPackage: IPricingPackage[] = [
    {
      packageName: "Furina Package",
      packageDescription:
        "The Lowest Package, Suitable for Small Event with Low Budget",
      packagePrice: 100000,
      packageFeatures: [
        {
          feature: "The Offer 1",
          icon: <SquareCheckBig className="text-green-500" />,
        },
        {
          feature: "The Offer 2",
          icon: <SquareCheckBig className="text-red-500" />,
        },
        {
          feature: "The Offer 3",
          icon: <SquareCheckBig className="text-red-500" />,
        },
        {
          feature: "The Offer 4",
          icon: <SquareCheckBig className="text-red-500" />,
        },
        {
          feature: "The Offer 5",
          icon: <SquareCheckBig className="text-red-500" />,
        },
      ],
      packageStyle: "bg-[#FFFB86] border-black",
    },
    {
      packageName: "Klee Package",
      packageDescription:
        "The Most Worth Package, Suitable for Medium Event with Medium Budget",
      packagePrice: 350000,
      packageFeatures: [
        {
          feature: "The Offer 1",
          icon: <SquareCheckBig className="text-green-500" />,
        },
        {
          feature: "The Offer 2",
          icon: <SquareCheckBig className="text-green-500" />,
        },
        {
          feature: "The Offer 3",
          icon: <SquareCheckBig className="text-red-500" />,
        },
        {
          feature: "The Offer 4",
          icon: <SquareCheckBig className="text-red-500" />,
        },
        {
          feature: "The Offer 5",
          icon: <SquareCheckBig className="text-red-500" />,
        },
      ],
      packageStyle: "bg-[#99B2FF] border-black",
    },
    {
      packageName: "Diluc Package",
      packageDescription:
        "The Most Expensive Package, Suitable for Large Event with High Budget",
      packagePrice: 500000,
      packageFeatures: [
        {
          feature: "The Offer 1",
          icon: <SquareCheckBig className="text-green-500" />,
        },
        {
          feature: "The Offer 2",
          icon: <SquareCheckBig className="text-green-500" />,
        },
        {
          feature: "The Offer 3",
          icon: <SquareCheckBig className="text-green-500" />,
        },
        {
          feature: "The Offer 4",
          icon: <SquareCheckBig className="text-green-500" />,
        },
        {
          feature: "The Offer 5",
          icon: <SquareCheckBig className="text-green-500" />,
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
      adminImage: "/sheep-image.png",
      cardStyle: "bg-[#99B2FF]",
      imageStyle:
        "absolute -top-[149px] left-[140px] transform -translate-x-1/2 w-52 h-auto",
    },
    {
      name: "Alif Mahendra",
      description: "contact person",
      noTelp: 628123456789,
      igUsername: "@alifmahendra",
      adminImage: "/dog-image.png",
      cardStyle: "bg-[#59FFAC]",
      imageStyle:
        "absolute -top-[190px] left-[180px] transform -translate-x-1/2 w-64 h-auto",
    },
    {
      name: "Fatih Attala",
      description: "contact person",
      noTelp: 628123456789,
      igUsername: "@fatihattala",
      adminImage: "/pig-image.png",
      cardStyle: "bg-[#FFFB86]",
      imageStyle:
        "absolute -top-[152px] left-[185px] transform -translate-x-1/2 w-64 h-auto",
    },
  ];
  return (
    <>
      <main>
        <div className="w-full min-h-screen">
          <LandingPageNavbar />
          {/* Hero Section */}
          <section
            id="hero"
            className="relative w-full h-[700px] px-40 flex flex-col items-center gap-8 pt-28"
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
            <h1 className="text-4xl font-bold w-[500px] flex items-center text-center">
              Easier to Make Certificate for Your Hectic Event
            </h1>
            <p className="w-[500px] text-center">
              wondering you just focus on your event without thinking in
              certification, think again!
            </p>
            <div className="flex flex-row justify-center gap-3">
              <Button
                className="bordered bg-[#59FFAC] hover:bg-[#59FFAC/90] text-black"
                size={"lg"}
              >
                pricing <Tag />
              </Button>
              <Button
                className="bordered bg-[#99B2FF] hover:bg-[#99B2FF/90] text-black"
                size={"lg"}
              >
                get started <BookMarked />
              </Button>
            </div>
          </section>
          <div className="relative flex justify-center items-center">
            <div className="absolute z-10 px-40">
              <DashboardView />
            </div>
            <Image
              src={"/landing-page-bg-1.png"}
              className="object-cover object-center w-full h-full "
              width={1000}
              height={1000}
              alt="landing-page-bg-1"
            />
          </div>
          {/* About Section */}
          <section id="about" className="w-full px-40 pt-72 pb-36">
            <div className="flex flex-col items-center gap-12">
              <Image
                src={"/logo-hmti.png"}
                className="object-cover object-center"
                width={130}
                height={130}
                alt="logo-hmti-udinus"
              />
              <h1 className="font-bold text-4xl">About</h1>
              <p className="font-normal text-sm text-center">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Temporibus dignissimos aperiam facere tenetur, nulla harum
                minima modi eveniet, vero doloremque architecto quidem quam
                numquam ullam repellendus accusantium natus sed rem cupiditate
                velit nihil. At consequuntur tempora aliquam sit blanditiis ea,
                dolore, velit voluptate aliquid quas repellat fuga quo hic
                tempore odit ad expedita, maiores a! Numquam in illo aspernatur,
                porro repudiandae exercitationem dolorem vel distinctio
                consectetur laudantium, corporis repellat quo quisquam est ipsa
                quaerat obcaecati reiciendis! Expedita, eligendi harum qui
                magnam laudantium, iusto tempore odit atque totam ad quidem
                aperiam quisquam placeat eum minima dolorum numquam sequi est
                temporibus odio?
              </p>
            </div>
          </section>
          {/* Pricing Section */}
          <section id="price" className="w-full px-40 pb-32">
            <div className="flex flex-col items-center gap-3">
              <h1 className="font-bold text-4xl">Pricing</h1>
              <p className="text-center text-sm font-normal pb-7">
                Discover our competitive pricing packages, each designed to
                offer unique features that cater to your event's specific needs.
                Explore the benefits and find the perfect fit for your budget
                and requirements.
              </p>
              <div className="w-full grid grid-cols-3 gap-1">
                {pricingPackage.map((packageData, index) => {
                  return <PricingCard key={index} packageData={packageData} />;
                })}
              </div>
            </div>
          </section>
          {/* Contact Section */}
          <section id="contact" className="w-full px-40 pb-32">
            <div className="grid grid-rows-2 gap-10">
              <div className="flex flex-col items-center gap-2">
                <h1 className="font-bold text-4xl">Contact</h1>
                <p className="font-normal text-sm text-center">
                  Contact us to get Something Special from Us
                </p>
              </div>
              <div className="grid grid-cols-3 gap-5">
                {contacts.map((contact, index) => {
                  return (
                    <ContactCard
                      key={index}
                      name={contact.name}
                      description={contact.description}
                      callNumber={contact.noTelp.toString()}
                      instagram={contact.igUsername}
                      cardStyle={contact.cardStyle}
                    >
                      <Image
                        src={contact.adminImage}
                        width={200}
                        height={100}
                        alt="admin-image"
                        className={contact.imageStyle}
                      />
                    </ContactCard>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </main>
      {/* Footer Section */}
      <footer className="w-full bg-black text-white px-40 py-10">
        <div className="grid grid-rows-3">
          <div className="inline-flex flex-row items-start gap-2">
            <BadgeCheck className="mt-[2px]" />
            <h1 className="font-bold text-lg">CertifiedCertification</h1>
          </div>
          <div className="flex flex-row justify-between gap-10">
            <div className="flex flex-row gap-8">
              <Link href="/#about">About</Link>
              <Link href="/#price">Price</Link>
              <Link href="/#contact">Contact</Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Contact</h1>
              <Link href="/#contact" className="text-sm">
                Contact Us (HMTI)
              </Link>
              <Link href="/#contact" className="text-sm">
                Contact Person
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Social Media</h1>
              <Link href="/#contact" className="text-sm">
                Instagramn
              </Link>
              <Link href="/#contact" className="text-sm">
                Whatsapp
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Docs</h1>
              <Link href="/docs" className="text-sm">
                Docs
              </Link>
              <Link href="/docs" className="text-sm">
                API
              </Link>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center p-2">
            <p className="font-bold text-sm text-white">
              &copy; 2025 CertifiedCertification HMTI Team. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Home;
