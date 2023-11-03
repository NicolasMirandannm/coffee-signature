import UniqueIdentifier from "../valueObjects/uniqueIdentifier.valueObj";


export default abstract class DomainEntity<T> {
    protected constructor(private props: T, private id: UniqueIdentifier) {}

    public getProps(): T {
        return this.props;
    }

    public getId(): UniqueIdentifier {
        return this.id;
    }
}