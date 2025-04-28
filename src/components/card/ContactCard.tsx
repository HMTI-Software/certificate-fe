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
import { IAdminContact } from "@/lib/types/General";
import Link from "next/link";

interface ContactCardProps {
  contacts: IAdminContact;
  children?: React.ReactNode;
}

const ContactCard = ({ contacts, children }: ContactCardProps) => {
  return (
    <Card
      className={`relative bordered border-b-6 border-r-6 ${contacts.cardStyle} flex flex-col md:flex-row justify-between md:justify-normal md:block gap-3 `}
    >
      <CardHeader className="hidden md:block md:pt-16 lg:pt-24">
        {children}
        <Separator orientation={"horizontal"} className="bg-black" />
      </CardHeader>
      <CardContent className="flex flex-row md:flex-col justify-between py-0 md:py-2 lg:pb-4 px-2 md:px-4 lg:px-6">
        <CardTitle>{contacts.name}</CardTitle>
        <CardDescription className="text-gray-700">
          {contacts.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex flex-row items-center justify-between gap-1 px-2 md:px-4 lg:px-6">
        <div className="inline-flex gap-1 items-center">
          <Image
            src={"/icon/whatsapp.svg"}
            width={18}
            height={18}
            alt="whatsapp-icon"
          />
          <Link
            href={`https://wa.me/${contacts.noTelp}`}
            className="cursor-pointer hover:underline"
          >
            <span className="text-sm">{contacts.noTelp}</span>
          </Link>
        </div>
        <div className="inline-flex gap-1 items-center">
          <Image
            src={"/icon/instagram.svg"}
            width={18}
            height={18}
            alt="instagram-icon"
          />
          <span className="text-sm">{contacts.igUsername}</span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ContactCard;
