import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ActivityItem {
  title: string;
  timestamp: string;
  type: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const RecentActivity = ({ activities }: RecentActivityProps) => {
  return (
    <Card className="bordered border-b-4 hover:border-b-1 bg-blue-50">
      <CardHeader className="flex flex-row items-center justify-between px-2 sm:px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-700" />
          <h1 className="text-lg sm:text-xl font-bold">Recent Activity</h1>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-4 py-2">
        <div className="space-y-3">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-2 sm:gap-3 pb-3 border-b border-gray-200 last:border-b-0">
              <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 flex-shrink-0"></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium break-words">{activity.title}</p>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className="px-2 py-0.5 bg-blue-100 rounded-full text-xs text-gray-600">{activity.type}</span>
                  <p className="text-xs text-gray-500">{activity.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        {activities.length === 0 && (
          <p className="text-sm text-gray-500 italic">No recent activities</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;