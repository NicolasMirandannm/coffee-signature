import {Global, Module} from "@nestjs/common";
import AccessPlanMapper from "./mapper/accessPlan/accessPlanMapper";

@Global()
@Module({
    providers: [
        {
            provide: 'AccessPlanMapper',
            useClass: AccessPlanMapper
        }
    ]
})
export default class RepositoryModule {}