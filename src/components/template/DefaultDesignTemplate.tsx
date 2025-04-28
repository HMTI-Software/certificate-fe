import { FormatDate } from "@/lib/functions";
import { createEventSchema } from "@/lib/types/General";
import Image from "next/image";
import { z } from "zod";

type Props = {
  eventData: z.infer<typeof createEventSchema>;
};
export const DefaultDesignTemplate = ({ eventData }: Props) => {
  return (
    <div className="relative mx-auto bg-white rounded-lg shadow-lg overflow-hidden ">
      <div className="bg-slate-100 w-[350px] h-[470px]"></div>
      {/* HEADER */}
      <div className="absolute inset-0 top-2 flex items-start justify-center w-full h-full text-black">
        <h1 className="text-[11px] font-light text-center">
          Nomor Sertifikat: {eventData.eventCertificatePrefixCode}preview
        </h1>
      </div>
      {/* CONTENT */}
      <div className="absolute inset-0 -top-4 flex flex-col justify-center items-center w-full h-full space-y-4">
        <Image
          src={`/dog-image.png`}
          alt="Event Template"
          width={100}
          height={100}
          className="object-cover rounded-full"
          priority
        />
        <div className="flex flex-col items-center">
          <h1 className="text-xl font-extrabold ">
            {eventData.eventStakeholderName}
          </h1>
          <span className="text-[9px] font-light ">PENANDATANGAN</span>
        </div>
        <hr className="text-black w-3/4 bg-black h-[1px]" />
        <div className="flex flex-col items-center">
          <span className="text-sm font-medium">Dalam Kegiatan</span>
          <h1 className="text-lg font-bold text-[#7ad3ff]">
            {eventData.eventTheme}
          </h1>
          <p className="text-[8px] font-medium text-center mx-12 h-10">
            {eventData.eventDescription}
          </p>
        </div>
      </div>
      {/* FOOTER */}
      <div className="absolute inset-0 -top-3 flex flex-col justify-end items-center w-full h-full space-y-1 ">
        <span className="text-[8px] font-medium ">Diselenggarakan oleh : </span>
        <span className="text-[8px] font-medium mx-10 text-center">
          {eventData.eventOrganizer}
        </span>
        <span className="text-[8px] font-medium mx-10 text-center">
          Pada Tanggal{" "}
          {FormatDate({ children: eventData.eventDate, withDay: false })}
        </span>
      </div>
    </div>
  );
};
