import DomainEntity from "../../../shared/domainEntity/domainEntity";
import UniqueIdentifier from "../../../shared/valueObjects/uniqueIdentifier.valueObj";

export type ReceiverProps = {
    name: string,
    pixKey: string,
}

export default class Receiver extends DomainEntity<ReceiverProps> {
    private constructor(props: ReceiverProps, id: UniqueIdentifier) {
        super(props, id);
    }

    public static create(props: ReceiverProps, id?: UniqueIdentifier) {
        return new Receiver(props, id ?? UniqueIdentifier.create())
    }
}