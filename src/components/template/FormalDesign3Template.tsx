import { FormatDate } from "@/lib/functions";
import { createEventSchema } from "@/lib/types/General";
import Image from "next/image";
import { z } from "zod";

type Props = {
  eventData: z.infer<typeof createEventSchema>;
};
export const FormalDesign3Template = ({ eventData }: Props) => {
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

      {/* CONTENT */}
      <div className="absolute inset-0 top-15 flex flex-col justify-center items-center w-full h-full space-y-1 ">
        <h1 className="text-xl font-extrabold ">
          {eventData.eventStakeholderName}
        </h1>
        <span className="text-[9px] font-light ">PENANDATANGAN</span>
        <span className="text-sm font-medium">Dalam Kegiatan</span>
        <h1 className="text-lg font-extrabold text-[#7ad3ff]">
          {eventData.eventName}
        </h1>
        <p className="text-[8px] font-medium text-center mx-12 h-10">
          {eventData.eventDescription}
        </p>
      </div>
      {/* FOOTER */}
      <div className="absolute inset-0 -top-15 flex flex-col justify-end items-center w-full h-full space-y-1 ">
        <span className="text-[8px] font-medium ">Diselenggarakan oleh : </span>
        <span className="text-[8px] font-medium mx-10 text-center">
          {eventData.eventOrganizer}
        </span>
        <span className="text-[8px] font-medium mx-10 text-center">
          Pada Tanggal{" "}
          {FormatDate({ children: eventData.eventDate, withDay: false })}
        </span>
      </div>
      <div className="absolute inset-0 -top-1 flex items-end justify-center w-full h-full ">
        <h1 className="text-[8px] font-medium text-white text-center">
          Nomor Sertifikat :<br></br>
          <span>{eventData.eventCertificatePrefixCode}preview</span>
        </h1>
      </div>
    </div>
  );
};
