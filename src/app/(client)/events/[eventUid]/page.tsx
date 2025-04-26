import EventCard from "@/components/card/EventCard";
import { auth } from "@/auth";
import { getEventByEventId } from "@/actions/getEventByEventId";
import { ParticipantsTable } from "@/components/table/ParticipantsTable";

const EventPage = async ({
  params,
}: {
  params: Promise<{ eventUid: string }>;
}) => {
  const { eventUid } = await params;
  const session = await auth();

  const token = session?.token;
  if (!token) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        Unauthorized access
      </div>
    );
  }
  const eventData = await getEventByEventId(eventUid);

  if (!eventData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        No event found
      </div>
    );
  }
  return (
    <div className="w-full px-0 md:px-20 lg:px-40 2xl:px-60 pb-40">
      <div className="w-full">
        <EventCard event={eventData} page="event" />
        <div className="flex w-full justify-between mt-10 items-center">
          <b className="text-xl">table of participants</b>
        </div>
        <ParticipantsTable
          token={token}
          eventData={{ uid: eventData.uid, name: eventData.eventName }}
        />
      </div>
    </div>
  );
};

export default EventPage;
