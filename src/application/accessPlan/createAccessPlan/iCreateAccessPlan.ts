export type AccessPlanDto = {
    planName: string,
    price: number,
    description: string,
    receiver: {
        name: string,
        cpf: string,
        pixKey: string,
    }
}

export default interface ICreateAccessPlan {
    execute(accessPlanDto: AccessPlanDto): Promise<void>;
}