export interface AddFriendModel {
  Name: string;
  LocationId: number | null;
}

export interface EditFriendModel extends AddFriendModel {
  Id: number;
}
