import { ApiProperty } from '@nestjs/swagger';

export class SignatureCreateDto {
  @ApiProperty({ description: 'ID do plano', example: 'abc123' })
  planId: string;

  @ApiProperty({
    description: 'ID do cliente',
    example: 'adga56df566f56f65fda6s5fd6a',
  })
  clientId: string;
}
