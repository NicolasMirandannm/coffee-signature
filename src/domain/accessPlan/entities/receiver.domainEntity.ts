import DomainEntity from "../../../shared/domainEntity/domainEntity";
import UniqueIdentifier from "../../../shared/valueObjects/uniqueIdentifier.valueObj";
import DomainException from "../../../shared/exceptions/domainException";

export type ReceiverProps = {
    name: string,
    pixKey: string,
    cpf: string,
}

export default class Receiver extends DomainEntity<ReceiverProps> {
    private constructor(props: ReceiverProps, id: UniqueIdentifier) {
        super(props, id);
    }

    public static create(props: ReceiverProps, id?: UniqueIdentifier) {
        DomainException.whenParameterIsNull(props, "could not create a receiver without its properties.")

        return new Receiver(props, id ?? undefined)
    }
}