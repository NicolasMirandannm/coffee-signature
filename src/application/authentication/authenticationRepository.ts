import UserDto from './userAuthenticationDto/userDto';

export default interface AuthenticationRepository {
  verifyToken(token: string): Promise<UserDto>;
}
