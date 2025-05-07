import { IEventParticipantCertificate } from "@/lib/types/Event";
import { cn } from "@/lib/utils";

type Props = {
  participantCertificateData: IEventParticipantCertificate;
  mode: "CREATE/EDIT" | "PREVIEW" | "VIEW";
  onlyCertificateNumber?: boolean;
  className?: string;
};
export const TemplateCertificateNumber = ({
  participantCertificateData,
  mode,
  className,
  onlyCertificateNumber = false,
}: Props) => {
  return (
    <h1 className={cn(className)}>
      {onlyCertificateNumber ? "" : "Nomor Sertifikat:"}{" "}
      {mode === "VIEW"
        ? participantCertificateData.certificateNumber
        : participantCertificateData.certificateNumber.slice(0, -1) + "PREVIEW"}
    </h1>
  );
};
