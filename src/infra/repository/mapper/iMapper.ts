export default interface IMapper<Domain, Persistence> {
  toDomain(object: Persistence): Domain;
  toPersistence(object: Domain): Persistence;
}
