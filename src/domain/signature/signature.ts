import AggregateRoot from '../../shared/aggregateRoot/aggregateRoot';
import UniqueIdentifier from '../../shared/valueObjects/uniqueIdentifier.valueObj';
import DomainException from '../../shared/exceptions/domainException';
import e from 'express';

export type SignatureProps = {
  accessPlanId: UniqueIdentifier;
  clientId: string;
  subscriptionDate: Date;
  pendingPayment: boolean;
  isActive: boolean;
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
    clientId: string,
  ): Signature {
    DomainException.whenParameterIsNull(
      planId,
      'could not create a new signature without a chosen plan.',
    );
    DomainException.whenParameterIsNull(
      clientId,
      'could not create a new signature without client id.',
    );

    const props: SignatureProps = {
      accessPlanId: planId,
      clientId: clientId,
      subscriptionDate: new Date(),
      pendingPayment: true,
      isActive: true,
    };
    return Signature.create(props);
  }

  public editSignature(editSignature: {
    clientId: string;
    planId: string;
    pendingPayment: boolean;
  }): void {
    DomainException.whenParameterIsNull(editSignature, 'name is empty.');
    this.props.clientId = editSignature.clientId;
    this.props.pendingPayment = editSignature.pendingPayment;
    this.props.accessPlanId = UniqueIdentifier.create(editSignature.planId);
  }

  public cancelSignature(): void {
    if (this.props.isActive === false)
      throw new DomainException('signature is already canceled.');
    this.props.isActive = false;
  }

  public activeSignature(): void {
    if (this.props.isActive === true)
      throw new DomainException('signature is already active.');
    this.props.isActive = true;
  }
}
