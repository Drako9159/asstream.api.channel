interface IUserResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  role: string;
}

export interface IAuthResponse {
  user: IUserResponse;
  jwt: string;
}
