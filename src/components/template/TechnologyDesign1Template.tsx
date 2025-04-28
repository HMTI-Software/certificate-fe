"use client";

import { FormatDate } from "@/lib/functions";
import { IEventData, IEventParticipantCertificate } from "@/lib/types/Event";
import { createEventSchema } from "@/lib/types/General";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Card, CardContent } from "../ui/card";

type Props = {
  participantCertificateData?: IEventParticipantCertificate;
  mode: "CREATE/EDIT" | "PREVIEW" | "VIEW";
};

export const TechnologyDesign1Template = ({
  participantCertificateData,
  mode,
}: Props) => {
  if (!participantCertificateData) {
    return <div>Certificate data not found</div>;
  }
  const [certificateData, setCertificateData] =
    useState<IEventParticipantCertificate>(participantCertificateData);

  const [stakeholderData, setStakeholderData] = useState<{
    name: string;
    photoPath: string | null;
    position: string;
  }>({
    name: participantCertificateData.stakeholders.name,
    photoPath: participantCertificateData.stakeholders.photoPath,
    position: participantCertificateData.stakeholders.position,
  });
  return (
    <Card>
      <CardContent className="relative mx-auto overflow-hidden flex flex-col items-center justify-center w-full h-full ">
        {/* BACKGROUND IMAGE */}
        <Image
          src={`/template/${certificateData.eventTemplate}.png`}
          alt="Event Template"
          width={465}
          height={465}
          className={cn(
            "object-center",
            "object-cover",
            "mx-auto",
            mode === "CREATE/EDIT"
              ? "w-[300px] h-[450px]"
              : mode === "PREVIEW"
              ? "w-[300px] h-[500px] md:w-[400px] md:h-[600px]"
              : "w-[300px] h-[500px] md:w-[400px] md:h-[600px]",
          )}
          priority
        />
        <div className="absolute inset-0 flex flex-col justify-center py-5">
          {/* HEADER */}
          <div className={cn("inline-flex justify-center mb-21 md:mb-26")}>
            <h1
              className={cn(
                mode === "CREATE/EDIT"
                  ? "text-[9px]"
                  : mode === "PREVIEW"
                  ? "text-[8px] md:text-xs"
                  : "text-[10px] md:text-xs",
                "font-medium",
                "text-grayy",
                "tracking-wider",
              )}
            >
              Nomor Sertifikat:{" "}
              {mode === "VIEW"
                ? certificateData.certificateNumber
                : certificateData.certificateNumber.slice(0, -1) + "PREVIEW"}
            </h1>
          </div>
          {/* END HEADER */}

          {/* CONTENT */}
          <div
            className={cn(
              "flex flex-col justify-center items-center w-full h-full space-y-6 text-white",
            )}
          >
            {stakeholderData.photoPath === null || undefined ? (
              <div className="w-full h-full flex items-center justify-center  text-gray-500 font-bold rounded-full bg-transparent">
                <span className="text-white">
                  {stakeholderData.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
            ) : (
              <Image
                src={
                  "https://certificate-be-production.up.railway.app" +
                  stakeholderData.photoPath
                }
                width={108}
                height={108}
                className={cn(
                  "object-cover object-center rounded-full m-auto",
                  mode === "CREATE/EDIT"
                    ? ""
                    : mode === "PREVIEW"
                    ? "w-23 h-23 md:w-27 md:h-27"
                    : "w-22 h-22 md:w-27 md:h-27",
                )}
                alt={stakeholderData.name.slice(0, 2)}
              />
            )}
            <div className="flex flex-col items-center space-y-1 mt-10">
              <h1
                className={cn(
                  "font-bold text-[#62FFFD] tracking-wider",
                  mode === "CREATE/EDIT"
                    ? ""
                    : mode === "PREVIEW"
                    ? "text-[18px] md:text-lg"
                    : "text-sm md:text-lg",
                )}
              >
                {stakeholderData.name.toUpperCase()}
              </h1>
              <span
                className={cn(
                  "font-light",
                  "text-gray-300",
                  mode === "CREATE/EDIT"
                    ? ""
                    : mode === "PREVIEW"
                    ? "text-[9px] md:text-[10px]"
                    : "text-[9px] md:text-xs",
                )}
              >
                PENANDATANGAN
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              <h1
                className={cn(
                  "font-extrabold",
                  mode === "CREATE/EDIT"
                    ? ""
                    : mode === "PREVIEW"
                    ? "text-lg md:text-2xl"
                    : "text-lg md:text-2xl",
                )}
              >
                {certificateData.eventName.toUpperCase()}
              </h1>
              <p
                className={cn(
                  "font-medium text-center mx-12 h-10 max-w-sm",
                  mode === "CREATE/EDIT"
                    ? ""
                    : mode === "PREVIEW"
                    ? "text-[9px] "
                    : "text-[9px] md:text-xs",
                )}
              >
                {participantCertificateData.eventTheme.toUpperCase()}
              </p>
            </div>
          </div>
          {/* END CONTENT */}

          {/* FOOTER */}
          <div
            className={cn(
              "flex flex-col justify-end items-center w-full h-full space-y-1 text-white font-medium tracking-wider text-[9px] md:text-xs",
            )}
          >
            <span>Diselenggarakan oleh : </span>
            <span className="mx-10 text-center">
              {certificateData.organizer}
            </span>
            <span className="mx-10 text-center">
              Pada Tanggal{" "}
              {FormatDate({
                children: certificateData.activityAt,
                withDay: false,
              })}
            </span>
          </div>

          {/* END FOOTER */}
        </div>
      </CardContent>
    </Card>
  );
};
