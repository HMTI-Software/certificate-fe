import { IEventData } from "@/lib/Interface";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { FormatDate } from "@/lib/functions";

const EventCard = ({ event }: { event: IEventData }) => {
  return (
    <Link href={"/dashboard/" + event.uid} key={event.uid}>
      <Card className="bordered py-4 border-b-4 hover:border-b cursor-pointer">
        <div className="aspect-[7/2] p-0 w-full rounded-md border-black overflow-hidden border">
          <Image
            src="/eventbg-1.jpg"
            alt="Event Background"
            width={1000}
            height={500}
            className="object-cover object-center h-full w-full"
          />
        </div>
        <div className="flex flex-col items-start">
          <div className="badge mb-2">{event.eventName}</div>
          <h1 className="font-bold text-xl mb-4">{event.eventName}</h1>
          <p className="text-grayy text-sm">
            <FormatDate>{event.activityAt}</FormatDate>
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default EventCard;
