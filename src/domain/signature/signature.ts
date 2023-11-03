import AggregateRoot from "../../shared/aggregateRoot/aggregateRoot";
import UniqueIdentifier from "../../shared/valueObjects/uniqueIdentifier.valueObj";

export type SignatureProps = {
    accessPlanId: UniqueIdentifier,
    clientName: string,
    subscriptionDate: Date,
    pendingPayment: boolean,
}
export default class Signature extends AggregateRoot<SignatureProps> {
    private constructor(props: SignatureProps, id: UniqueIdentifier) {
        super(props, id);
    }

    public static create(props: SignatureProps, id?: UniqueIdentifier) {
        return new Signature(props, id ?? UniqueIdentifier.create());
    }

    public static createAnNewSignature(planId: UniqueIdentifier, clientName: string): Signature {
        const props: SignatureProps = {
            accessPlanId: planId,
            clientName,
            subscriptionDate: new Date(),
            pendingPayment: true
        }
        return Signature.create(props);
    }
}