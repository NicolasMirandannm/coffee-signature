import {ReceiverEntity, ReceiverSchemaDocument} from "../../../database/schemas/receiver.schema";
import {AccessPlanEntity, AccessPlanSchemaDocument} from "../../../database/schemas/accessPlan.schema";

export type AccessPlanPersistence = {
    receiverSchema: ReceiverEntity;
    accessPlanSchema: AccessPlanEntity;
}