export interface IEventData {
  id: string
  eventName: string
  organizer: string
  certificateNumber: string
  date: string
  eventTheme: string
  initalNumber: number
  stakeHolder: IEventStakeHolder
  timestamp: string
}

export interface IEventStakeHolder {
  name: string
  jabatan: string
  image: string
}

export interface IUserData {
  id: number
  name: string
  email: string
  password: string
  position: string
  image: string
}