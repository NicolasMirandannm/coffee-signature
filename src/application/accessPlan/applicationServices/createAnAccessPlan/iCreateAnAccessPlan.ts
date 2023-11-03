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

export default interface ICreateAnAccessPlan {
    execute(accessPlanDto: AccessPlanDto): Promise<void>;
}