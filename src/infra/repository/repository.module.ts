import {Global, Module} from "@nestjs/common";
import AccessPlanMapper from "./mapper/accessPlan/accessPlanMapper";
import AccessPlanRepository from "./accessPlanRepository";
import MongodbModule from "../database/mongodb.module";

@Global()
@Module({
    imports: [MongodbModule],
    providers: [
        {
            provide: 'AccessPlanMapper',
            useClass: AccessPlanMapper
        },
        {
            provide: 'IAccessPlanRepository',
            useClass: AccessPlanRepository
        }
    ],
    exports: ['IAccessPlanRepository']
})
export default class RepositoryModule {
}