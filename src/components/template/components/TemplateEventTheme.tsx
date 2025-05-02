import { IEventParticipantCertificate } from "@/lib/types/Event";
import { cn } from "@/lib/utils";

type Props = {
  participantCertificateData: IEventParticipantCertificate;
  className?: string;
};
export const TemplateEventTheme = ({
  participantCertificateData,
  className,
}: Props) => {
  return (
    <p className={cn("font-medium text-center h-10 max-w-sm", className)}>
      {participantCertificateData.eventTheme.toUpperCase()}
    </p>
  );
};
