import ValueObject from './valueObject';

export default class UniqueIdentifier extends ValueObject<string> {
  private constructor(props: string) {
    super(props);
  }

  public static create(id: string): UniqueIdentifier {
    return new UniqueIdentifier(id);
  }
}
