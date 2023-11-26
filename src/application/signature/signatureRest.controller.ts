import {
  Body,
  Controller,
  Delete,
  ExecutionContext,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import ICreateSignature from './createSignature/iCreateSignature';
import IFindSignatures from './findSignatures/iFindSignatures';
import IUpdateSignature from './updateSignature/iUpdateSignature';
import IDeleteSignature from './deleteSignature/iDeleteSignature';
import Signature from '../../domain/signature/signature';
import { SignatureCreateDto } from './dtos/signatureCreateDto';
import { SignatureUpdateDto } from './dtos/signatureUpdateDto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import CancelSignatureService from './cancelSignature/cancelSignatureService';
import ActiveSignatureService from './activeSignature/activeSignatureService';
import { Request } from 'express';

@ApiTags('Signature')
@ApiSecurity('JWT-auth')
@Controller('signature')
export default class SignatureRestController {
  constructor(
    @Inject('ICreateSignature')
    private readonly createSignatureService: ICreateSignature,
    @Inject('IFindSignatures')
    private readonly findSignatureService: IFindSignatures,
    @Inject('IUpdateSignature')
    private readonly updateSignatureService: IUpdateSignature,
    @Inject('IDeleteSignature')
    private readonly deleteSignatureService: IDeleteSignature,
    private readonly cancelSignatureService: CancelSignatureService,
    private readonly activeSignatureService: ActiveSignatureService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: Signature, isArray: true })
  findAll(): Promise<Signature[]> {
    return this.findSignatureService.findAll();
  }

  @Get('find')
  @ApiParam({ name: 'id', required: true, description: 'ID da assinatura' })
  @ApiResponse({ status: 200, type: Signature })
  findById(@Query('id') id: string): Promise<Signature> {
    return this.findSignatureService.findById(id);
  }

  @Post('create')
  @ApiBody({
    type: SignatureCreateDto,
    examples: {
      examplo: {
        value: {
          clientId: 'das-d09-asdas-0d9as-ddas',
          planId: 'abc123',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Assinatura criada com sucesso' })
  create(@Body() signatureDto: SignatureCreateDto): Promise<void> {
    return this.createSignatureService.execute(signatureDto);
  }

  @Patch('update/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID da assinatura' })
  @ApiBody({ type: SignatureUpdateDto })
  @ApiResponse({ status: 200, type: Signature })
  update(
    @Param('id') id: string,
    @Body() signatureDto: SignatureUpdateDto,
  ): Promise<Signature> {
    return this.updateSignatureService.execute(id, signatureDto);
  }

  @Delete('delete/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID da assinatura' })
  @ApiResponse({ status: 200 })
  async delete(@Param('id') id: string): Promise<void> {
    return await this.deleteSignatureService.execute(id);
  }

  @Put('cancel/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID da assinatura' })
  @ApiResponse({
    status: 200,
    description: 'quando o cancelamento ocorrer com sucesso.',
  })
  async cancelSignature(@Param('id') id: string): Promise<void> {
    return await this.cancelSignatureService.execute(id);
  }

  @Put('active/:id')
  @ApiParam({ name: 'id', required: true, description: 'ID da assinatura' })
  @ApiResponse({
    status: 200,
    description: 'quando a ativação da assinatura ocorrer com sucesso.',
  })
  async activeSignature(@Param('id') id: string): Promise<void> {
    return await this.activeSignatureService.execute(id);
  }
}
