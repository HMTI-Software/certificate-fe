import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { submitRequestVerify } from "@/actions/submitRequestVerify";
import { getAllEvents } from "@/actions/getAllEvents";
import { IProfileCard } from "@/lib/types/General";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertCircle } from "lucide-react";
import { auth } from "@/auth";
import ProfileCard from "@/components/card/ProfileCard";
import RecentActivity from "@/components/card/Recent";
import UpcomingEvents from "@/components/card/Upcoming";

export const metadata: Metadata = {
  title: "Profile",
  description: "User Profile Page",
  icons: {
    icon: "/favicon.ico",
  },
};

const ProfilePage = async () => {
  const session = await auth();
  const isEmailVerified = session?.user?.isVerifiedEmail || false;

  const profileCard: IProfileCard[] = [
    {
      title: "Events",
      description: "Events you have created or joined",
      status: 12,
      bgColor: "bg-[#99B2FF] hover:bg-[#99B2FF/90]",
      icon: "calendar",
    },
    {
      title: "Participants",
      description: "Participants you have invited in all events",
      status: 1200,
      bgColor: "bg-[#E599FF] hover:bg-[#E599FF/90]",
      icon: "users",
    },
    {
      title: "Subscriptions",
      description: "Your current subscription plan",
      status: "Free Plan",
      bgColor: "bg-[#FFFB86] hover:bg-[#FFFB86/90]",
      icon: "star",
    },
  ];

  const recentActivities = [
    {
      title: "Created a new event: 'Tech Meetup 2025'",
      timestamp: "2 hours ago",
      type: "Event"
    },
    {
      title: "Added 3 new participants to 'Annual Conference'",
      timestamp: "Yesterday",
      type: "Participants"
    },
    {
      title: "Updated your profile information",
      timestamp: "3 days ago",
      type: "Profile"
    }
  ];

  const upcomingEvents = [
    {
      title: "Annual Developer Conference 2025",
      date: "May 15, 2025",
      month: "May",
      day: "15",
      participants: 120
    },
    {
      title: "Team Building Workshop",
      date: "June 2, 2025",
      month: "Jun",
      day: "02",
      participants: 45
    },
    {
      title: "Team Building Workshop",
      date: "June 2, 2025",
      month: "Jun",
      day: "02",
      participants: 45
    }
  ];

  return (
    <>
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-6">
        <div className="flex flex-col items-center justify-center gap-4 sm:gap-5 mb-6 sm:mb-8">
          <div className="flex flex-row md:flex-col items-center justify-center gap-3 sm:gap-4">
            <Avatar className="w-16 h-16 sm:w-24 sm:h-24 border-black border-2 sm:border-3">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>NA</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center justify-center gap-1">
              <h1 className="text-lg sm:text-xl font-bold">{session?.user.email.split("@")[0] || "User"}</h1>
              <div className="flex flex-row items-center gap-2">
                <p className="text-xs sm:text-sm font-normal text-gray-400">
                  {session?.user.email || "Email User"}
                </p>
                {isEmailVerified ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 py-0 text-xs bg-green-50 text-green-700 border-green-200 hover:bg-green-100 hover:text-green-800"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Verified
                  </Button>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    className="h-6 px-2 py-0 text-xs bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 hover:text-amber-800">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Not Verified
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 w-full">
            {profileCard.map((item, index) => {
              return <ProfileCard key={index} profileData={item} />;
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <RecentActivity activities={recentActivities} />
          <UpcomingEvents events={upcomingEvents} />
        </div>
      </div>
    </>
  );
};

export default ProfilePage;