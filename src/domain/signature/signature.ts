import AggregateRoot from '../../shared/aggregateRoot/aggregateRoot';
import UniqueIdentifier from '../../shared/valueObjects/uniqueIdentifier.valueObj';
import DomainException from '../../shared/exceptions/domainException';
import Payment from './entities/payment.domainEntity';

export type SignatureProps = {
  accessPlanId: UniqueIdentifier;
  clientName: string;
  subscriptionDate: Date;
  pendingPayment: boolean;
  payments: Array<Payment>;
};
export default class Signature extends AggregateRoot<SignatureProps> {
  private constructor(props: SignatureProps, id: UniqueIdentifier) {
    super(props, id);
  }

  public static create(props: SignatureProps, id?: UniqueIdentifier) {
    DomainException.whenParameterIsNull(
      props,
      'could not create a signature without properties.',
    );

    return new Signature(props, id ?? undefined);
  }

  public static createAnNewSignature(
    planId: UniqueIdentifier,
    clientName: string,
    payValue: number,
  ): Signature {
    DomainException.whenParameterIsNull(
      planId,
      'could not create a new signature without a chosen plan.',
    );
    DomainException.whenParameterIsNull(
      clientName,
      'could not create a new signature without client name.',
    );

    const props: SignatureProps = {
      accessPlanId: planId,
      clientName,
      subscriptionDate: new Date(),
      payments: [Payment.createPay(payValue)],
      pendingPayment: true,
    };
    return Signature.create(props);
  }

  public editSignature(editSignature: {
    clientName: string;
    planId: string;
    pendingPayment: boolean;
  }): void {
    DomainException.whenParameterIsNull(editSignature, 'name is empty.');
    this.props.clientName = editSignature.clientName;
    this.props.pendingPayment = editSignature.pendingPayment;
    this.props.accessPlanId = UniqueIdentifier.create(editSignature.planId);
  }

  public createPay(valuePayed: number): void {
    this.props.payments.push(Payment.createPay(valuePayed));
  }

  public approvePayment(paymentId: UniqueIdentifier): void {
    this.props.payments.find((payment) => {
      if (payment.getId().equals(paymentId)) payment.approvePayment();
    });

    this.props.payments.some((payment) => {
      if (payment.isPending()) this.props.pendingPayment = true;
    });
  }

  public rejectPayment(paymentId: UniqueIdentifier): void {
    this.props.payments.find((payment) => {
      if (payment.getId().equals(paymentId)) payment.rejectPayment();
    });
  }
}
