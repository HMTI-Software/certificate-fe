"use client";

import { IEventData } from "@/lib/types/Event";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { FormatDate } from "@/lib/functions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import {
  CircleUserRound,
  MoreHorizontal,
  Newspaper,
  SquarePen,
  Trash2,
  View,
} from "lucide-react";
import { useState } from "react";
import GeneralAlert from "../popup/GeneralAlert";
import { toast } from "sonner";
import { deleteEvent } from "@/actions/deleteEvent";
import { useRouter } from "next/navigation";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";

const EventCard = ({
  event,
  page,
  token,
}: {
  event: IEventData;
  page: "dashboard" | "event";
  token?: string;
}) => {
  const router = useRouter();
  const [openDeleteAlert, setOpenDeleteAlert] = useState<boolean>(false);
  const [openStakeholderDetail, setOpenStakeholderDetail] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteEventHandler = () => {
    setIsLoading(true);
    try {
      toast.promise(deleteEvent(event.uid, token!), {
        loading: "Deleting event...",
        success: (data) => {
          setOpenDeleteAlert(false);
          if (data.success) {
            router.push("/dashboard");
            return data.message;
          }
          throw new Error(data.message as string);
        },
        error: (error) => {
          console.error("Error deleting event:", error);
          return error.message;
        },
        finally: () => {
          setIsLoading(false);
        },
      });
    } catch (error) {
      console.error("Error deleting event:", error);
      setIsLoading(false);
    }
  };

  const editEventHandler = () => {
    router.push(`/events/${event.uid}/update`);
  };
  if (page === "event") {
    return (
      <>
        <Card className="bordered-nonhover py-4 border-b-4 gap-3">
          <CardHeader className="aspect-[7/1] p-0 w-full rounded-md border-black overflow-hidden border">
            <Image
              src="/eventbg-1.jpg"
              alt="Event Background"
              width={1000}
              height={500}
              className="object-cover object-center h-full w-full"
            />
          </CardHeader>
          <CardContent className="flex flex-col items-start p-0 m-0">
            <div className="badge mb-2 text-[10px] md:text-xs">
              {event.organizer}
            </div>
            <h1 className="font-bold text-xl ">{event.eventName}</h1>
            <p className="text-sm text-grayy">{event.description}</p>
          </CardContent>
          <CardFooter className="flex flex-row justify-between p-0 m-0 text-gray-700 text-sm">
            <FormatDate>{event.activityAt}</FormatDate>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="bordered bg-purplee hover:bg-purplee/90 hover:border-b-1 border-b-4 text-black"
                  variant={"outline"}
                >
                  <MoreHorizontal size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="bordered border-b-4 hover:border-b-1"
              >
                <DropdownMenuLabel className="text-sm">
                  Event Actions
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="text-xs"
                    onClick={() => editEventHandler()}
                  >
                    <SquarePen /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-xs"
                    onClick={() => setOpenDeleteAlert(true)}
                    disabled={isLoading}
                  >
                    <Trash2 /> {isLoading ? "Deleting..." : "Delete"}
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="text-xs"
                    onClick={() => {
                      setOpenStakeholderDetail(true);
                    }}
                  >
                    <View />
                    View
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">
                    <Newspaper /> Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-xs">
                    <CircleUserRound /> Upload Stakeholder Image
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardFooter>
        </Card>
        <GeneralAlert
          open={openDeleteAlert}
          setOpen={setOpenDeleteAlert}
          title="Are you sure for delete event data?"
          message={`This action will permanently remove the event data from storage. This cannot be undone.`}
          onSuccess={deleteEventHandler}
        />
        <GeneralAlert
          open={openStakeholderDetail}
          setOpen={setOpenStakeholderDetail}
          title="Are you sure for delete event data?"
          message={`This action will permanently remove the event data from storage. This cannot be undone.`}
        ></GeneralAlert>
      </>
    );
  }
  return (
    <Link href={"/events/" + event.uid} key={event.uid}>
      <Card className="bordered py-4 border-b-4 hover:border-b cursor-pointer flex flex-col gap-4">
        <CardHeader className="aspect-[7/2] p-0 w-full rounded-md border-black overflow-hidden border">
          <Image
            src="/eventbg-1.jpg"
            alt="Event Background"
            width={1000}
            height={500}
            className="object-cover object-center h-full w-full"
          />
        </CardHeader>
        <CardContent className="flex flex-col items-start p-0 m-0">
          <div className="badge mb-2 flex">{event.organizer}</div>
          <h1 className="font-bold text-xl mb-4">{event.eventName}</h1>
        </CardContent>
        <CardFooter className="flex flex-row justify-between p-0 m-0 text-gray-700 text-sm">
          <FormatDate>{event.activityAt}</FormatDate>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
