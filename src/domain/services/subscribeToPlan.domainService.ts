import Signature from '../signature/signature';
import AccessPlan from '../accessPlan/accessPlan';
import DomainException from '../../shared/exceptions/domainException';

export default class SubscribeToPlanDomainService {
  subscribe(plan: AccessPlan, userIdentifier: string): Signature {
    DomainException.whenParameterIsNull(
      plan,
      'cannot create a signature without access plan.',
    );

    return Signature.createAnNewSignature(
      plan.getId(),
      userIdentifier,
      plan.getProps().price,
    );
  }
}
