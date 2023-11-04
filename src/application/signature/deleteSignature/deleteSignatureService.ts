import IDeleteSignature from "./iDeleteSignature";
import {Inject} from "@nestjs/common";
import ISignatureRepository from "../../../domain/repository/iSignatureRepository";
import {Promise} from "mongoose";

export default class DeleteSignatureService implements IDeleteSignature {
    constructor(
        @Inject('ISignatureRepository')
        private readonly signatureRepository: ISignatureRepository
    ) {}

    async execute(id: string): Promise<void> {
        await this.signatureRepository.delete(id);
    }
}