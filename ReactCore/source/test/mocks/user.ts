import { ApplicationUserDto, userState } from "models";

export const ApplicationUserMock: ApplicationUserDto = {
  Email: "michaelknight492@gmail.com",
  FirstName: "Michael",
  Id: "811be611-e47f-4117-8f61-4e1781cd6617",
  LastName: "Knight"
};

export const UserReducerInitalStateMock: userState = {
  LoggedIn: false,
  user: undefined as ApplicationUserDto | undefined,
  noUserActive: undefined as any,
  loading: false
};
