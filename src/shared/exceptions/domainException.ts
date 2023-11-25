import { BadRequestException } from '@nestjs/common';

export default class DomainException extends BadRequestException {
  constructor(msg?: string) {
    super(msg ?? 'an error occurred in the domain layer.');
  }

  static whenParameterIsNull(parameter: any, msg: string) {
    if (parameter == null) throw new DomainException(msg);
  }
}
