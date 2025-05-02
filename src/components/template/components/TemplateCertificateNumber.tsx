import { IEventParticipantCertificate } from "@/lib/types/Event";
import { cn } from "@/lib/utils";

type Props = {
  participantCertificateData: IEventParticipantCertificate;
  mode: "CREATE/EDIT" | "PREVIEW" | "VIEW";
  className?: string;
};
export const TemplateCertificateNumber = ({
  participantCertificateData,
  mode,
  className,
}: Props) => {
  return (
    <h1 className={cn(className)}>
      Nomor Sertifikat:{" "}
      {mode === "VIEW"
        ? participantCertificateData.certificateNumber
        : participantCertificateData.certificateNumber.slice(0, -1) + "PREVIEW"}
    </h1>
    //   <h1
    //   className={cn(
    //     mode === "CREATE/EDIT"
    //       ? "text-[0.4rem] md:text-[7px]"
    //       : mode === "PREVIEW"
    //       ? "text-[8px] md:text-xs"
    //       : "text-[9px] md:text-xs",
    //     "font-medium",
    //     "text-grayy",
    //     "tracking-wider",
    //   )}
    // >
    //   Nomor Sertifikat:{" "}
    //   {mode === "VIEW"
    //     ? participantCertificateData.certificateNumber
    //     : participantCertificateData.certificateNumber.slice(0, -1) + "PREVIEW"}
    // </h1>
  );
};
