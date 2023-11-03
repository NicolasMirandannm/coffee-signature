import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {HydratedDocument} from "mongoose";

export type ReceiverSchemaDocument = HydratedDocument<ReceiverEntity>;
@Schema()
export class ReceiverEntity {
    @Prop()
    name: string;

    @Prop({unique: true})
    cpf: string;

    @Prop()
    pixKey: string;
}

export const ReceiverSchema = SchemaFactory.createForClass(ReceiverEntity);