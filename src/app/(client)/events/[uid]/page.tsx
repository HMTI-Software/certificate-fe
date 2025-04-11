import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/card/EventCard";
import { auth } from "@/auth";
import { getEventByEventId } from "@/actions/getEventByEventId";
import getAllParticipanByEventUid from "@/actions/getAllParticipantByEventUid";
import { GeneralTable } from "@/components/table/table";
import { IParticipantDataTable } from "@/lib/types/Participants";
import EventParticipantColumn from "@/components/table/columns/EventParticipantColumn";
import { Suspense } from "react";
import ThreeCircleLoading from "@/components/animation/ThreeCircleLoading";

const EventPage = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params;
  const session = await auth();

  const token = session?.token;
  if (!token) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Unauthorized access
      </div>
    );
  }
  const eventData = await getEventByEventId(uid, token);
  const participantData = await getAllParticipanByEventUid(uid, token);

  if (!eventData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        No event found
      </div>
    );
  }
  if (!participantData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        No participant found
      </div>
    );
  }
  const filteredParticipantDataTable: IParticipantDataTable[] =
    participantData.map((value, index) => {
      return {
        token: token,
        eventUid: uid,
        uid: value.uid,
        id: index + 1,
        name: value.name,
        certificateNumber: value.certificateNumber,
        pathQr: value.qrCodes[0].pathQr,
        email: value.email,
        position: value.position,
      };
    });
  return (
    <div className="w-full px-0 md:px-20 lg:px-40 2xl:px-60 pb-40">
      <div className="w-full">
        <EventCard event={eventData!} page="event" token={session?.token} />
        <div className="flex w-full justify-between mt-10 items-center">
          <b className="text-xl">Table of participants</b>
        </div>
        <GeneralTable
          columns={EventParticipantColumn}
          data={filteredParticipantDataTable!}
          page="event"
          eventUid={uid}
          token={session?.token}
        />
      </div>
    </div>
  );
};

export default EventPage;
