import UniqueIdentifier from '../valueObjects/uniqueIdentifier.valueObj';
import { ApiProperty } from '@nestjs/swagger';

export default abstract class DomainEntity<T> {
  @ApiProperty()
  protected props: T;
  @ApiProperty()
  protected id: UniqueIdentifier;
  protected constructor(props: T, id: UniqueIdentifier) {
    this.props = props;
    this.id = id;
  }

  public getProps(): T {
    return this.props;
  }

  public getId(): UniqueIdentifier {
    return this.id;
  }
}
