import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import Image from "next/image";

interface ContactCardProps {
  name: string;
  description: string;
  callNumber: string;
  instagram: string;
  children?: React.ReactNode;
  cardStyle?: string;
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

const ContactCard = ({
  name,
  description,
  callNumber,
  instagram,
  children,
  cardStyle,
}: ContactCardProps) => {
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
    <Card
      className={`relative bordered border-b-4 hover:border-b-1 ${cardStyle}`}
    >
      <CardHeader className="pt-26">
        {children}
        <Separator orientation={"horizontal"} className="bg-black" />
      </CardHeader>
      <CardContent className="py-0">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-gray-700">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-row justify-between w-full py-0">
        <div className="inline-flex gap-2 items-center">
          <Image src={"/icon/whatsapp.svg"} width={18} height={18} alt="test" />
          <span className="text-sm">{callNumber}</span>
        </div>
        <div className="inline-flex gap-2 items-center">
          <Image
            src={"/icon/instagram.svg"}
            width={18}
            height={18}
            alt="test"
          />
          <span className="text-sm">{instagram}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
