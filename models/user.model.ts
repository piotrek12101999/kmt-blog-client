export interface IUser {
  id: string;
  type: "ADMIN" | "USER";
  email: string;
  name: string;
  description: string;
  profile_picture: string;
}

export interface IAuthPayload {
  token: string;
  user: IUser;
}
