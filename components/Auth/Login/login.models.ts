export interface ILoginProps {
  open: boolean;
  handleLoginClose: any;
}

export interface ILoginFieldValuesState {
  email: string;
  password: string;
}

interface IUserInterface {
  id: string;
  type: string;
  email: string;
  name: string;
  description: string;
  profile_picture: string;
}

export interface ILoginResponse {
  token: string;
  user: IUserInterface;
}

export interface ILoginVars {
  email: string;
  password: string;
}
