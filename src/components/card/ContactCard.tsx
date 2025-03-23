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

const ContactCard = ({
  name,
  description,
  callNumber,
  instagram,
  children,
  cardStyle,
}: ContactCardProps) => {
  return (
    <Card
      className={`relative bordered border-b-4 hover:border-b-1 ${cardStyle} flex flex-row justify-between md:justify-normal md:block `}
    >
      <CardHeader className="hidden md:block pt-26">
        {children}
        <Separator orientation={"horizontal"} className="bg-black" />
      </CardHeader>
      <CardContent className="py-0 md:py-4">
        <CardTitle>{name}</CardTitle>
        <CardDescription className="text-gray-700">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-col md:flex-row items-start md:justify-between gap-1 ">
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
