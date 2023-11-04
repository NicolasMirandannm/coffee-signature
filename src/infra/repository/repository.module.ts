import {Global, Module} from "@nestjs/common";
import AccessPlanMapper from "./mapper/accessPlan/accessPlanMapper";
import AccessPlanRepository from "./accessPlanRepository";
import MongodbModule from "../database/mongodb.module";
import SignatureMapper from "./mapper/signature/signatureMapper";
import SignatureRepository from "./signatureRepository";

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
        },
        {
            provide: 'ISignatureMapper',
            useClass: SignatureMapper
        },
        {
            provide: 'SignatureRepository',
            useClass: SignatureRepository
        },
    ],
    exports: ['IAccessPlanRepository', 'SignatureRepository']
})
export default class RepositoryModule {
}