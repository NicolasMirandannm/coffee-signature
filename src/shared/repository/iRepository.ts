export default interface IRepository<T> {
    save(object: T): Promise<void>;
}