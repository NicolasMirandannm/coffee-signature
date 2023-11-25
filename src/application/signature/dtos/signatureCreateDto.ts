import { ApiProperty } from '@nestjs/swagger';

export class SignatureCreateDto {
  @ApiProperty({ description: 'ID do plano', example: 'abc123' })
  planId: string;

  @ApiProperty({ description: 'Nome do cliente', example: 'nicolas' })
  clientName: string;
}
