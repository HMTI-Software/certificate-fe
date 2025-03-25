"use client";

import Navbar from "@/components/Navbar";
import bg from "@/app/assets/eventbg-1.jpg";
import { Card } from "@/components/ui/card";
import { FormatDate } from "@/lib/functions";
import { Ellipsis, FilePenLine, Plus, QrCode, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { IEventData, IParticipantData } from "@/lib/Interface";
import { useParams } from "next/navigation";
import TextToQR from "@/components/QRConverter";
import Loading from "@/components/Loading";
import AddUser from "@/components/popup/AddUser";
import bgall from "@/app/assets/bg.jpg";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const page = () => {
  const params = useParams();
  const uniqueid = params.uniqueid as string;

  const [eventData, setEventData] = useState<IEventData | null>(null);
  const [participants, setParticipants] = useState<IParticipantData[]>([]);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [pagination, setPagination] = useState<number>(1);
  const [openAddUser, setOpenAddUser] = useState<boolean>(false);
  const [tempParticipant, setTempParticipant] = useState<IParticipantData[]>(
    [],
  );

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("/static/EventData.json");
      const par = await fetch("/static/participantData.json");

      const data = await res.json();
      const part = await par.json();

      const event = data.find(
        (event: IEventData) => event.uniqueId === uniqueid,
      );
      const participant = part.filter(
        (participant: any) => participant.eventId === uniqueid,
      );

      setEventData(event || null);
      setParticipants(participant || []);
      setTempParticipant(participant || []);
      console.log(event, participant);
    };
    uniqueid ? getData() : setNotFound(true);
  }, [uniqueid]);

  const handleDownload = async (qrcodeUrl: string, owner: string) => {
    // setLoading(true);

    try {
      const response = await fetch("/api/saveQRCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: qrcodeUrl, owner }),
      });

      const result = await response.json();
      if (result.url) {
        const link = document.createElement("a");
        link.href = result.url;
        link.download = result.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Download Error:", error);
      alert("Something went wrong");
    } finally {
      console.log("done");
    }
  };

  const handleDownloadAllQRCode = async () => {
    const qrcodeurl = {
      owner: participants.map((p) => p.name),
      number: participants.map((p) => p.certificateNumber.toString()),
      name: eventData?.eventName,
    };

    try {
      const response = await fetch("/api/saveQRCodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texts: qrcodeurl.number,
          owner: qrcodeurl.owner,
          name: qrcodeurl.name,
        }),
      });

      const result = await response.json();
      if (result.url) {
        const link = document.createElement("a");
        link.href = result.url;
        link.download = result.fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert("Failed to generate QR codes");
      }
    } catch (error) {
      console.error("Download Error:", error);
      alert("Something went wrong");
    }
  };

  const participantsPerPage = 10;
  const maxPagination = Math.ceil(participants.length / participantsPerPage);
  const indexOfLastParticipant = pagination * participantsPerPage;
  const indexOfFirstParticipant = indexOfLastParticipant - participantsPerPage;
  const currentParticipants = participants.slice(
    indexOfFirstParticipant,
    indexOfLastParticipant,
  );

  const nextPage = () => {
    if (pagination < Math.ceil(participants.length / participantsPerPage)) {
      setPagination(pagination + 1);
    }
  };

  const prevPage = () => {
    if (pagination > 1) {
      setPagination(pagination - 1);
    }
  };

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = Object.fromEntries(formData.entries());
    const searchValue = search.search as string;
    if (searchValue === "") {
      setParticipants(tempParticipant);
    } else {
      const foundUser = participants.find((user) =>
        user.name.toLowerCase().includes(searchValue.toLowerCase()),
      );
      if (foundUser) {
        console.log(`Found user: ${foundUser.name}`);
        setParticipants([foundUser]);
      } else {
        console.log("User not found");
      }
    }
  };

  return (
    <div className="w-full px-0 md:px-20 lg:px-40 2xl:px-60 pb-40">
      {eventData ? (
        <div className="w-full">
          <Card className="bordered-nonhover py-4 border-b-4 cursor-pointer mt-4">
            <div className="aspect-[7/1] p-0 w-full rounded-md border-black overflow-hidden border">
              <Image
                src={bg.src}
                alt="Event Background"
                width={100}
                height={100}
                className="object-cover object-center h-full w-full"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="badge mb-2">{eventData?.stakeHolder.name}</div>
              <h1 className="font-bold text-xl mb-4">{eventData?.eventName}</h1>
              <p className="text-grayy text-sm">
                <FormatDate>{eventData?.timestamp}</FormatDate>
              </p>
            </div>
          </Card>
          <div className="flex w-full justify-between mt-10 items-center">
            <b className="text-xl">Table of participants</b>
            <Button
              onClick={() => setOpenAddUser(true)}
              className="bordered rounded-md bg-purplee py-2 px-4 flex gap-2 hover:bg-purplee"
            >
              <span className="hidden md:inline-flex text-black">
                add new participant
              </span>
              <Plus className="text-black" />
            </Button>
          </div>
          <form
            className="mt-4 flex items-center gap-2"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              name="search"
              className="bordered-nonhover rounded-md w-full"
              placeholder="Search"
            />
            <Button
              type="submit"
              className="bordered rounded-md bg-greenn hover:bg-green text-black py-5 px-8"
            >
              Search
            </Button>
          </form>
          <div className="w-full mt-4">
            <div>
              {currentParticipants?.map((part: any, index) => (
                <div
                  className="flex py-2 items-center gap-4 w-full justify-between"
                  key={index}
                >
                  <p>{index + 1 + "."}</p>
                  <div className="flex flex-col flex-1">
                    <b className="font-bold text-lg">{part.name}</b>
                    <p className="text-grayy text-xs">
                      {eventData.certificateNumber +
                        "/" +
                        part.certificateNumber}
                    </p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <TextToQR width={"50px"} margin={0}>
                      {eventData.certificateNumber +
                        "/" +
                        part.certificateNumber}
                    </TextToQR>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="md:hidden text-black">
                      <Ellipsis />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Trash2 size={16} />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FilePenLine size={16} />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <QrCode size={16} />
                        Download
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="hidden flex-1 md:flex  gap-2 justify-end items-center">
                    <Button className="bordered flex items-center gap-2 rounded-md bg-redd hover:bg-redd text-black h-full">
                      delete <Trash2 size={16} />
                    </Button>
                    <Button className="bordered flex items-center gap-2 rounded-md bg-purplee hover:bg-purplee text-black h-full">
                      edit <FilePenLine size={16} />
                    </Button>
                    <Button
                      className="bordered flex items-center gap-2 rounded-md bg-yelloww hover:bg-yelloww text-black h-full"
                      onClick={() =>
                        handleDownload(
                          eventData.certificateNumber +
                            "/" +
                            part.certificateNumber,
                          part.name,
                        )
                      }
                    >
                      download <QrCode size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex mt-4 justify-between items-center">
              <div className="flex gap-2 items-center flex-1">
                {/* <button className="bordered flex items-center gap-2 rounded-md bg-redd" onClick={prevPage}>previous <ArrowLeft size={16}/></button> */}
                {Array.from({ length: maxPagination }, (_, index) => (
                  <Button
                    key={index}
                    className={`bordered flex items-center text-black justify-center gap-2 aspect-square rounded-md ${
                      pagination === index + 1
                        ? "bg-purplee hover:bg-purplee"
                        : "bg-white"
                    }`}
                    onClick={() => setPagination(index + 1)}
                  >
                    {index + 1}
                  </Button>
                ))}
                {/* <button className="bordered flex items-center gap-2 rounded-md bg-redd" onClick={nextPage}>next <ArrowRight size={16}/></button> */}
              </div>
              <div className="justify-end flex flex-1">
                <Button
                  className="bordered flex items-center gap-2 rounded-md bg-yelloww hover:bg-yelloww text-black"
                  onClick={handleDownloadAllQRCode}
                >
                  download all <QrCode size={16} />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : notFound ? (
        <div className="w-full flex flex-col items-center justify-center pt-40">
          <h1 className="text-3xl font-bold">Event Not Found</h1>
        </div>
      ) : (
        <Loading>sabar ya bang..</Loading>
      )}
      {openAddUser ? (
        <AddUser showAddUser={openAddUser} setShowAddUser={setOpenAddUser} />
      ) : null}
    </div>
  );
};

export default page;
