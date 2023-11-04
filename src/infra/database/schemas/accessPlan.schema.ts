import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose  from "mongoose";
import {ReceiverEntity} from "./receiver.schema";

export type AccessPlanSchemaDocument = mongoose.HydratedDocument<AccessPlanEntity>;

@Schema()
export class AccessPlanEntity {

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'ReceiverEntity'}], })
    receiver: ReceiverEntity
}

export const AccessPlanSchema = SchemaFactory.createForClass(AccessPlanEntity);