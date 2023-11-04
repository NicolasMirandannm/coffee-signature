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
    ) {}

    async save(domainAccessPlan: AccessPlan): Promise<void> {
        const {accessPlan, receiver} = this.mapper.toPersistence(domainAccessPlan);

        return Promise.resolve(undefined);
    }


}