import Signature from "../../../domain/signature/signature";

export default interface IFindSignatures {
    findById(id: string): Promise<Signature>;
    findAll(): Promise<Array<Signature>>;
}