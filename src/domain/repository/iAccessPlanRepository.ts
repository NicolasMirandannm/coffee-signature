import IRepository from "../../shared/repository/iRepository";
import AccessPlan from "../accessPlan/accessPlan";

export default interface IAccessPlanRepository extends IRepository<AccessPlan> {
    save(accessPlan: AccessPlan): Promise<void>;
}