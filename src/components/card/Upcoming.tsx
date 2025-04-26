import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface EventItem {
  title: string;
  date: string;
  month: string;
  day: string;
  participants: number;
}

interface UpcomingEventsProps {
  events: EventItem[];
}

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  return (
    <Card className="bordered border-b-4 hover:border-b-1 bg-purple-50">
      <CardHeader className="flex flex-row items-center justify-between px-2 sm:px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-gray-700" />
          <h1 className="text-lg sm:text-xl font-bold">Upcoming Events</h1>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 py-2">
        <div className="space-y-3">
          {events.map((event, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3 pb-3 border-b border-gray-200 last:border-b-0">
              <div className="flex-shrink-0 bg-purple-100 text-purple-800 text-xs font-medium px-2 sm:px-3 py-1 sm:py-2 rounded">
                <div className="text-center">
                  <div className="font-bold text-xs sm:text-sm">{event.month}</div>
                  <div className="text-base sm:text-lg">{event.day}</div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-xs sm:text-sm break-words">{event.title}</p>
                <p className="text-xs text-gray-500 mt-1">{event.participants} participants registered</p>
              </div>
            </div>
          ))}
        </div>
        {events.length === 0 && (
          <p className="text-sm text-gray-500 italic">No upcoming events</p>
        )}
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;