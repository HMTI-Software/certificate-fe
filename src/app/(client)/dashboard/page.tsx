"use client";

import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import { FormatDate } from "@/lib/functions";
import { IEventData } from "@/lib/Interface";
import { Frown, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import bg from "@/app/assets/eventbg-1.jpg";
import Link from "next/link";

const page = () => {
  const [isPremium, setIsPremium] = useState<boolean>(true);
  const [eventData, setEventData] = useState<IEventData[]>();

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch("/static/EventData.json");
      const data = await res.json();
      console.log(data);
      setEventData(data);
    };
    fetchEvent();
  }, []);

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
            return (
              <Link href={"/dashboard/" + event.uniqueId} key={event.id}>
                <Card
                  className="bordered py-4 border-b-4 hover:border-b cursor-pointer"
                  key={event.id}
                >
                  <div className="aspect-[7/2] p-0 w-full rounded-md border-black overflow-hidden border">
                    <img
                      src={bg.src}
                      alt="Event Background"
                      className="object-cover object-center h-full w-full"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="badge mb-2">{event.stakeHolder.name}</div>
                    <h1 className="font-bold text-xl mb-4">
                      {event.eventName}
                    </h1>
                    <p className="text-grayy text-sm">
                      <FormatDate>{event.timestamp}</FormatDate>
                    </p>
                  </div>
                </Card>
              </Link>
            );
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

export default page;
