import AggregateRoot from "../../shared/aggregateRoot/aggregateRoot";
import Receiver from "./entities/receiver.domainEntity";
import UniqueIdentifier from "../../shared/valueObjects/uniqueIdentifier.valueObj";

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
        return new AccessPlan(props, id ?? UniqueIdentifier.create());
    }
}