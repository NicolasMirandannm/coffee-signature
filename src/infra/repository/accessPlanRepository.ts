import {Inject, Injectable} from "@nestjs/common";
import IRepository from "../../shared/repository/iRepository";
import AccessPlan from "../../domain/accessPlan/accessPlan";
import {InjectModel} from "@nestjs/mongoose";
import {AccessPlanEntity} from "../database/schemas/accessPlan.schema";
import {Model, Promise} from "mongoose";
import {ReceiverEntity} from "../database/schemas/receiver.schema";
import IMapper from "./mapper/iMapper";
import {AccessPlanPersistence} from "./mapper/accessPlan/accessPlanPersistence";

@Injectable()
export default class AccessPlanRepository implements IRepository<AccessPlan> {
    constructor(
        @InjectModel(AccessPlanEntity.name)
        private readonly accessPlanModel: Model<AccessPlanEntity>,
        @InjectModel(ReceiverEntity.name)
        private readonly receiverModel: Model<ReceiverEntity>,
        @Inject('AccessPlanMapper')
        private readonly mapper: IMapper<AccessPlan, AccessPlanPersistence>
    ) {
    }

    async save(domainAccessPlan: AccessPlan): Promise<void> {
        const {accessPlanSchema, receiverSchema} = this.mapper.toPersistence(domainAccessPlan);
        let receiver = await this.receiverModel.findOne({cpf: domainAccessPlan.getReceiver().cpf});

        if (receiver == null) {
            receiver = new this.receiverModel({...receiver});
            await receiver.save();
        }
        const accessPlan = new this.accessPlanModel({...accessPlanSchema, receiver});
        await accessPlan.save();
    }

    async findAll(): Promise<Array<AccessPlan>> {
        const accessPlanDocument = await this.accessPlanModel.find().populate('receiver');


    }

}