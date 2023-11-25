import { Module } from '@nestjs/common';
import RepositoryModule from '../../infra/repository/repository.module';
import SignatureRestController from './signatureRest.controller';
import FindSignatureService from './findSignatures/findSignatureService';
import CreateSignatureService from './createSignature/createSignatureService';
import UpdateSignatureService from './updateSignature/updateSignatureService';
import DeleteSignatureService from './deleteSignature/deleteSignatureService';
import CreateSignatureDomainService from '../../domain/services/createSignature.domainService';
import CancelSignatureService from './cancelSignature/cancelSignatureService';
import ActiveSignatureService from './activeSignature/activeSignatureService';

@Module({
  imports: [RepositoryModule],
  controllers: [SignatureRestController],
  providers: [
    {
      provide: 'ICreateSignature',
      useClass: CreateSignatureService,
    },
    {
      provide: 'IFindSignatures',
      useClass: FindSignatureService,
    },
    {
      provide: 'IUpdateSignature',
      useClass: UpdateSignatureService,
    },
    {
      provide: 'IDeleteSignature',
      useClass: DeleteSignatureService,
    },
    CreateSignatureDomainService,
    CancelSignatureService,
    ActiveSignatureService,
  ],
})
export default class SignatureModule {}
