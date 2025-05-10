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

export const TechnologyDesign3Template = ({
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
              ? "py-2 md:py-2 px-7 md:px-8"
              : mode === "PREVIEW"
              ? "py-2 md:py-4 px-8 md:px-13"
              : "py-3 md:py-4 px-10 md:px-14",
          )}
        >
          {/* HEADER */}
          <TemplateHeader
            className={cn(
              mode === "CREATE/EDIT"
                ? participantCertificateData.logoFirst ||
                  participantCertificateData.logoSecond
                  ? stakeholderData.photoPath
                    ? "mb-2 md:mb-4"
                    : "mb-4 md:mb-6"
                  : stakeholderData.photoPath
                  ? "mb-7 md:mb-12"
                  : "mb-4 md:mb-6"
                : mode === "PREVIEW"
                ? participantCertificateData.logoFirst ||
                  participantCertificateData.logoSecond
                  ? stakeholderData.photoPath
                    ? "mb-4 md:mb-8"
                    : "mb-7 md:mb-12"
                  : stakeholderData.photoPath
                  ? "mb-12 md:mb-24"
                  : "mb-7 md:mb-8"
                : participantCertificateData.logoFirst ||
                  participantCertificateData.logoSecond
                ? stakeholderData.photoPath
                  ? "mb-4 md:mb-5"
                  : "mb-7 md:mb-10"
                : stakeholderData.photoPath
                ? "mb-12 md:mb-12"
                : "mb-7 md:mb-10",
              mode === "CREATE/EDIT"
                ? "gap-5 md:gap-5"
                : mode === "PREVIEW"
                ? "gap-5 md:gap-8"
                : "gap-5 md:gap-8",
            )}
          >
            <TemplateCertificateNumber
              participantCertificateData={participantCertificateData}
              mode={mode}
              className={cn(
                mode === "CREATE/EDIT"
                  ? "text-[10px] md:text-[11px]"
                  : mode === "PREVIEW"
                  ? "text-[11px] md:text-[17px]"
                  : "text-[12px] md:text-[17px]",
                "font-medium font-roboto-condensed",
                "text-white tracking-widest",
              )}
              onlyCertificateNumber={true}
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
                  ? "w-21 h-21 md:w-20 md:h-20"
                  : mode === "PREVIEW"
                  ? "w-21 h-21 md:w-34 md:h-34"
                  : "w-22 h-22 md:w-27 md:h-27"
              }
              classNamePhotoPath={
                mode === "CREATE/EDIT"
                  ? "w-21.5 h-21.5 md:w-24 md:h-24"
                  : mode === "PREVIEW"
                  ? "w-24 h-24 md:w-41 md:h-41"
                  : "w-27 h-27 md:w-38 md:h-38"
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
                      : "mt-1 md:mt-4"
                    : mode === "PREVIEW"
                    ? "mt-4 md:mt-10"
                    : "mt-5 md:mt-7"
                  : mode === "CREATE/EDIT"
                  ? "mt-5 md:mt-5"
                  : mode === "PREVIEW"
                  ? "mt-6 md:mt-9"
                  : "mt-7 md:mt-7",
              )}
            >
              {/* STAKEHOLDER NAME */}
              <TemplateStakeholderName
                stakeholderData={stakeholderData}
                className={cn(
                  mode === "CREATE/EDIT"
                    ? "text-[11px] md:text-sm"
                    : mode === "PREVIEW"
                    ? "text-xs md:text-2xl"
                    : "text-[16px] md:text-2xl",
                  "text-white font-roboto-condensed",
                )}
              />
              {/* END STAKEHOLDER NAME */}
              <span
                className={cn(
                  "font-light font-roboto-condensed",
                  "text-gray-300",
                  mode === "CREATE/EDIT"
                    ? "text-[8px] md:text-[9px]"
                    : mode === "PREVIEW"
                    ? "text-[9px] md:text-xs"
                    : "text-[9px] md:text-xs",
                  "tracking-widest ",
                )}
              >
                PENANDATANGAN
              </span>
            </div>
            {/* END STAKEHOLDER DATA */}
            {/* EVENT DATA */}
            <div className="flex flex-col items-center">
              <span
                className={cn(
                  "font-light font-roboto-condensed",
                  "text-white",
                  mode === "CREATE/EDIT"
                    ? "text-[12px] md:text-[14px]"
                    : mode === "PREVIEW"
                    ? "text-[9px] md:text-[18px]"
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
                    ? "text-sm md:text-sm"
                    : mode === "PREVIEW"
                    ? "text-sm md:text-2xl"
                    : "text-sm md:text-2xl",
                  "text-[#3D92C4] font-roboto-condensed",
                )}
              />
              {/* END EVENT NAME */}
              {/* EVENT THEME */}
              <TemplateEventTheme
                participantCertificateData={participantCertificateData}
                className={cn(
                  mode === "CREATE/EDIT"
                    ? "text-[8px] md:text-[9px]"
                    : mode === "PREVIEW"
                    ? "text-[9px] md:text-xs"
                    : "text-[10px] md:text-xs",
                  "font-light tracking-[1px]",
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
                ? "text-[6px] md:text-[8px] mb-3 md:mb-4"
                : mode === "PREVIEW"
                ? "text-[7px] md:text-xs mb-4 md:mb-5"
                : "text-[9px] md:text-xs mb-4 md:mb-5",
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
