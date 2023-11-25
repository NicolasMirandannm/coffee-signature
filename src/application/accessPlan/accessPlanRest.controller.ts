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
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import Signature from '../../domain/signature/signature';

@ApiTags('Access Plan')
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
  @ApiResponse({ status: 200, type: AccessPlan, isArray: true })
  findAll(): Promise<AccessPlan[]> {
    return this.findAccessPlanService.findAll();
  }

  @Get('find')
  @ApiParam({ name: 'name', required: true, description: 'Nome do plano' })
  @ApiResponse({ status: 200, type: AccessPlan })
  findByName(@Query('name') name: string): Promise<AccessPlan> {
    return this.findAccessPlanService.findByClientName(name);
  }

  @Post('create')
  @ApiBody({
    type: AccessPlanDto,
    examples: {
      exemplo: {
        value: {
          planName: 'Plano Premium',
          price: 50.0,
          description: 'Plano premium com benefícios exclusivos',
          receiver: {
            name: 'Eliel Lima de Aguiar',
            cpf: '123.456.789-10',
            pixKey: 'chave@pix',
          },
        },
      },
    },
  })
  @ApiResponse({ status: 201, description: 'Plano criado com sucesso' })
  create(@Body() accessPlanDto: AccessPlanDto): Promise<void> {
    return this.createAnAccessPlanService.execute(accessPlanDto);
  }

  @Patch('update/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID do plano' })
  @ApiBody({ type: AccessPlanDto })
  @ApiResponse({ status: 200, type: AccessPlan })
  update(
    @Param('id') id: string,
    @Body() accessPlanDto: AccessPlanDto,
  ): Promise<AccessPlan> {
    return this.updateAccessPlanService.execute(id, accessPlanDto);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID do plano' })
  @ApiResponse({
    status: 200,
    description: 'Mensagem de sucesso ou falha na exclusão',
  })
  async delete(@Param('id') id: string): Promise<string> {
    return (await this.deleteAccessPlanService.execute(id))
      ? 'success on delete!'
      : 'fail on delete!';
  }
}
