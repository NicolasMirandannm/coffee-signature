import IMapper from "../iMapper";
import AccessPlan, {AccessPlanProps} from "../../../../domain/accessPlan/accessPlan";
import {AccessPlanPersistence} from "./accessPlanPersistence";
import {Injectable} from "@nestjs/common";
import {AccessPlanSchemaDocument} from "../../../database/schemas/accessPlan.schema";
import Receiver, {ReceiverProps} from "../../../../domain/accessPlan/entities/receiver.domainEntity";
import UniqueIdentifier from "../../../../shared/valueObjects/uniqueIdentifier.valueObj";
import InfraException from "../../../../shared/exceptions/infraException";
import {ReceiverSchemaDocument} from "../../../database/schemas/receiver.schema";
import {Types} from "mongoose";


@Injectable()
export default class AccessPlanMapper implements IMapper<AccessPlan, AccessPlanPersistence> {
    constructor() {}

    toDomain(schema: AccessPlanPersistence): AccessPlan {
        InfraException.whenParameterIsNull(schema, "could not create a domain accessPlan without schema.");
        InfraException.whenParameterIsNull(schema.accessPlan, "could not create a domain accessPlan without accessPlanSchema.");
        InfraException.whenParameterIsNull(schema.receiver, "could not create a domain accessPlan without receiverSchema.");


        const receiverProps: ReceiverProps = {
            name: schema.receiver.name,
            cpf: schema.receiver.cpf,
            pixKey: schema.receiver.pixKey
        }
        const receiver = Receiver.create(receiverProps, UniqueIdentifier.create(schema.receiver._id.toString()));
        const accessPlanProps: AccessPlanProps = {
            planName: schema.accessPlan.name,
            description: schema.accessPlan.description,
            price: schema.accessPlan.price,
            receiver
        }
        return AccessPlan.create(accessPlanProps, UniqueIdentifier.create(schema.accessPlan._id.toString()))
    }

    toPersistence(accessPlanSchema: AccessPlan): AccessPlanPersistence {
        const accessPlan: Partial<AccessPlanSchemaDocument> = {
            _id: new Types.ObjectId(accessPlanSchema.getId().value),
            name: accessPlanSchema.getProps().planName,
            price: accessPlanSchema.getProps().price,
            description: accessPlanSchema.getProps().description,
        }

        const receiver: Partial<ReceiverSchemaDocument> = {
            _id: new Types.ObjectId(accessPlanSchema.getProps().receiver.getId().value),
            name: accessPlanSchema.getProps().receiver.getProps().name,
            cpf: accessPlanSchema.getProps().receiver.getProps().cpf,
            pixKey: accessPlanSchema.getProps().receiver.getProps().pixKey
        }

        return {
            accessPlan,
            receiver
        }
    }
}