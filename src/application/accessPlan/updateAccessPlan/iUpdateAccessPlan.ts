import { AccessPlanDto } from '../createAccessPlan/iCreateAccessPlan';
import AccessPlan from '../../../domain/accessPlan/accessPlan';

export default interface IUpdateAccessPlan {
  execute(id: string, accessPlanDto: AccessPlanDto): Promise<AccessPlan>;
}
