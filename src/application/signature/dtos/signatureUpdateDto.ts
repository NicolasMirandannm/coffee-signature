import { ApiProperty } from '@nestjs/swagger';

export class SignatureUpdateDto {
  @ApiProperty({ description: 'ID do plano', example: 'abc123' })
  planId: string;

  @ApiProperty({ description: 'Nome do cliente', example: 'eliel' })
  clientName: string;

  @ApiProperty({ description: 'Pagamento pendente', example: true })
  pendingPayment: boolean;
}
