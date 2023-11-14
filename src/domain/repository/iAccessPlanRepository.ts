import IRepository from '../../shared/repository/iRepository';
import AccessPlan from '../accessPlan/accessPlan';

export default interface IAccessPlanRepository extends IRepository<AccessPlan> {
  findByClientName(name: string): Promise<AccessPlan>;
}
