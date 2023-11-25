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
import ICreateSignature from './createSignature/iCreateSignature';
import IFindSignatures from './findSignatures/iFindSignatures';
import IUpdateSignature from './updateSignature/iUpdateSignature';
import IDeleteSignature from './deleteSignature/iDeleteSignature';
import Signature from '../../domain/signature/signature';
import { SignatureCreateDto } from './dtos/signatureCreateDto';
import { SignatureUpdateDto } from './dtos/signatureUpdateDto';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Signature')
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
          clientName: 'Nicolas Leonardo Miranda Lima',
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
}
