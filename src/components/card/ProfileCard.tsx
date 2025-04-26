import { IProfileCard } from "@/lib/types/General";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Calendar, Users, Star, TrendingUp } from "lucide-react";

const ProfileCard = ({ profileData }: { profileData: IProfileCard }) => {

  const getIcon = (iconName: string | undefined) => {
    switch (iconName) {
      case "calendar":
        return <Calendar className="h-5 w-5 text-gray-700" />;
      case "users":
        return <Users className="h-5 w-5 text-gray-700" />;
      case "star":
        return <Star className="h-5 w-5 text-gray-700" />;
      default:
        return <TrendingUp className="h-5 w-5 text-gray-700" />;
    }
  };

  return (
    <Card
      className={`grid grid-cols-2 md:grid-cols-1 gap-1 bordered border-b-4 hover:border-b-1 ${profileData.bgColor} items-center`}>
      <CardHeader className="flex px-2 items-start">
        <div className="flex items-center gap-2">
          {profileData.icon && (
            <div className="flex items-center justify-center">
              {getIcon(profileData.icon)}
            </div>
          )}
          <h1 className="text-xl font-bold">{profileData.status}</h1>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-start md:justify-start gap-1 px-2">
        <h1 className="text-xl font-bold">{profileData.title}</h1>
        <p className="text-sm font-normal text-gray-700 w-full sm:w-20 md:w-full">
          {profileData.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;