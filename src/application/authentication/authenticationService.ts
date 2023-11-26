import { Inject, Injectable } from '@nestjs/common';
import AuthenticationRepository from './authenticationRepository';
import ApplicationException from '../../shared/exceptions/applicationException';
import UserDto from './userAuthenticationDto/userDto';

@Injectable()
export default class AuthenticationService {
  constructor(
    @Inject('AuthenticationRepository')
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  async verifyBearerToken(bearerToken: string): Promise<UserDto> {
    ApplicationException.whenParameterIsNull(
      bearerToken,
      'token is required for verification.',
    );

    return await this.authenticationRepository.verifyToken(bearerToken);
  }
}
