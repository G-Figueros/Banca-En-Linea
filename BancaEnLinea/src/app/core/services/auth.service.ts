import { AuthCredentials, AuthResponse } from '../models/auth.models';

export class AuthService {
  login(credentials: AuthCredentials): Promise<AuthResponse> {
    return Promise.resolve({ token: 'fake-jwt-token', userId: '123' });
  }
}
