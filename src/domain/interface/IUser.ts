export default interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  resetPasswordToken: string;
  confirmationToken: string;
  confirmed: Boolean;
  role: string;
  blocked: Boolean;
  createdAt: Date;
  updatedAt: Date;
  save(): string;
}
