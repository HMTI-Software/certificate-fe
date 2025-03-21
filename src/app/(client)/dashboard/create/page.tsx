"use client";

import Navbar from "@/components/Navbar";
import React, { useState } from "react";

const page = () => {
  interface ICreateField {
    name: string;
    id: string;
    placeholder: string;
    type: string;
  }

  interface ICreateFormData {
    event_name: string;
    event_date: string;
    event_organizer: string;
    event_theme: string;
    event_certificate: string;
    event_initial_number: number;
  }

  const [formData, setFormData] = useState<ICreateFormData>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [formState, setFormState] = useState<boolean>(true);

  const HandleSubmit = (e: HTMLFormElement) => {
    e.preventDefault();
  };

  const CreateField: ICreateField[] = [
    {
      name: "Nama Event",
      id: "event_name",
      placeholder: "Nama event",
      type: "text",
    },
    {
      name: "Tanggal",
      id: "event_date",
      placeholder: "",
      type: "date",
    },
    {
      name: "Organizer",
      id: "event_organizer",
      placeholder: "Organizer",
      type: "text",
    },
    {
      name: "Tema Event",
      id: "event_theme",
      placeholder: "Tema event",
      type: "text",
    },
    {
      name: "Nomor Sertifikat",
      id: "event_certificate",
      placeholder: "Nomor sertifikat",
      type: "text",
    },
    {
      name: "Nomor Awal",
      id: "event_initial_number",
      placeholder: "Nomor awal",
      type: "number",
    },
  ];

  const CreateStakeHolderField: ICreateField[] = [
    {
      name: "Nama Event",
      id: "event_name",
      placeholder: "Nama event",
      type: "text",
    },
    {
      name: "Tanggal",
      id: "event_date",
      placeholder: "",
      type: "date",
    },
    {
      name: "Organizer",
      id: "event_organizer",
      placeholder: "Organizer",
      type: "text",
    },
  ];

  const CreateFormData = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const eventName = formData.get("event_name") as string;
    const eventDate = formData.get("event_date") as string;
    const eventOrganizer = formData.get("event_organizer") as string;
    const eventTheme = formData.get("event_theme") as string;
    const eventCertificate = formData.get("event_certificate") as string;
    const eventInitialNumber = Number(formData.get("event_initial_number"));

    if (
      eventName ||
      eventDate ||
      eventOrganizer ||
      eventTheme ||
      eventCertificate ||
      eventInitialNumber
    ) {
      setFormData({
        event_name: eventName,
        event_date: eventDate,
        event_organizer: eventOrganizer,
        event_theme: eventTheme,
        event_certificate: eventCertificate,
        event_initial_number: eventInitialNumber,
      });
      setFormState(true);
    } else {
      setErrorMsg("tolong lengkapi field dibawah ini");
      console.log({
        event_name: eventName,
        event_date: eventDate,
        event_organizer: eventOrganizer,
        event_theme: eventTheme,
        event_certificate: eventCertificate,
        event_initial_number: eventInitialNumber,
      });
    }
  };

  return (
    <div className="pt-10 w-full flex flex-col items-center">
      {formState ? (
        <div className="w-full flex flex-col items-center">
          <div className="bordered-nonhover flex flex-col text-white bg-redd w-full max-w-4xl px-4 py-2 rounded-md pt-20">
            <h1 className="text-xl font-bold">Events</h1>
            <p>tolong lengkapi field di bawah ini</p>
          </div>
          {errorMsg == "" ? null : (
            <div className="bordered-nonhover mt-4 rounded-md bg-redd text-center w-full">
              {errorMsg}
            </div>
          )}
          <form
            onSubmit={CreateFormData}
            className="grid grid-cols-2 mt-2 gap-4 max-w-4xl w-full"
          >
            {CreateField.map((field) => (
              <div className="w-full flex flex-col" key={field.id}>
                <label htmlFor={field.id} className="mb-2">
                  {field.name}
                </label>
                <input
                  type={field.type}
                  name={field.id}
                  className="bordered rounded-md w-full"
                  id={field.id}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div></div>
            <button className="bordered bg-purplee rounded-md">next</button>
          </form>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center">
          <div className="bordered-nonhover flex flex-col text-white bg-purplee w-full max-w-4xl px-4 py-2 rounded-md pt-20">
            <h1 className="text-xl font-bold">Events</h1>
            <p>tolong lengkapi field di bawah ini</p>
          </div>
          {errorMsg == "" ? null : (
            <div className="bordered-nonhover mt-4 rounded-md bg-redd text-center w-full">
              {errorMsg}
            </div>
          )}
          <form
            onSubmit={CreateFormData}
            className="grid grid-cols-2 mt-2 gap-4 max-w-4xl w-full"
          >
            {CreateField.map((field) => (
              <div className="w-full flex flex-col" key={field.id}>
                <label htmlFor={field.id} className="mb-2">
                  {field.name}
                </label>
                <input
                  type={field.type}
                  name={field.id}
                  className="bordered rounded-md w-full"
                  id={field.id}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div></div>
            <button className="bordered bg-purplee rounded-md">next</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default page;
