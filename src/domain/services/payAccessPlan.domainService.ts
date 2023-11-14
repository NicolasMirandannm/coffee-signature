import Signature from '../signature/signature';
import AccessPlan from '../accessPlan/accessPlan';
import DomainException from '../../shared/exceptions/domainException';

export default class PayAccessPlanDomainService {
  pay(plan: AccessPlan, signature: Signature): Signature {
    DomainException.whenParameterIsNull(
      plan,
      'cannot pay the signature without plan.',
    );
    DomainException.whenParameterIsNull(
      signature,
      'cannot pay the signature without signature.',
    );

    signature.createPay(plan.getProps().price);
    return signature;
  }
}
