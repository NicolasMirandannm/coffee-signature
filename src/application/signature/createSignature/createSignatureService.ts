import ICreateSignature from "./iCreateSignature";
import {SignatureCreateDto} from "../dtos/signatureCreateDto";
import {Inject} from "@nestjs/common";
import ISignatureRepository from "../../../domain/repository/iSignatureRepository";
import ApplicationException from "../../../shared/exceptions/applicationException";
import Signature from "../../../domain/signature/signature";
import UniqueIdentifier from "../../../shared/valueObjects/uniqueIdentifier.valueObj";

export default class CreateSignatureService implements ICreateSignature {
    constructor(
        @Inject('ISignatureRepository')
        private readonly signatureRepository: ISignatureRepository
    ) {}
    async execute(signatureDto: SignatureCreateDto): Promise<void> {
        ApplicationException.whenParameterIsNull(signatureDto, 'could not create a signature without his properties.');
        ApplicationException.whenAnyPropInParameterIsNull(signatureDto);

        const { clientName, planId } = signatureDto;
        const newSignature = Signature.createAnNewSignature(UniqueIdentifier.create(planId), clientName);

        await this.signatureRepository.save(newSignature);
    }
}