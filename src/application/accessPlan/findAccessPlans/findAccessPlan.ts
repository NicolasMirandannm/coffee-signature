import IFindAccessPlan from "./iFindAccessPlan";
import AccessPlan from "../../../domain/accessPlan/accessPlan";
import {Inject} from "@nestjs/common";
import IAccessPlanRepository from "../../../domain/repository/iAccessPlanRepository";
import ApplicationException from "../../../shared/exceptions/applicationException";

export default class FindAccessPlan implements IFindAccessPlan {
    constructor(
        @Inject('IAccessPlanRepository')
        private readonly accessPlanRepository: IAccessPlanRepository
    ) {
    }
    async findAll(): Promise<Array<AccessPlan>> {
        return await this.accessPlanRepository.findAll();
    }

    async findByClientName(name: string): Promise<AccessPlan> {
        ApplicationException.whenParameterIsNull(name, 'could no find access plan by name without name.');

        return await this.accessPlanRepository.findByClientName(name);
    }
}