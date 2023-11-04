export default interface IRepository<T> {
    save(object: T): Promise<void>;
    findAll(): Promise<Array<T>>;
    findById(id: string): Promise<T>;
    update(object: T): Promise<void>;
    delete(id: string): Promise<void>;
}