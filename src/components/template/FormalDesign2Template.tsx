"use client";

import { FormatDate } from "@/lib/functions";
import { IEventParticipantCertificate } from "@/lib/types/Event";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";
import { TemplateHeader } from "./components/TemplateHeader";
import { TemplateCertificateNumber } from "./components/TemplateCertificateNumber";
import { TemplateEventLogo } from "./components/TemplateEventLogo";
import { TemplateContent } from "./components/TemplateContent";
import { TemplateStakeholderImage } from "./components/TemplateStakeholderImage";
import { TemplateStakeholderName } from "./components/TemplateStakeholderName";
import { TemplateEventName } from "./components/TemplateEventName";
import { TemplateEventTheme } from "./components/TemplateEventTheme";
import { TemplateFooter } from "./components/TemplateFooter";

type Props = {
  participantCertificateData?: IEventParticipantCertificate;
  mode: "CREATE/EDIT" | "PREVIEW" | "VIEW";
};

export const FormalDesign2Template = ({
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
    <div
      className={cn(
        mode === "CREATE/EDIT"
          ? "w-[280px] h-[400px] md:w-[300px] md:h-[450px]"
          : mode === "PREVIEW"
          ? "w-[300px] h-[450px] md:w-[500px] md:h-[750px]"
          : "w-[350px] h-[500px] md:w-[490px] md:h-[700px]",
      )}
    >
      <div className="relative mx-auto overflow-hidden flex flex-col items-center justify-center w-full h-full">
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
            "w-full h-full",
          )}
          priority
        />
        <div
          className={cn(
            "absolute inset-0 flex flex-col justify-center",
            mode === "CREATE/EDIT"
              ? "py-[4px] pb-4 md:py-[5px] md:pb-[20px] px-7 md:px-7"
              : mode === "PREVIEW"
              ? "py-[5px] pb-5 md:py-[7px] md:pb-[30px] px-8 md:px-13"
              : "py-[5px] pb-5 md:py-[7px] md:pb-[30px] px-8 md:px-13",
          )}
        >
          {/* HEADER */}
          <TemplateHeader
            className={cn(
              mode === "CREATE/EDIT"
                ? participantCertificateData.logoFirst ||
                  participantCertificateData.logoSecond
                  ? stakeholderData.photoPath
                    ? "mb-[40px] md:mb-[46px]"
                    : "mb-[40px] md:mb-[44px]"
                  : stakeholderData.photoPath
                  ? "mb-7 md:mb-[14.2px]"
                  : "mb-[41px] md:mb-[43px]"
                : mode === "PREVIEW"
                ? participantCertificateData.logoFirst ||
                  participantCertificateData.logoSecond
                  ? stakeholderData.photoPath
                    ? "mb-[42px] md:mb-[83px]"
                    : "mb-[40px] md:mb-[80px]"
                  : stakeholderData.photoPath
                  ? "mb-[42px] md:mb-[83px]"
                  : "mb-10 md:mb-20"
                : participantCertificateData.logoFirst ||
                  participantCertificateData.logoSecond
                ? stakeholderData.photoPath
                  ? "mb-[47px] md:mb-[71px]"
                  : "mb-[46px] md:mb-[69px]"
                : stakeholderData.photoPath
                ? "mb-[47px] md:mb-[71px]"
                : "mb-[46px] md:mb-17",
              mode === "CREATE/EDIT"
                ? "gap-8 md:gap-9"
                : mode === "PREVIEW"
                ? "gap-10 md:gap-15"
                : "gap-11 md:gap-14",
            )}
          >
            <TemplateCertificateNumber
              participantCertificateData={participantCertificateData}
              mode={mode}
              className={cn(
                mode === "CREATE/EDIT"
                  ? "text-[7px] md:text-[8px]"
                  : mode === "PREVIEW"
                  ? "text-[7.7px] md:text-[13px]"
                  : "text-[9px] md:text-[13px]",
                "font-[400] font-ramaraja",
                "text-white tracking-widest",
              )}
              onlyCertificateNumber={false}
            />
            <div className="flex flex-row justify-between items-center w-full">
              <TemplateEventLogo
                participantCertificateData={participantCertificateData}
                className={
                  mode === "CREATE/EDIT"
                    ? "w-[40px] h-[40px] md:w-[45px] md:h-[45px]"
                    : mode === "PREVIEW"
                    ? "w-[45px] h-[45px] md:w-[70px] md:h-[70px]"
                    : "w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
                }
                logo="first"
              />
              <TemplateEventLogo
                participantCertificateData={participantCertificateData}
                className={
                  mode === "CREATE/EDIT"
                    ? "w-[35px] h-[35px] md:w-[45px] md:h-[45px]"
                    : mode === "PREVIEW"
                    ? "w-[45px] h-[45px] md:w-[70px] md:h-[70px]"
                    : "w-[50px] h-[50px] md:w-[70px] md:h-[70px]"
                }
                logo="second"
              />
            </div>
          </TemplateHeader>
          {/* END HEADER */}

          {/* CONTENT */}
          <TemplateContent
            className={
              mode === "CREATE/EDIT"
                ? "space-y-3"
                : mode === "PREVIEW"
                ? "space-y-2 md:space-y-5"
                : "space-y-2 md:space-y-6"
            }
          >
            {/* STAKEHOLDER IMAGE */}
            <TemplateStakeholderImage
              stakeholderData={stakeholderData}
              classNameNoPhotoPath={
                mode === "CREATE/EDIT"
                  ? "w-18 h-18 md:w-21 md:h-21"
                  : mode === "PREVIEW"
                  ? "w-21 h-21 md:w-34 md:h-34"
                  : "w-22 h-22 md:w-33 md:h-33"
              }
              classNamePhotoPath={
                mode === "CREATE/EDIT"
                  ? "w-18 h-18 md:w-20 md:h-20"
                  : mode === "PREVIEW"
                  ? "w-20 h-20 md:w-33 md:h-33"
                  : "w-22 h-22 md:w-31 md:h-31"
              }
            />
            {/* END STAKEHOLDER IMAGE */}
            {/* STAKEHOLDER DATA */}
            <div
              className={cn(
                "flex flex-col items-center space-y-2",
                stakeholderData.photoPath === null
                  ? mode === "CREATE/EDIT"
                    ? stakeholderData.photoPath
                      ? "mt-8 md:mt-9"
                      : "mt-1 md:mt-1"
                    : mode === "PREVIEW"
                    ? "mt-[10px] md:mt-4"
                    : "mt-4 md:mt-[3px]"
                  : mode === "CREATE/EDIT"
                  ? "mt-4 md:mt-5"
                  : mode === "PREVIEW"
                  ? "mt-5 md:mt-10"
                  : "mt-6 md:mt-9",
              )}
            >
              {/* STAKEHOLDER NAME */}
              <TemplateStakeholderName
                stakeholderData={stakeholderData}
                className={cn(
                  mode === "CREATE/EDIT"
                    ? "text-[11px] md:text-[13px]"
                    : mode === "PREVIEW"
                    ? "text-[12px] md:text-xl"
                    : "text-[13px] md:text-xl",
                  "text-black font-roboto-condensed font-bold mb-1",
                )}
              />
              {/* END STAKEHOLDER NAME */}
              <span
                className={cn(
                  "font-medium font-roboto-condensed",
                  "text-grayy",
                  mode === "CREATE/EDIT"
                    ? "text-[7px] md:text-[8px]"
                    : mode === "PREVIEW"
                    ? "text-[7px] md:text-xs"
                    : "text-[9px] md:text-xs",
                  "tracking-widest ",
                )}
              >
                PENANDATANGAN
              </span>
            </div>
            {/* END STAKEHOLDER DATA */}
            {/* EVENT DATA */}
            <div className="flex flex-col items-center space-y-[1px]">
              <span
                className={cn(
                  "font-[400] font-roboto-condensed",
                  "text-black",
                  mode === "CREATE/EDIT"
                    ? "text-[9px] md:text-[11px]"
                    : mode === "PREVIEW"
                    ? "text-[11px] md:text-[18px]"
                    : "text-xs md:text-[18px]",
                )}
              >
                Dalam Kegiatan
              </span>
              {/* EVENT NAME */}
              <TemplateEventName
                participantCertificateData={participantCertificateData}
                className={cn(
                  mode === "CREATE/EDIT"
                    ? "text-xs md:text-sm"
                    : mode === "PREVIEW"
                    ? "text-lg md:text-3xl"
                    : "text-lg md:text-2xl",
                  "text-[#3F9AC9] font-roboto-condensed",
                )}
              />
              {/* END EVENT NAME */}
              {/* EVENT THEME */}
              <TemplateEventTheme
                participantCertificateData={participantCertificateData}
                className={cn(
                  mode === "CREATE/EDIT"
                    ? "text-[6px] md:text-[8px]"
                    : mode === "PREVIEW"
                    ? "text-[8px] md:text-sm"
                    : "text-[9px] md:text-xs",
                  "font-[400] tracking-[1px] text-black",
                )}
              />
              {/* END EVENT THEME */}
            </div>
            {/* END EVENT DATA */}
          </TemplateContent>
          {/* END CONTENT */}

          {/* FOOTER */}
          <TemplateFooter
            className={cn(
              mode === "CREATE/EDIT"
                ? "text-[7px] md:text-[8px]"
                : mode === "PREVIEW"
                ? "text-[7px] md:text-xs"
                : "text-[9px] md:text-xs",
              "text-black",
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
          </TemplateFooter>
          {/* END FOOTER */}
        </div>
      </div>
    </div>
  );
};
