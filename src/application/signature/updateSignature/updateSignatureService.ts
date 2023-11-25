import IUpdateSignature from './iUpdateSignature';
import { SignatureUpdateDto } from '../dtos/signatureUpdateDto';
import { Inject } from '@nestjs/common';
import ISignatureRepository from '../../../domain/repository/iSignatureRepository';
import ApplicationException from '../../../shared/exceptions/applicationException';
import Signature from '../../../domain/signature/signature';

export default class UpdateSignatureService implements IUpdateSignature {
  constructor(
    @Inject('ISignatureRepository')
    private readonly signatureRepository: ISignatureRepository,
  ) {}
  async execute(
    id: string,
    signatureUpdateDto: SignatureUpdateDto,
  ): Promise<Signature> {
    const signature: Signature = await this.signatureRepository.findById(id);
    ApplicationException.whenParameterIsNull(
      signature,
      'signature does not exists!',
    );

    const { clientName, planId, pendingPayment } = signatureUpdateDto;
    signature.editSignature({
      clientId: clientName,
      planId,
      pendingPayment,
    });

    await this.signatureRepository.update(signature);
    return signature;
  }
}
