import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import AuthenticationService from '../authenticationService';
import { Request } from 'express';

@Injectable()
export default class AuthGuard implements CanActivate {
  constructor(private readonly authenticationService: AuthenticationService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    if (request.path == '/') return true;

    const bearerToken = request.headers.authorization;
    const user =
      await this.authenticationService.verifyBearerToken(bearerToken);
    request.headers['abc'] = '123123';

    return !!user;
  }
}
