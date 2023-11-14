import { ReceiverEntity } from '../../../database/schemas/receiver.schema';
import { AccessPlanEntity } from '../../../database/schemas/accessPlan.schema';

export type AccessPlanPersistence = {
  receiverSchema: ReceiverEntity;
  accessPlanSchema: AccessPlanEntity;
};
