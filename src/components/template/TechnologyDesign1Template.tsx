"use client";

import { FormatDate } from "@/lib/functions";
import { IEventParticipantCertificate } from "@/lib/types/Event";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../ui/card";

type Props = {
  participantCertificateData?: IEventParticipantCertificate;
  mode: "CREATE/EDIT" | "PREVIEW" | "VIEW";
};

export const TechnologyDesign1Template = ({
  participantCertificateData,
  mode,
}: Props) => {
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
          src={`/template/${
            participantCertificateData.eventTemplate || "default"
          }.png`}
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
        <div className="absolute inset-0 flex flex-col justify-center py-3 md:py-3 px-15">
          {/* HEADER */}
          <div
            className={cn(
              "flex flex-col justify-center items-center gap-3",
              mode === "CREATE/EDIT"
                ? participantCertificateData.logoFirst
                  ? "mb-5 md:mb-5"
                  : "mb-12"
                : mode === "PREVIEW"
                ? participantCertificateData.logoFirst
                  ? "mb-5 md:mb-10"
                  : "mb-12"
                : "mb-5 md:mb-10",
            )}
          >
            {/* CERTIFICATE NUMBER */}
            <h1
              className={cn(
                mode === "CREATE/EDIT"
                  ? "text-[6px] md:text-[7px]"
                  : mode === "PREVIEW"
                  ? "text-[8px] md:text-[10px]"
                  : "text-[9px] md:text-xs",
                "font-medium",
                "text-grayy",
                "tracking-wider",
              )}
            >
              Nomor Sertifikat:{" "}
              {mode === "VIEW"
                ? participantCertificateData.certificateNumber
                : participantCertificateData.certificateNumber.slice(0, -1) +
                  "PREVIEW"}
            </h1>
            <div className="flex flex-row justify-between items-center w-full">
              <div
                className={cn(
                  mode === "CREATE/EDIT"
                    ? "w-[50px] h-[50px]"
                    : mode === "PREVIEW"
                    ? "w-[60px] h-[60px]"
                    : "w-[60px] h-[60px]",
                )}
              >
                {participantCertificateData.logoFirst ? (
                  <Image
                    src={
                      participantCertificateData.logoFirst instanceof FileList
                        ? URL.createObjectURL(
                            participantCertificateData.logoFirst[0] as Blob,
                          )
                        : "https://certificate-be-production.up.railway.app" +
                          participantCertificateData.logoFirst
                    }
                    width={50}
                    height={50}
                    alt="Logo First"
                    className={cn(
                      "object-cover object-center  mx-auto",
                      mode === "CREATE/EDIT"
                        ? "w-[35px] h-auto md:w-[40px] md:h-auto"
                        : mode === "PREVIEW"
                        ? "w-[35px] h-auto md:w-[60px] md:h-auto"
                        : "w-[50px] h-auto md:w-[60px] md:h-auto",
                    )}
                    priority
                  />
                ) : (
                  <div className="w-[50px] h-[50px] invisible" />
                )}
              </div>
              <div
                className={cn(
                  mode === "CREATE/EDIT"
                    ? "w-[50px] h-[50px]"
                    : mode === "PREVIEW"
                    ? "w-[60px] h-[60px]"
                    : "w-[60px] h-[60px]",
                )}
              >
                {participantCertificateData.logoSecond ? (
                  <Image
                    src={
                      participantCertificateData.logoSecond instanceof FileList
                        ? URL.createObjectURL(
                            participantCertificateData.logoSecond[0] as Blob,
                          )
                        : "https://certificate-be-production.up.railway.app" +
                          participantCertificateData.logoFirst
                    }
                    width={50}
                    height={50}
                    alt="Logo Second"
                    className={cn(
                      "object-cover object-center  mx-auto",
                      mode === "CREATE/EDIT"
                        ? "w-[35px] h-auto md:w-[40px] md:h-auto"
                        : mode === "PREVIEW"
                        ? "w-[35px] h-auto md:w-[60px] md:h-auto"
                        : "w-[50px] h-auto md:w-[60px] md:h-auto",
                    )}
                    priority
                  />
                ) : (
                  <div className="w-[50px] h-[50px] invisible" />
                )}
              </div>
            </div>
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
                    ? "w-21 h-21 md:w-20 md:h-20"
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
                  : "mt-7",
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
                {participantCertificateData.eventName.toUpperCase()}
              </h1>
              {/* EVENT THEME */}
              <p
                className={cn(
                  "font-medium text-center h-10 max-w-sm",
                  mode === "CREATE/EDIT"
                    ? "text-[9px] md:text-[9px]"
                    : mode === "PREVIEW"
                    ? "text-[9px] md:text-xs"
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
              "flex flex-col justify-end items-center w-full h-full space-y-1 text-white font-light tracking-wider",
              mode === "CREATE/EDIT"
                ? "text-[6px] md:text-[8px]"
                : mode === "PREVIEW"
                ? "text-[9px] md:text-xs"
                : "text-[9px] md:text-xs",
            )}
          >
            <span>Diselenggarakan oleh : </span>
            <span className="text-center">
              {participantCertificateData.organizer}
            </span>
            <span className="text-center">
              Pada Tanggal{" "}
              {participantCertificateData.activityAt
                ? FormatDate({
                    children: participantCertificateData.activityAt,
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
