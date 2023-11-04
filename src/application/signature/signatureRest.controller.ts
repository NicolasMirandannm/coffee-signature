import {Body, Controller, Delete, Get, Inject, Param, Patch, Post, Query} from "@nestjs/common";
import ICreateSignature from "./createSignature/iCreateSignature";
import IFindSignatures from "./findSignatures/iFindSignatures";
import IUpdateSignature from "./updateSignature/iUpdateSignature";
import IDeleteSignature from "./deleteSignature/iDeleteSignature";
import Signature from "../../domain/signature/signature";
import {SignatureCreateDto} from "./dtos/signatureCreateDto";
import {SignatureUpdateDto} from "./dtos/signatureUpdateDto";

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
    ) {
    }

    @Get()
    findAll(): Promise<Signature[]> {
        return this.findSignatureService.findAll();
    }

    @Get('find')
    findById(@Query('id') id: string): Promise<Signature> {
        return this.findSignatureService.findById(id);
    }

    @Post('create')
    create(@Body() signatureDto: SignatureCreateDto): Promise<void> {
        return this.createSignatureService.execute(signatureDto);
    }

    @Patch('update/:id')
    update(@Param('id') id: string, @Body() signatureDto: SignatureUpdateDto): Promise<Signature> {
        return this.updateSignatureService.execute(id, signatureDto);
    }

    @Delete('delete/:id')
    async delete(@Param('id') id: string): Promise<void> {
        return await this.deleteSignatureService.execute(id);
    }
}