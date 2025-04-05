import { QrCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import EventCard from "@/components/card/EventCard";
import { auth } from "@/auth";
import AddNewParticipantsButton from "@/components/button/AddNewParticipants";
import { getEventByEventId } from "@/actions/getEventByEventId";

const EventPage = async ({ params }: { params: Promise<{ uid: string }> }) => {
  const { uid } = await params;
  const session = await auth();
  const eventData = await getEventByEventId(uid, session?.token!);
  return (
    <div className="w-full px-0 md:px-20 lg:px-40 2xl:px-60 pb-40">
      <div className="w-full">
        <EventCard event={eventData!} page="event" />
        <div className="flex w-full justify-between mt-10 items-center">
          <b className="text-xl">Table of participants</b>
          <AddNewParticipantsButton />
        </div>
        {/* <GeneralTable
          columns={EventParticipantColumn}
          data={}
        /> */}
        <div className="w-full mt-4">
          <div className="flex mt-4 justify-between items-center">
            <div className="flex gap-2 items-center flex-1"></div>
            <div className="justify-end flex flex-1">
              <Button className="bordered flex items-center gap-2 rounded-md bg-yelloww hover:bg-yelloww text-black">
                download all <QrCode size={16} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventPage;
