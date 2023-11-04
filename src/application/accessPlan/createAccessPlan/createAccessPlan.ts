import {Inject, Injectable} from "@nestjs/common";
import ICreateAccessPlan, {AccessPlanDto} from "./iCreateAccessPlan";
import AccessPlan, {AccessPlanProps} from "../../../domain/accessPlan/accessPlan";
import Receiver from "../../../domain/accessPlan/entities/receiver.domainEntity";
import DomainException from "../../../shared/exceptions/domainException";
import ApplicationException from "../../../shared/exceptions/applicationException";
import IAccessPlanRepository from "../../../domain/repository/iAccessPlanRepository";

@Injectable()
export default class CreateAccessPlan implements ICreateAccessPlan {

    constructor(
       @Inject('IAccessPlanRepository')
       private readonly accessPlanRepository: IAccessPlanRepository,
    ) {}
    public async execute(accessPlanDto: AccessPlanDto): Promise<void> {
        ApplicationException.whenParameterIsNull(accessPlanDto, 'could not create a accessPlan without parameter.');
        ApplicationException.whenAnyPropInParameterIsNull(accessPlanDto);

        const receiver = Receiver.create({
            name: accessPlanDto.receiver.name,
            pixKey: accessPlanDto.receiver.pixKey,
            cpf: accessPlanDto.receiver.cpf
        });
        const props: AccessPlanProps = {
            planName: accessPlanDto.planName,
            price: accessPlanDto.price,
            receiver,
            description: accessPlanDto.description,
        }
        const accessPlan = AccessPlan.create(props);
        await this.accessPlanRepository.save(accessPlan);
    }
}