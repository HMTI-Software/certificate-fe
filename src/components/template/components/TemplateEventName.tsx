import { IEventParticipantCertificate } from "@/lib/types/Event";
import { cn } from "@/lib/utils";

type Props = {
  participantCertificateData: IEventParticipantCertificate;
  className?: string;
};
export const TemplateEventName = ({
  className,
  participantCertificateData,
}: Props) => {
  return (
    <h1 className={cn("font-bold", className)}>
      {participantCertificateData.eventName.toUpperCase()}
    </h1>
  );
};
