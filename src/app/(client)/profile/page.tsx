import ProfileCard from "@/components/card/ProfileCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IProfileCard } from "@/lib/types/General";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile Page",
  icons: {
    icon: "/favicon.ico",
  },
};

const ProfilePage = async () => {
  const profileCard: IProfileCard[] = [
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
      <div className="flex flex-col items-center justify-center gap-14">
        <div className="flex flex-row md:flex-col items-center justify-center gap-4">
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
        <div className="grid grid-rows-3 md:grid-cols-3 gap-4">
          {profileCard.map((item, index) => {
            return <ProfileCard key={index} profileData={item} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
