export default abstract class ValueObject<T> {
    protected constructor( readonly value: T) {}

    public equals(other: ValueObject<T>): boolean {
        for (const key in this) {
            if (other[key as string] !== this[key]) {
                return false;
            }
        }
        return true;
    }
}