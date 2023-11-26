import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import AuthenticationRepository from '../../../application/authentication/authenticationRepository';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import UserDto from '../../../application/authentication/userAuthenticationDto/userDto';

@Injectable()
export default class AuthenticationRestRepository
  implements AuthenticationRepository
{
  private readonly logger = new Logger(AuthenticationRestRepository.name);
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async verifyToken(token: string): Promise<UserDto> {
    const authUrl = `${this.configService.get(
      'AUTH_BASE_URL',
    )}realms/facoffee/protocol/openid-connect/userinfo`;

    try {
      const response = await lastValueFrom(
        this.httpService.get(authUrl, { headers: { Authorization: token } }),
      );
      return {
        id: response.data.sub,
        name: response.data.name,
      };
    } catch (err) {
      throw new UnauthorizedException('token não é valido.');
    }
  }
}
