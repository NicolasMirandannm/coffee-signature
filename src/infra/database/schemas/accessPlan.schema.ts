import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import * as mongoose  from "mongoose";
import {ReceiverEntity, ReceiverSchemaDocument} from "./receiver.schema";
import {Types} from "mongoose";

export type AccessPlanSchemaDocument = mongoose.HydratedDocument<AccessPlanEntity>;

@Schema({_id: true})
export class AccessPlanEntity {

    @Prop({type: Types.ObjectId})
    _id?: Types.ObjectId;

    @Prop()
    name: string;

    @Prop()
    price: number;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'ReceiverEntity',  })
    receiver: ReceiverEntity
}

export const AccessPlanSchema = SchemaFactory.createForClass(AccessPlanEntity);