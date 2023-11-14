import IDeleteAccessPlan from './iDeleteAccessPlan';
import { Inject } from '@nestjs/common';
import IAccessPlanRepository from '../../../domain/repository/iAccessPlanRepository';

export default class DeleteAccessPlan implements IDeleteAccessPlan {
  constructor(
    @Inject('IAccessPlanRepository')
    private readonly accessPlanRepository: IAccessPlanRepository,
  ) {}
  async execute(id: string): Promise<boolean> {
    await this.accessPlanRepository.delete(id);
    return true;
  }
}
