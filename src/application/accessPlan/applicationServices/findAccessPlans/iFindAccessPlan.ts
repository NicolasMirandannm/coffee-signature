import AccessPlan from "../../../../domain/accessPlan/accessPlan";

export default interface IFindAccessPlan {
    findByClientName(name: string): Promise<AccessPlan>;
    findAll(): Promise<Array<AccessPlan>>;
}