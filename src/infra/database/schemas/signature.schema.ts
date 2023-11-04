import {HydratedDocument, Types} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {AccessPlanEntity} from "./accessPlan.schema";
import mongoose from "mongoose";
import {ReceiverEntity} from "./receiver.schema";

export type SignatureSchemaDocument = HydratedDocument<SignatureEntity>;

@Schema({_id: true})
export class SignatureEntity {

    @Prop({type: Types.ObjectId})
    _id?: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'AccessPlanEntity',  })
    accessPlan?: AccessPlanEntity;

    @Prop()
    clientName: string;

    @Prop()
    subscriptionDate: Date;

    @Prop()
    pendingPayment: boolean;
}

export const SignatureSchema = SchemaFactory.createForClass(SignatureEntity);