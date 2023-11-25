import ICreateSignature from './iCreateSignature';
import { SignatureCreateDto } from '../dtos/signatureCreateDto';
import { Inject, Injectable } from '@nestjs/common';
import ISignatureRepository from '../../../domain/repository/iSignatureRepository';
import ApplicationException from '../../../shared/exceptions/applicationException';
import Signature from '../../../domain/signature/signature';
import UniqueIdentifier from '../../../shared/valueObjects/uniqueIdentifier.valueObj';
import IAccessPlanRepository from '../../../domain/repository/iAccessPlanRepository';
import CreateSignatureDomainService from '../../../domain/services/createSignature.domainService';

@Injectable()
export default class CreateSignatureService implements ICreateSignature {
  constructor(
    private readonly createSignatureDomainService: CreateSignatureDomainService,
  ) {}
  async execute(signatureDto: SignatureCreateDto): Promise<void> {
    ApplicationException.whenParameterIsNull(
      signatureDto,
      'could not create a signature without his properties.',
    );
    ApplicationException.whenAnyPropInParameterIsNull(signatureDto);

    const { clientId, planId } = signatureDto;
    await this.createSignatureDomainService.execute(planId, clientId);
  }
}
