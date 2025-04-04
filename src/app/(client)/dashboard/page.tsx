import { CardContent } from "@/components/ui/card";
import { IEventData, IEventResponse } from "@/lib/Interface";
import { Frown, Plus } from "lucide-react";
import Link from "next/link";
import EventCard from "@/components/card/EventCard";
import { auth } from "@/auth";

const fetchEventData = async (token: string) => {
  "use server";
  try {
    const res = await fetch(
      `${process.env.FRONTEND_URL}/api/events?token=${token}`,
      {
        method: "GET",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const eventData: IEventResponse<IEventData[]> = await res.json();
    return eventData.data;
  } catch (error) {
    console.error("Error fetching event data:", error);
  }
};

const DashboardPage = async () => {
  const session = await auth();
  const isPremium = session?.user.isPremium;
  const eventData = await fetchEventData(session?.token!);

  return (
    <div
      className={
        isPremium
          ? "pt-0"
          : "pt-40 w-full flex flex-col items-center justify-center "
      }
    >
      {isPremium ? (
        <div className="w-full grid grid-rows-1 md:grid-cols-3 pt-4 md:pt-8 gap-4">
          {eventData?.map((event: IEventData) => {
            return <EventCard event={event} key={event.uid} />;
          })}
          <Link
            href="/dashboard/create"
            className="py-20 rounded-md bordered border-b-4 hover:border-b cursor-pointer"
          >
            <CardContent className="flex flex-col items-center justify-center h-full">
              <Plus className="text-center" />
              <p>Add event</p>
            </CardContent>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col items-center text-grayy justify-center gap-4">
          <Frown size={100}></Frown>
          <p>You are not Premium</p>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
