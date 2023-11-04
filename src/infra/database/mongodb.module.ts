import {Module} from "@nestjs/common";
import {MongooseModule, MongooseModuleOptions} from "@nestjs/mongoose";
import {ReceiverEntity, ReceiverSchema} from "./schemas/receiver.schema";
import {AccessPlanEntity, AccessPlanSchema} from "./schemas/accessPlan.schema";
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SignatureEntity} from "./schemas/signature.schema";

@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService): MongooseModuleOptions => {
                return {
                    uri: configService.get<string>('URI_MONGO'),
                }
            },
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            {
                name: ReceiverEntity.name,
                schema: ReceiverSchema
            },
            {
                name: AccessPlanEntity.name,
                schema: AccessPlanSchema
            },
            {
                name: SignatureEntity.name,
                schema: SignatureEntity
            }
        ])
    ],
    exports: [MongooseModule]
})
export default class MongodbModule {
}


