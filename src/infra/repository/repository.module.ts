import { Global, Module } from '@nestjs/common';
import AccessPlanMapper from './database/mapper/accessPlan/accessPlanMapper';
import AccessPlanRepository from './database/accessPlanRepository';
import MongodbModule from '../database/mongodb.module';
import SignatureMapper from './database/mapper/signature/signatureMapper';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import AuthenticationRestRepository from './rest/authenticationRestRepository';
import SignatureRepository from './database/signatureRepository';

@Global()
@Module({
  imports: [MongodbModule, HttpModule, ConfigModule],
  providers: [
    {
      provide: 'AccessPlanMapper',
      useClass: AccessPlanMapper,
    },
    {
      provide: 'IAccessPlanRepository',
      useClass: AccessPlanRepository,
    },
    {
      provide: 'ISignatureMapper',
      useClass: SignatureMapper,
    },
    {
      provide: 'ISignatureRepository',
      useClass: SignatureRepository,
    },
    {
      provide: 'AuthenticationRepository',
      useClass: AuthenticationRestRepository,
    },
  ],
  exports: [
    'IAccessPlanRepository',
    'ISignatureRepository',
    'AuthenticationRepository',
  ],
})
export default class RepositoryModule {}
