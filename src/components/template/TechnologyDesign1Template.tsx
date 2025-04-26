import { FormatDate } from "@/lib/functions";
import { createEventSchema } from "@/lib/types/General";
import Image from "next/image";
import { z } from "zod";

type Props = {
  eventData: z.infer<typeof createEventSchema>;
};
export const TechnologyDesign1Template = ({ eventData }: Props) => {
  return (
    <div className="relative mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <Image
        src={`/template/${eventData.eventTemplate}.png`}
        alt="Event Template"
        width={350}
        height={350}
        className="object-cover"
        priority
      />
      {/* HEADER */}
      <div className="absolute inset-0 top-3 flex items-start justify-center w-full h-full ">
        <h1 className="text-[9px] font-medium text-grayy">
          Nomor Sertifikat: {eventData.eventCertificatePrefixCode}preview
        </h1>
      </div>
      {/* CONTENT */}
      <div className="absolute inset-0 top-13 flex flex-col justify-center items-center w-full h-full space-y-3 text-white">
        <div className="flex flex-col items-center space-y-1">
          <h1 className="text-lg font-bold text-[#62FFFD]">
            {eventData.eventStakeholderName.toUpperCase()}
          </h1>
          <span className="text-[9px] font-extralight">PENANDATANGAN</span>
        </div>
        <h1 className="text-lg font-bold">{eventData.eventName}</h1>
        <p className="text-[9px] font-light text-center mx-12 h-10">
          {eventData.eventDescription}
        </p>
      </div>
      {/* FOOTER */}
      <div className="absolute inset-0 -top-5 flex flex-col justify-end items-center w-full h-full space-y-1 text-white font-extralight text-[10px]">
        <span>Diselenggarakan oleh : </span>
        <span className="mx-10 text-center">{eventData.eventOrganizer}</span>
        <span className="mx-10 text-center">
          Pada Tanggal{" "}
          {FormatDate({ children: eventData.eventDate, withDay: false })}
        </span>
      </div>
    </div>
  );
};
