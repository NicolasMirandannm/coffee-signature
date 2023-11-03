import AggregateRoot from "../../shared/aggregateRoot/aggregateRoot";
import UniqueIdentifier from "../../shared/valueObjects/uniqueIdentifier.valueObj";
import DomainException from "../../shared/exceptions/domainException";

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
        DomainException.whenParameterIsNull(props, "could not create a signature without properties.");

        return new Signature(props, id ?? undefined);
    }

    public static createAnNewSignature(planId: UniqueIdentifier, clientName: string): Signature {
        DomainException.whenParameterIsNull(planId, "could not create a new signature without a chosen plan.");
        DomainException.whenParameterIsNull(clientName, "could not create a new signature without client name.");

        const props: SignatureProps = {
            accessPlanId: planId,
            clientName,
            subscriptionDate: new Date(),
            pendingPayment: true
        }
        return Signature.create(props);
    }
}