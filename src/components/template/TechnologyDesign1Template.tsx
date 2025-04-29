"use client";

import { FormatDate } from "@/lib/functions";
import { IEventParticipantCertificate } from "@/lib/types/Event";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { Card, CardContent } from "../ui/card";

type Props = {
  participantCertificateData?: IEventParticipantCertificate;
  mode: "CREATE/EDIT" | "PREVIEW" | "VIEW";
};

export const TechnologyDesign1Template = ({
  participantCertificateData,
  mode,
}: Props) => {
  const [certificateData] = useState<IEventParticipantCertificate | undefined>(
    participantCertificateData,
  );

  const [stakeholderData] = useState<
    | {
        name: string;
        photoPath: string | null;
        position: string;
      }
    | undefined
  >(
    participantCertificateData
      ? {
          name: participantCertificateData.stakeholders.name,
          photoPath: participantCertificateData.stakeholders.photoPath,
          position: participantCertificateData.stakeholders.position,
        }
      : undefined,
  );

  if (!participantCertificateData || !stakeholderData) {
    return (
      <div className="flex items-center justify-center w-full h-full p-4 text-gray-500 font-bold rounded-lg bg-transparent">
        <span>Certificate data not available</span>
      </div>
    );
  }

  return (
    <Card>
      <CardContent className="relative mx-auto overflow-hidden flex flex-col items-center justify-center w-full h-full ">
        {/* BACKGROUND IMAGE */}
        <Image
          src={`/template/${certificateData?.eventTemplate || "default"}.png`}
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
          <div
            className={cn(
              "inline-flex justify-center",
              mode === "CREATE/EDIT"
                ? "mb-21 md:mb-26"
                : mode === "PREVIEW"
                ? "mb-21 md:mb-26"
                : "mb-21 md:mb-26",
            )}
          >
            {/* CERTIFICATE NUMBER */}
            <h1
              className={cn(
                mode === "CREATE/EDIT"
                  ? "text-[6px] md:text-[8px]"
                  : mode === "PREVIEW"
                  ? "text-[8px] md:text-[10px]"
                  : "text-[10px] md:text-xs",
                "font-medium",
                "text-grayy",
                "tracking-wider",
              )}
            >
              Nomor Sertifikat:{" "}
              {mode === "VIEW"
                ? certificateData?.certificateNumber
                : certificateData?.certificateNumber.slice(0, -1) + "PREVIEW"}
            </h1>
          </div>
          {/* END HEADER */}

          {/* CONTENT */}
          <div
            className={cn(
              "flex flex-col justify-center items-center w-full h-full  text-white",
              mode === "CREATE/EDIT"
                ? "space-y-4"
                : mode === "PREVIEW"
                ? "space-y-6"
                : "space-y-6",
            )}
          >
            {/* STAKEHOLDER IMAGE */}
            {stakeholderData.photoPath === null || undefined ? (
              <div
                className={cn(
                  "flex items-center justify-center  text-gray-500 font-bold rounded-full bg-transparent",
                  mode === "CREATE/EDIT"
                    ? ""
                    : mode === "PREVIEW"
                    ? "w-23 h-23 md:w-27 md:h-27"
                    : "w-22 h-22 md:w-27 md:h-27",
                )}
              >
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
                  "flex items-center justify-center object-cover object-center rounded-full m-auto",
                  mode === "CREATE/EDIT"
                    ? ""
                    : mode === "PREVIEW"
                    ? "w-23 h-23 md:w-27 md:h-27"
                    : "w-22 h-22 md:w-27 md:h-27",
                )}
                alt={stakeholderData.name.slice(0, 2)}
              />
            )}
            <div
              className={cn(
                "flex flex-col items-center space-y-1",
                stakeholderData.photoPath === null
                  ? mode === "CREATE/EDIT"
                    ? "mt-10"
                    : "mt-2"
                  : "mt-10",
              )}
            >
              {/* STAKEHOLDER NAME */}
              <h1
                className={cn(
                  "font-bold text-[#62FFFD] tracking-wider",
                  mode === "CREATE/EDIT"
                    ? "text-xs md:text-xs"
                    : mode === "PREVIEW"
                    ? "text-xs md:text-sm"
                    : "text-xs md:text-sm",
                )}
              >
                {stakeholderData.name.toUpperCase()}
              </h1>
              <span
                className={cn(
                  "font-light",
                  "text-gray-300",
                  mode === "CREATE/EDIT"
                    ? "text-[9px] md:text-[9px]"
                    : mode === "PREVIEW"
                    ? "text-[9px] md:text-[10px]"
                    : "text-[9px] md:text-xs",
                  "tracking-widest",
                )}
              >
                PENANDATANGAN
              </span>
            </div>
            <div className="flex flex-col items-center space-y-2">
              {/* EVENT NAME */}
              <h1
                className={cn(
                  "font-extrabold",
                  mode === "CREATE/EDIT"
                    ? "text-xs md:text-sm"
                    : mode === "PREVIEW"
                    ? "text-lg md:text-2xl"
                    : "text-lg md:text-2xl",
                )}
              >
                {certificateData?.eventName.toUpperCase()}
              </h1>
              {/* EVENT THEME */}
              <p
                className={cn(
                  "font-medium text-center mx-12 h-10 max-w-sm",
                  mode === "CREATE/EDIT"
                    ? "text-[9px] md:text-[9px]"
                    : mode === "PREVIEW"
                    ? "text-[9px] md:text-xs"
                    : "text-[9px] md:text-xs",
                )}
              >
                {certificateData?.eventTheme.toUpperCase()}
              </p>
            </div>
          </div>
          {/* END CONTENT */}

          {/* FOOTER */}
          <div
            className={cn(
              "flex flex-col justify-end items-center w-full h-full space-y-1 text-white font-medium tracking-wider",
              mode === "CREATE/EDIT"
                ? "text-[6px] md:text-[8px]"
                : mode === "PREVIEW"
                ? "text-[9px] md:text-xs"
                : "text-[9px] md:text-xs",
            )}
          >
            <span>Diselenggarakan oleh : </span>
            <span className="mx-10 text-center">
              {certificateData?.organizer}
            </span>
            <span className="mx-10 text-center">
              Pada Tanggal{" "}
              {certificateData?.activityAt
                ? FormatDate({
                    children: certificateData.activityAt,
                    withDay: false,
                  })
                : "Date not available"}
            </span>
          </div>

          {/* END FOOTER */}
        </div>
      </CardContent>
    </Card>
  );
};
