import IRepository from '../../shared/repository/iRepository';
import ISignatureRepository from '../../domain/repository/iSignatureRepository';
import Signature from '../../domain/signature/signature';
import { Model, Promise, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { SignatureEntity } from '../database/schemas/signature.schema';
import { Inject } from '@nestjs/common';
import IMapper from './mapper/iMapper';
import InfraException from '../../shared/exceptions/infraException';

export default class SignatureRepository implements ISignatureRepository {
  constructor(
    @InjectModel(SignatureEntity.name)
    private readonly signatureModel: Model<SignatureEntity>,
    @Inject('ISignatureMapper')
    private readonly mapper: IMapper<Signature, SignatureEntity>,
  ) {}

  async delete(id: string): Promise<void> {
    await this.signatureModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .orFail(new InfraException('signature does not exists!'));
  }

  async findAll(): Promise<Array<Signature>> {
    const signatureSchema: SignatureEntity[] = await this.signatureModel.find();
    return signatureSchema.map((signature) => {
      return this.mapper.toDomain(signature);
    });
  }

  async findById(id: string): Promise<Signature> {
    const signatureSchema = await this.signatureModel.findById(
      new Types.ObjectId(id),
    );
    if (!signatureSchema) return null;
    return this.mapper.toDomain(signatureSchema);
  }

  async save(signature: Signature): Promise<void> {
    const signatureSchema = this.mapper.toPersistence(signature);
    const signatureModel = new this.signatureModel({
      ...signatureSchema,
      _id: new Types.ObjectId(),
    });

    await signatureModel.save();
  }

  async update(signature: Signature): Promise<void> {
    const signatureSchema = this.mapper.toPersistence(signature);
    await this.signatureModel.findByIdAndUpdate(
      signatureSchema._id,
      signatureSchema,
    );
  }

  async findByClientId(clientId: string): Promise<Signature> {
    const signatureFound = await this.signatureModel.findOne({ clientId });
    if (!signatureFound) return null;
    return this.mapper.toDomain(signatureFound);
  }
}
