export default interface IDeleteSignature {
  execute(id: string): Promise<void>;
}
