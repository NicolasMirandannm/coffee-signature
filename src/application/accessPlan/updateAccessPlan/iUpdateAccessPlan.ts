import {AccessPlanDto} from "../createAnAccessPlan/iCreateAnAccessPlan";
import AccessPlan from "../../../domain/accessPlan/accessPlan";

export default interface IUpdateAccessPlan {
    execute(id: string, accessPlanDto: AccessPlanDto): Promise<AccessPlan>;
}