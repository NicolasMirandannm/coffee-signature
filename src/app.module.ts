import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from "@nestjs/config";
import AccessPlanModule from "./application/accessPlan/accessPlan.module";
import SignatureModule from "./application/signature/signature.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AccessPlanModule,
        SignatureModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
