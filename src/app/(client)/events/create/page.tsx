import CreateEventForm from "@/components/forms/CreateEventForm";
import { auth } from "@/auth";

const CreateEventPage = async () => {
  const session = await auth();
  const token = session?.token;

  return (
    <div className="max-w-4xl mb-7 flex flex-col items-center justify-center mx-auto">
      <div className="bordered-nonhover flex flex-col text-white bg-redd w-full px-4 py-2 rounded-md pt-20">
        <h1 className="text-xl font-bold">Create Event</h1>
        <p className="text-sm ">
          Fill out the form below to create a new event.
        </p>
      </div>
      <div className="mt-4 w-full">
        <CreateEventForm token={token} />
      </div>
    </div>
  );
};

export default CreateEventPage;
