import IMapper from '../iMapper';
import AccessPlan, {
  AccessPlanProps,
} from '../../../../../domain/accessPlan/accessPlan';
import { AccessPlanPersistence } from './accessPlanPersistence';
import { Injectable } from '@nestjs/common';
import { AccessPlanEntity } from '../../../../database/schemas/accessPlan.schema';
import Receiver, {
  ReceiverProps,
} from '../../../../../domain/accessPlan/entities/receiver.domainEntity';
import UniqueIdentifier from '../../../../../shared/valueObjects/uniqueIdentifier.valueObj';
import InfraException from '../../../../../shared/exceptions/infraException';
import { ReceiverEntity } from '../../../../database/schemas/receiver.schema';
import { Types } from 'mongoose';

@Injectable()
export default class AccessPlanMapper
  implements IMapper<AccessPlan, AccessPlanPersistence>
{
  constructor() {}

  toDomain(schema: AccessPlanPersistence): AccessPlan {
    InfraException.whenParameterIsNull(
      schema,
      'could not create a domain accessPlan without schema.',
    );
    InfraException.whenParameterIsNull(
      schema.accessPlanSchema,
      'could not create a domain accessPlan without accessPlanSchema.',
    );
    InfraException.whenParameterIsNull(
      schema.receiverSchema,
      'could not create a domain accessPlan without receiverSchema.',
    );

    const { receiverSchema, accessPlanSchema } = schema;

    const receiverProps: ReceiverProps = {
      name: receiverSchema.name,
      cpf: receiverSchema.cpf,
      pixKey: receiverSchema.pixKey,
    };
    const receiver = Receiver.create(
      receiverProps,
      UniqueIdentifier.create(receiverSchema._id.toString()),
    );
    const accessPlanProps: AccessPlanProps = {
      planName: accessPlanSchema.name,
      description: accessPlanSchema.description,
      price: accessPlanSchema.price,
      receiver,
    };
    return AccessPlan.create(
      accessPlanProps,
      UniqueIdentifier.create(accessPlanSchema._id.toString()),
    );
  }

  toPersistence(accessPlan: AccessPlan): AccessPlanPersistence {
    InfraException.whenParameterIsNull(
      accessPlan,
      'could not map to persistence without domain accessPlan.',
    );

    const receiver = accessPlan.getReceiver();

    const receiverSchema: ReceiverEntity = {
      name: receiver.name,
      cpf: receiver.cpf,
      pixKey: receiver.pixKey,
    };

    if (accessPlan.getProps().receiver.getId()) {
      receiverSchema._id = new Types.ObjectId(
        accessPlan.getProps().receiver.getId().value,
      );
    }

    const accessPlanSchema: AccessPlanEntity = {
      name: accessPlan.getProps().planName,
      price: accessPlan.getProps().price,
      description: accessPlan.getProps().description,
      receiver: receiverSchema,
    };

    if (accessPlan.getId()) {
      accessPlanSchema._id = new Types.ObjectId(accessPlan.getId().value);
    }
    return {
      accessPlanSchema,
      receiverSchema,
    };
  }
}
