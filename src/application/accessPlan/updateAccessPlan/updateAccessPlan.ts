import IUpdateAccessPlan from './iUpdateAccessPlan';
import { AccessPlanDto } from '../createAccessPlan/iCreateAccessPlan';
import AccessPlan, {
  AccessPlanProps,
} from '../../../domain/accessPlan/accessPlan';
import Receiver from '../../../domain/accessPlan/entities/receiver.domainEntity';
import { Inject } from '@nestjs/common';
import IAccessPlanRepository from '../../../domain/repository/iAccessPlanRepository';
import UniqueIdentifier from '../../../shared/valueObjects/uniqueIdentifier.valueObj';
import ApplicationException from '../../../shared/exceptions/applicationException';

export default class UpdateAccessPlan implements IUpdateAccessPlan {
  constructor(
    @Inject('IAccessPlanRepository')
    private readonly accessPlanRepository: IAccessPlanRepository,
  ) {}

  async execute(id: string, accessPlanDto: AccessPlanDto): Promise<AccessPlan> {
    const accessPlanExists = await this.accessPlanRepository.findById(id);
    ApplicationException.whenParameterIsNull(
      accessPlanExists,
      'accessPlan does not exists.',
    );

    const receiver = Receiver.create(
      {
        name: accessPlanDto.receiver.name,
        pixKey: accessPlanDto.receiver.pixKey,
        cpf: accessPlanDto.receiver.cpf,
      },
      UniqueIdentifier.create(
        accessPlanExists.getProps().receiver.getId().value,
      ),
    );

    const props: AccessPlanProps = {
      planName: accessPlanDto.planName,
      price: accessPlanDto.price,
      receiver,
      description: accessPlanDto.description,
    };

    const accessPlan = AccessPlan.create(props, UniqueIdentifier.create(id));
    await this.accessPlanRepository.update(accessPlan);
    return accessPlan;
  }
}
