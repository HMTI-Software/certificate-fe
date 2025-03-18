'use client'

import Navbar from "@/components/Navbar"
import bg from "@/app/assets/eventbg-1.jpg"
import { Card } from "@/components/ui/card"
import { FormatDate } from "@/lib/functions"
import { FilePenLine, Plus, QrCode, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"
import { IEventData, IParticipantData } from "@/lib/Interface"
import { useParams } from "next/navigation"
import TextToQR from "@/components/QRConverter"
import Loading from "@/components/Loading"

const page = () => {
  const params = useParams();
  const uniqueid = params.uniqueid as string

  const [ eventData, setEventData ] = useState<IEventData | null>(null);
  const [ participants, setParticipants ] = useState<IParticipantData[]>([]);
  const [ notFound, setNotFound ] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      const res = await fetch('/static/EventData.json')
      const par = await fetch('/static/participantData.json')

      const data = await res.json()
      const part = await par.json()

      const event       = data.find((event: IEventData) => event.uniqueId === uniqueid)
      const participant = part.filter((participant: any) => participant.eventId === uniqueid)
      
      setEventData(event || null);
      setParticipants(participant || null);
      console.log(event, participant)
    }
    uniqueid ? getData() : setNotFound(true)
  }, [uniqueid])

  const handleDownload = async (qrcodeUrl: string, owner: string) => {
    // setLoading(true);

    try {
      const response = await fetch("/api/saveQRCode", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: qrcodeUrl, owner }), // Change this text dynamically if needed
      });

      const result = await response.json();
      if (result.url) {
        const link = document.createElement("a");
        link.href = result.url;
        link.download = result.fileName; // Ensure filename is used
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
      // setLoading(false);
      console.log("done")
    }
  };

  const handleDownloadAllQRCode = async () => {
    const qrcodeurl: {owner: string[], number: number[]} = {
      owner: participants.map(p => p.name),
      number: participants.map(p => p.certificateNumber)
    }

    try {
      const response = await fetch("/api/saveQRCodes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ texts: qrcodeurl.number, owner: qrcodeurl.owner }),
      });

      const result = await response.json();
      if (result.url) {
        const link = document.createElement("a");
        link.href = result.url
        link.download = result.fileName
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      } else {
        alert("Failed to generate QR code");
      }
    } catch (error) {
      console.error("Download Error:", error);
      alert("Something went wrong");
    } finally {
      console.log("done")
    }
  };


  return ( 
    <div className="w-full px-40 2xl:px-80 ">
      <Navbar/>
      {eventData ? (
        <div className="w-full">
          <Card
            className="bordered-nonhover py-4 border-b-4 cursor-pointer mt-4"
          >
            <div className="aspect-[7/1] p-0 w-full rounded-md border-black overflow-hidden border">
              <img
                src={bg.src}
                alt="Event Background"
                className="object-cover object-center h-full w-full"
              />
            </div>
            <div className="flex flex-col items-start">
              <div className="badge mb-2">{eventData?.stakeHolder.name}</div>
              <h1 className="font-bold text-xl mb-4">
                {eventData?.eventName}
              </h1>
              <p className="text-grayy text-sm">
                <FormatDate>{eventData?.timestamp}</FormatDate>
              </p>
            </div>
          </Card>
          <div className="flex w-full justify-between mt-10 items-center">
            <b className="text-xl">Table of participants</b>
            <button className="bordered rounded-md bg-purplee py-2 px-4 flex gap-2">
              add new participant
              <Plus />
            </button>
          </div>
          <form className="mt-4 flex gap-2">
            <input type="text" className="bordered-nonhover rounded-md w-full" placeholder="Search"/>
            <button className="bordered rounded-md bg-greenn py-2 px-8">Search</button>
          </form>
          <div className="w-full mt-4">
            <div>
              {participants?.map((part: any, index) => (
                <div className="flex py-2 items-center gap-4 w-full justify-between" key={part.uniqueId}>
                  <p>{index + 1 + "."}</p>
                  <div className="flex flex-col flex-1">
                    <b className="font-bold text-lg">{part.name}</b>
                    <p className="text-grayy text-xs">{eventData.certificateNumber + "/" + part.certificateNumber}</p>
                  </div>
                  <div className="flex-1 flex justify-center">
                    <TextToQR width={'50px'} margin={0}>
                      {eventData.certificateNumber + "/" + part.certificateNumber}
                    </TextToQR>
                  </div>
                  <div className="flex-1 flex  gap-2 justify-end">
                    <button className="bordered flex items-center gap-2 rounded-md bg-redd">delete <Trash2 size={16}/></button>
                    <button className="bordered flex items-center gap-2 rounded-md bg-purplee">edit <FilePenLine size={16}/></button>
                    <button className="bordered flex items-center gap-2 rounded-md bg-yelloww" onClick={() => handleDownload(eventData.certificateNumber + "/" + part.certificateNumber, part.name)}>download <QrCode size={16}/></button>
                  </div>
                </div>
              ))}
            </div>
            <button className="bordered flex items-center gap-2 rounded-md bg-yelloww" onClick={handleDownloadAllQRCode}>download <QrCode size={16}/></button>
          </div>
        </div>
      ) : 
        (
          notFound ? 
          (
            <div className="w-full flex flex-col items-center justify-center pt-40">
              <h1 className="text-3xl font-bold">Event Not Found</h1>
            </div>
          ) : 
          (
            <Loading>sabar ya bang..</Loading>
          )
        )
      }
    </div>
  )
}

export default page
