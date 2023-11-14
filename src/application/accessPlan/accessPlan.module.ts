import { Module } from '@nestjs/common';
import RepositoryModule from '../../infra/repository/repository.module';
import CreateAccessPlan from './createAccessPlan/createAccessPlan';
import FindAccessPlan from './findAccessPlans/findAccessPlan';
import AccessPlanRestController from './accessPlanRest.controller';
import UpdateAccessPlan from './updateAccessPlan/updateAccessPlan';
import DeleteAccessPlan from './deleteAccessPlan/deleteAccessPlan';

@Module({
  imports: [RepositoryModule],
  controllers: [AccessPlanRestController],
  providers: [
    {
      provide: 'ICreateAnAccessPlan',
      useClass: CreateAccessPlan,
    },
    {
      provide: 'IFindAccessPlan',
      useClass: FindAccessPlan,
    },
    {
      provide: 'IUpdateAccessPlan',
      useClass: UpdateAccessPlan,
    },
    {
      provide: 'IDeleteAccessPlan',
      useClass: DeleteAccessPlan,
    },
  ],
})
export default class AccessPlanModule {}
