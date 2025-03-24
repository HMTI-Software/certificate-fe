export interface IEventData {
  uniqueId: string;
  id: string;
  eventName: string;
  organizer: string;
  certificateNumber: string;
  date: string;
  eventTheme: string;
  initalNumber: number;
  stakeHolder: IEventStakeHolder;
  timestamp: string;
}

export interface IEventStakeHolder {
  name: string;
  jabatan: string;
  image: string;
}

export interface IUserData {
  id: number;
  name: string;
  email: string;
  password: string;
  position: string;
  image: string;
}

export interface IPremiumUsers {
  id: number;
  name: string;
  status: "active" | "inactive";
  premiumAt: string;
}

export interface IParticipantData {
  id: number;
  uniqueId: string;
  name: string;
  eventId: string;
  certificateNumber: number;
}

export interface IPricingPackage {
  packageName: string;
  packageDescription: string;
  packagePrice: number;
  packageFeatures: {
    feature: string;
    icon: React.ReactNode;
  }[];
  packageStyle: string;
}

export interface IAdminContact {
  name: string;
  description: string;
  noTelp: number;
  igUsername: string;
  adminImage: string;
  cardStyle?: string;
  imageStyle?: string;
}
