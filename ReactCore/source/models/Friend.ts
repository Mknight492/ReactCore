import { Locations } from "./Locations";

export interface Friend {
  Id: number;
  Name: string;
  LocationId: number;
  Location: Locations;
  UserId: string;
}

export interface FriendsObj {
  [key: string]: Friend;
}
