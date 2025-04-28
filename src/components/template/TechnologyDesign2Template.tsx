import { FormatDate } from "@/lib/functions";
import { createEventSchema } from "@/lib/types/General";
import Image from "next/image";
import { z } from "zod";

type Props = {
  eventData: z.infer<typeof createEventSchema>;
};
export const TechnologyDesign2Template = ({ eventData }: Props) => {
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
      <div className="absolute inset-0 top-[6px] flex items-start justify-center w-full h-full ">
        <h1 className="text-[9px] font-medium text-white text-center">
          Nomor Sertifikat :{" "}
          <span>{eventData.eventCertificatePrefixCode}preview</span>
        </h1>
      </div>

      {/* CONTENT */}
      <div className="absolute inset-0 top-20 flex flex-col justify-center items-center w-full h-full space-y-4 text-white">
        <div className="flex flex-col items-center space-y-1">
          <h1 className="text-xl font-bold">
            {eventData.eventStakeholderName}
          </h1>
          <span className="text-[9px] font-light text-slate-300">
            PENANDATANGAN
          </span>
        </div>
        <div className="flex flex-col items-center space-y-1">
          <span className="text-xs font-light">Dalam Kegiatan</span>
          <h1 className="text-lg font-bold text-[#7ad3ff]">
            {eventData.eventTheme}
          </h1>
          <p className="text-[8px] font-light text-center mx-12 h-10">
            {eventData.eventDescription}
          </p>
        </div>
      </div>
      {/* FOOTER */}
      <div className="absolute inset-0 -top-3 flex flex-col justify-end items-center w-full h-full space-y-1 text-white font-light">
        <span className="text-[8px]">Diselenggarakan oleh : </span>
        <span className="text-[8px] mx-10 text-center">
          {eventData.eventOrganizer}
        </span>
        <span className="text-[8px] mx-10 text-center">
          Pada Tanggal{" "}
          {FormatDate({ children: eventData.eventDate, withDay: false })}
        </span>
      </div>
    </div>
  );
};
