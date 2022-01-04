import {User} from './user';

export class LoginResult {
  token: string;
  refreshToken: string;
  user: User;
}
