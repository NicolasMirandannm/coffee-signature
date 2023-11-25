import { Inject, Injectable } from '@nestjs/common';
import IRepository from '../../shared/repository/iRepository';
import AccessPlan from '../../domain/accessPlan/accessPlan';
import { InjectModel } from '@nestjs/mongoose';
import {
  AccessPlanEntity,
  AccessPlanSchemaDocument,
} from '../database/schemas/accessPlan.schema';
import { Model, Promise, Types } from 'mongoose';
import { ReceiverEntity } from '../database/schemas/receiver.schema';
import IMapper from './mapper/iMapper';
import { AccessPlanPersistence } from './mapper/accessPlan/accessPlanPersistence';
import IAccessPlanRepository from '../../domain/repository/iAccessPlanRepository';
import InfraException from '../../shared/exceptions/infraException';

@Injectable()
export default class AccessPlanRepository implements IAccessPlanRepository {
  constructor(
    @InjectModel(AccessPlanEntity.name)
    private readonly accessPlanModel: Model<AccessPlanEntity>,
    @InjectModel(ReceiverEntity.name)
    private readonly receiverModel: Model<ReceiverEntity>,
    @Inject('AccessPlanMapper')
    private readonly mapper: IMapper<AccessPlan, AccessPlanPersistence>,
  ) {}

  async save(domainAccessPlan: AccessPlan): Promise<void> {
    const { accessPlanSchema, receiverSchema } =
      this.mapper.toPersistence(domainAccessPlan);
    let receiver = await this.findReceiver(
      receiverSchema,
      domainAccessPlan.getReceiver().cpf,
    );

    const accessPlan = new this.accessPlanModel({
      ...accessPlanSchema,
      _id: new Types.ObjectId(),
      receiver,
    });
    await accessPlan.save();
  }

  private async findReceiver(
    receiverSchema: ReceiverEntity,
    cpf: string,
  ): Promise<ReceiverEntity> {
    let receiver = await this.receiverModel.findOne({ cpf });

    if (receiver == null) {
      receiver = new this.receiverModel({
        _id: new Types.ObjectId(),
        name: receiverSchema.name,
        cpf: receiverSchema.cpf,
        pixKey: receiverSchema.pixKey,
      });
      await receiver.save();
    }

    return receiver;
  }

  async findAll(): Promise<Array<AccessPlan>> {
    const accessPlanDocument: AccessPlanEntity[] = await this.accessPlanModel
      .find()
      .populate('receiver');

    return accessPlanDocument.map((accessPlan) => {
      return this.mapper.toDomain({
        accessPlanSchema: accessPlan,
        receiverSchema: accessPlan.receiver,
      });
    });
  }

  async findById(id: string): Promise<AccessPlan> {
    InfraException.whenParameterIsNull(id, 'could not find by undefined id.');

    const accessPlan: AccessPlanEntity = await this.accessPlanModel
      .findById(new Types.ObjectId(id))
      .populate('receiver');
    return this.mapper.toDomain({
      accessPlanSchema: accessPlan,
      receiverSchema: accessPlan.receiver,
    });
  }

  async findByClientName(name: string): Promise<AccessPlan> {
    InfraException.whenParameterIsNull(
      name,
      'could not find by undefined name.',
    );

    const accessPlan: AccessPlanSchemaDocument = await this.accessPlanModel
      .findOne({ name })
      .populate('receiver');
    if (accessPlan == null) return null;

    return this.mapper.toDomain({
      accessPlanSchema: accessPlan,
      receiverSchema: accessPlan.receiver,
    });
  }
  async update(accessPlan: AccessPlan): Promise<void> {
    const { accessPlanSchema, receiverSchema } =
      this.mapper.toPersistence(accessPlan);

    await this.accessPlanModel.findByIdAndUpdate(
      accessPlanSchema._id,
      accessPlanSchema,
    );
    await this.receiverModel.findByIdAndUpdate(
      receiverSchema._id,
      receiverSchema,
    );
  }

  async delete(id: string): Promise<void> {
    await this.accessPlanModel
      .findByIdAndDelete(new Types.ObjectId(id))
      .orFail(new InfraException('accessPlan does not exists!'));
  }

  async findByName(planName: string): Promise<AccessPlan> {
    const accessPlanFound = await this.accessPlanModel.findOne({
      name: planName,
    });
    if (!accessPlanFound) return null;
    return this.mapper.toDomain({
      accessPlanSchema: accessPlanFound,
      receiverSchema: accessPlanFound.receiver,
    });
  }
}
