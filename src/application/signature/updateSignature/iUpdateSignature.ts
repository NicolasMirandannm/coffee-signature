import {SignatureUpdateDto} from "../dtos/signatureUpdateDto";
import Signature from "../../../domain/signature/signature";

export default interface IUpdateSignature {
    execute(id: string, signatureUpdateDto: SignatureUpdateDto): Promise<Signature>
}