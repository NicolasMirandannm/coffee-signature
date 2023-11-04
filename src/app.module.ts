import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from "@nestjs/config";
import AccessPlanModule from "./application/accessPlan/accessPlan.module";

@Module({
    imports: [
        ConfigModule.forRoot(),
        AccessPlanModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
