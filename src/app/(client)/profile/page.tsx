import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type ProfileCardProps = {
  title: string;
  description: string;
  status: number | string;
  bgColor: string;
};

const ProfilePage = () => {
  const profileCard: ProfileCardProps[] = [
    {
      title: "Events",
      description: "Events you have created or joined",
      status: 12,
      bgColor: "bg-[#99B2FF] hover:bg-[#99B2FF/90]",
    },
    {
      title: "Participants",
      description: "Participants you have invited in all events",
      status: 1200,
      bgColor: "bg-[#E599FF] hover:bg-[#E599FF/90]",
    },
    {
      title: "Subscriptions",
      description: "Your current subscription plan",
      status: "Free Plan",
      bgColor: "bg-[#FFFB86] hover:bg-[#FFFB86/90]",
    },
  ];
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-14 pt-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <Avatar className="w-24 h-24 border-black border-3">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-xl font-bold">Naufal Alif Mahendra</h1>
            <p className="text-sm font-normal text-gray-400">
              alif.mhndr01@gmail.com
            </p>
          </div>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-4">
            {profileCard.map((item) => {
              return (
                <Card
                  key={item.title}
                  className={`w-72  bordered ${item.bgColor} gap-2 border-b-4 hover:border-b-1`}
                >
                  <CardHeader className="flex items-start justify-start gap-1 px-2">
                    <h1 className="text-4xl font-bold">{item.status}</h1>
                  </CardHeader>
                  <CardContent className="flex flex-col items-start justify-start gap-1 px-2">
                    <h1 className="text-lg font-bold">{item.title}</h1>
                    <p className="text-xs font-normal text-gray-700">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
