import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import MongodbModule from "./infra/database/mongodb.module";
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongodbModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule {
}
