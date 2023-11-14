import DomainEntity from '../../../shared/domainEntity/domainEntity';
import UniqueIdentifier from '../../../shared/valueObjects/uniqueIdentifier.valueObj';
import DomainException from '../../../shared/exceptions/domainException';

export enum PaymentStatus {
  APPROVED = 'approved',
  REJECTED = 'rejected',
  PENDING = 'pending',
}

export type PaymentProps = {
  paymentDate: Date;
  valuePaid: number;
  status: PaymentStatus;
};

export default class Payment extends DomainEntity<PaymentProps> {
  private constructor(props: PaymentProps, id: UniqueIdentifier) {
    super(props, id);
  }

  public static create(props: PaymentProps, id: UniqueIdentifier) {
    return new Payment(props, id);
  }

  public static createPay(value: number): Payment {
    DomainException.whenParameterIsNull(value, 'undefined value!');
    if (value <= 0)
      DomainException.throws('cannot create a pay with negative value.');

    return new Payment(
      {
        paymentDate: new Date(),
        valuePaid: value,
        status: PaymentStatus.PENDING,
      },
      undefined,
    );
  }

  public approvePayment(): void {
    this.props.status = PaymentStatus.APPROVED;
  }

  public rejectPayment(): void {
    this.props.status = PaymentStatus.REJECTED;
  }

  public isPending(): boolean {
    return this.props.status === PaymentStatus.PENDING;
  }
}
