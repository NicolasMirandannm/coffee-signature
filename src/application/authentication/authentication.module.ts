import { Global, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import AuthGuard from './guards/authGuard';
import AuthenticationService from './authenticationService';
import RepositoryModule from '../../infra/repository/repository.module';

@Global()
@Module({
  imports: [RepositoryModule],
  providers: [
    AuthenticationService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export default class AuthenticationModule {}
