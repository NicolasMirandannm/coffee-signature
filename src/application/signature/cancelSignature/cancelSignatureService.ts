import { Inject, Injectable } from '@nestjs/common';
import ISignatureRepository from '../../../domain/repository/iSignatureRepository';
import ApplicationException from '../../../shared/exceptions/applicationException';

@Injectable()
export default class CancelSignatureService {
  constructor(
    @Inject('ISignatureRepository')
    private readonly signatureRepository: ISignatureRepository,
  ) {}

  async execute(signatureId: string): Promise<void> {
    ApplicationException.whenParameterIsNull(
      signatureId,
      'cannot cancel signature without id.',
    );

    const signature = await this.signatureRepository.findById(signatureId);
    ApplicationException.whenParameterIsNull(signature, 'signature not found');

    signature.cancelSignature();
    await this.signatureRepository.update(signature);
  }
}
