export interface ApplicationUserDto {
  Id: string;
  FirstName: string;
  LastName: string;
  Email: string;
}

export interface userState {
  LoggedIn: boolean | false;
  user?: ApplicationUserDto;
  noUserActive: boolean;
  loading: boolean | false;
}
