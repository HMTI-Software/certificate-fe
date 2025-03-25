import { IProfileCard } from "@/lib/Interface";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const ProfileCard = ({ profileData }: { profileData: IProfileCard }) => {
  return (
    <Card
      className={`grid grid-cols-2 md:grid-cols-1 gap-1 bordered border-b-4 hover:border-b-1 ${profileData.bgColor} items-center`}
    >
      <CardHeader className="flex px-2 items-start">
        <h1 className="text-4xl font-bold">{profileData.status}</h1>
      </CardHeader>
      <CardContent className="flex flex-col items-start md:justify-start gap-1 px-2">
        <h1 className="text-xl font-bold">{profileData.title}</h1>
        <p className="text-sm font-normal text-gray-700 w-20 md:w-full">
          {profileData.description}
        </p>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
