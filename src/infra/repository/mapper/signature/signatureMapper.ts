import IMapper from '../iMapper';
import Signature, {
  SignatureProps,
} from '../../../../domain/signature/signature';
import { SignatureEntity } from '../../../database/schemas/signature.schema';
import { Types } from 'mongoose';
import UniqueIdentifier from '../../../../shared/valueObjects/uniqueIdentifier.valueObj';
import { AccessPlanEntity } from '../../../database/schemas/accessPlan.schema';

export default class SignatureMapper
  implements IMapper<Signature, SignatureEntity>
{
  toDomain(signatureSchema: SignatureEntity): Signature {
    const signatureProps: SignatureProps = {
      accessPlanId: UniqueIdentifier.create(
        signatureSchema.accessPlan._id.toString(),
      ),
      pendingPayment: signatureSchema.pendingPayment,
      clientName: signatureSchema.clientName,
      subscriptionDate: signatureSchema.subscriptionDate,
    };
    return Signature.create(
      signatureProps,
      UniqueIdentifier.create(signatureSchema._id.toString()),
    );
  }

  toPersistence(domainSignature: Signature): SignatureEntity {
    const accessPlan = new AccessPlanEntity();
    accessPlan._id = new Types.ObjectId(
      domainSignature.getProps().accessPlanId.value,
    );

    const signatureSchema: SignatureEntity = {
      subscriptionDate: domainSignature.getProps().subscriptionDate,
      clientName: domainSignature.getProps().clientName,
      pendingPayment: domainSignature.getProps().pendingPayment,
      accessPlan,
    };

    if (domainSignature.getId() != null)
      signatureSchema._id = new Types.ObjectId(domainSignature.getId().value);

    return signatureSchema;
  }
}
