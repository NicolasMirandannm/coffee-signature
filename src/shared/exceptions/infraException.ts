import { HttpException } from '@nestjs/common';

export default class InfraException extends HttpException {
  constructor(msg?: string) {
    super(msg ?? 'an error occurred in the infra layer.', 400);
  }

  static whenParameterIsNull(parameter: any, msg: string) {
    if (parameter == null) throw new InfraException(msg);
  }
}
