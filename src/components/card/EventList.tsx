// "use client";

// import { IEventData } from "@/lib/types/Event";
// import EventCard from "./EventCard";
// import { useEvents } from "@/hooks/useEvents";

// const EventList = ({ token }: { token: string }) => {
//   const { events, isLoading, isError, errorMessage } = useEvents(token);

//   if (isLoading) {
//     return <p>Loading...</p>;
//   }
//   if (isError) {
//     return <p>Error: {errorMessage}</p>;
//   }
//   return (
//     <>
//       {events?.map((event: IEventData) => {
//         return <EventCard event={event} key={event.uid} page="dashboard" />;
//       })}
//     </>
//   );
// };

// export default EventList;
