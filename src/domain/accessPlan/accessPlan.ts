import AggregateRoot from "../../shared/aggregateRoot/aggregateRoot";
import Receiver, {ReceiverProps} from "./entities/receiver.domainEntity";
import UniqueIdentifier from "../../shared/valueObjects/uniqueIdentifier.valueObj";
import DomainException from "../../shared/exceptions/domainException";

export type AccessPlanProps = {
    planName: string,
    price: number,
    description: string,
    receiver: Receiver,
}
export default class AccessPlan extends AggregateRoot<AccessPlanProps> {
    private constructor(props: AccessPlanProps, id: UniqueIdentifier) {
        super(props, id);
    }

    public static create(props: AccessPlanProps, id?: UniqueIdentifier) {
        DomainException.whenParameterIsNull(props, "could not create a access plan without properties.")

        return new AccessPlan(props, id ?? undefined);
    }

    public getReceiver(): ReceiverProps {
        return this.getProps().receiver.getProps();
    }
}