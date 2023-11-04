import IFindSignatures from "./iFindSignatures";
import Signature from "../../../domain/signature/signature";
import {Promise} from "mongoose";
import {Inject} from "@nestjs/common";
import ISignatureRepository from "../../../domain/repository/iSignatureRepository";

export default class FindSignatureService implements IFindSignatures {
    constructor(
        @Inject('ISignatureRepository')
        private readonly signatureRepository: ISignatureRepository
    ) {}
    async findAll(): Promise<Array<Signature>> {
        return await this.signatureRepository.findAll();
    }

    async findById(id: string): Promise<Signature> {
        return await this.signatureRepository.findById(id);
    }

}