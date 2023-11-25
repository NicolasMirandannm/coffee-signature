import { Inject, Injectable } from '@nestjs/common';
import Signature from '../signature/signature';
import AccessPlan from '../accessPlan/accessPlan';
import ApplicationException from '../../shared/exceptions/applicationException';
import UniqueIdentifier from '../../shared/valueObjects/uniqueIdentifier.valueObj';
import ISignatureRepository from '../repository/iSignatureRepository';
import IAccessPlanRepository from '../repository/iAccessPlanRepository';
import DomainException from '../../shared/exceptions/domainException';

@Injectable()
export default class CreateSignatureDomainService {
  constructor(
    @Inject('ISignatureRepository')
    private readonly signatureRepository: ISignatureRepository,
    @Inject('IAccessPlanRepository')
    private readonly accessPlanRepository: IAccessPlanRepository,
  ) {}

  async execute(planId: string, clientId: string): Promise<void> {
    const signatureExists =
      await this.signatureRepository.findByClientId(clientId);
    const planExists = await this.accessPlanRepository.findById(planId);

    if (signatureExists)
      throw new DomainException(
        `user already has a signature identified by ${signatureExists
          .getId()
          .value.toString()}`,
      );
    if (!planExists) throw new DomainException('access plan dont exists.');

    const newSignature = Signature.createAnNewSignature(
      UniqueIdentifier.create(planId),
      clientId,
    );

    await this.signatureRepository.save(newSignature);
  }
}
