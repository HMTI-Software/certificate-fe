"use client";

import {
  IParticipantData,
  IParticipantDataTable,
} from "@/lib/types/Participants";
import { GeneralTable } from "./table";
import EventParticipantColumn from "./columns/EventParticipantColumn";
import { useEffect, useState } from "react";

type Props = {
  participants: IParticipantData[];
  eventData: {
    uid: string;
    name: string;
  };
};
export const ParticipantsTable = ({ participants, eventData }: Props) => {
  const data: IParticipantDataTable[] = participants.map((participant) => {
    return {
      eventUid: eventData.uid,
      uid: participant.uid,
      name: participant.name,
      certificateNumber: participant.certificateNumber,
      suffix: parseInt(participant.certificateNumber.slice(-3)),
      pathQr: participant.qrCodes[0].pathQr,
      email: participant.email,
      position: participant.position,
    };
  });
  const [participantData, setParticipantData] =
    useState<IParticipantDataTable[]>(data);

  useEffect(() => {
    const data: IParticipantDataTable[] = participants.map((participant) => {
      return {
        eventUid: eventData.uid,
        uid: participant.uid,
        name: participant.name,
        certificateNumber: participant.certificateNumber,
        suffix: parseInt(participant.certificateNumber.slice(-3)),
        pathQr: participant.qrCodes[0].pathQr,
        email: participant.email,
        position: participant.position,
      };
    });
    setParticipantData(data);
  }, [participants]);

  return (
    <GeneralTable
      columns={EventParticipantColumn}
      data={participantData!}
      page="event"
      eventName={eventData.name}
      eventUid={eventData.uid}
    />
  );
};
