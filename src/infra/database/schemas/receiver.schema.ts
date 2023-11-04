import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument, Types} from "mongoose";

export type ReceiverSchemaDocument = HydratedDocument<ReceiverEntity>;
@Schema({_id: true})
export class ReceiverEntity {

    @Prop({type: Types.ObjectId})
    _id?: Types.ObjectId;

    @Prop()
    name: string;

    @Prop({unique: true})
    cpf: string;

    @Prop()
    pixKey: string;
}

export const ReceiverSchema = SchemaFactory.createForClass(ReceiverEntity);