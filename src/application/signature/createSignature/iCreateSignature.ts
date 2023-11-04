import {SignatureCreateDto} from "../dtos/signatureCreateDto";

export default interface ICreateSignature {
    execute(signatureDto: SignatureCreateDto): Promise<void>;
}