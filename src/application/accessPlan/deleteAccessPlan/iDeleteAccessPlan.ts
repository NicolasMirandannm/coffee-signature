export default interface IDeleteAccessPlan {
    execute(id: string): Promise<boolean>;
}