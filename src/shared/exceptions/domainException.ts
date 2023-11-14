export default class DomainException extends Error {
  constructor(msg?: string) {
    super(msg ?? 'an error occurred in the domain layer.');
  }

  static whenParameterIsNull(parameter: any, msg: string) {
    if (parameter == null) throw new DomainException(msg);
  }

  static throws(msg: string) {
    throw new DomainException(msg);
  }
}
