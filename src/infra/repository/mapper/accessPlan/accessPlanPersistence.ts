import {ReceiverSchemaDocument} from "../../../database/schemas/receiver.schema";
import {AccessPlanSchemaDocument} from "../../../database/schemas/accessPlan.schema";

export type AccessPlanPersistence = {
    receiverSchema: Partial<ReceiverSchemaDocument>;
    accessPlanSchema: Partial<AccessPlanSchemaDocument>;
}