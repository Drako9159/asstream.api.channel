import { IAuthResponse } from "../../domain/interface/IAuthResponse";

export interface AuthRepository {
  register(): Promise<IAuthResponse | string>;
  login(): Promise<IAuthResponse | string>;
}
