import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import ICreateAccessPlan, {
  AccessPlanDto,
} from './createAccessPlan/iCreateAccessPlan';
import IFindAccessPlan from './findAccessPlans/iFindAccessPlan';
import AccessPlan from '../../domain/accessPlan/accessPlan';
import IUpdateAccessPlan from './updateAccessPlan/iUpdateAccessPlan';
import IDeleteAccessPlan from './deleteAccessPlan/iDeleteAccessPlan';

@Controller('access-plan')
export default class AccessPlanRestController {
  constructor(
    @Inject('ICreateAnAccessPlan')
    private readonly createAnAccessPlanService: ICreateAccessPlan,
    @Inject('IFindAccessPlan')
    private readonly findAccessPlanService: IFindAccessPlan,
    @Inject('IUpdateAccessPlan')
    private readonly updateAccessPlanService: IUpdateAccessPlan,
    @Inject('IDeleteAccessPlan')
    private readonly deleteAccessPlanService: IDeleteAccessPlan,
  ) {}

  @Get()
  findAll(): Promise<AccessPlan[]> {
    return this.findAccessPlanService.findAll();
  }

  @Get('find')
  findByName(@Query('name') name: string): Promise<AccessPlan> {
    return this.findAccessPlanService.findByClientName(name);
  }

  @Post('create')
  create(@Body() accessPlanDto: AccessPlanDto): Promise<void> {
    return this.createAnAccessPlanService.execute(accessPlanDto);
  }

  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() accessPlanDto: AccessPlanDto,
  ): Promise<AccessPlan> {
    return this.updateAccessPlanService.execute(id, accessPlanDto);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string): Promise<string> {
    return (await this.deleteAccessPlanService.execute(id))
      ? 'success on delete!'
      : 'fail on delete!';
  }
}
