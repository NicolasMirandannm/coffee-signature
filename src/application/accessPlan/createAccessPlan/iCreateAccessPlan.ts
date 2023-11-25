import { ApiProperty } from '@nestjs/swagger';

export class ReceiverDto {
  @ApiProperty({ description: 'Nome do recebedor', example: 'nicolas' })
  name: string;

  @ApiProperty({ description: 'CPF do recebedor', example: '123.456.789-10' })
  cpf: string;

  @ApiProperty({
    description: 'Chave PIX do recebedor',
    example: 'pix@exemplo',
  })
  pixKey: string;
}

export class AccessPlanDto {
  @ApiProperty({ description: 'Nome do plano', example: 'Plano Premium' })
  planName: string;

  @ApiProperty({ description: 'Preço do plano', example: 50.0 })
  price: number;

  @ApiProperty({
    description: 'Descrição do plano',
    example: 'Plano com benefícios X, Y, Z',
  })
  description: string;

  @ApiProperty({ type: ReceiverDto, description: 'Informações do recebedor' })
  receiver: ReceiverDto;
}

export default interface ICreateAccessPlan {
  execute(accessPlanDto: AccessPlanDto): Promise<void>;
}
