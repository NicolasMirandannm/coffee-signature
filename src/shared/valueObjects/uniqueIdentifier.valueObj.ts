import ValueObject from "./valueObject";
import {UuidFactory} from "@nestjs/core/inspector/uuid-factory";

export default class UniqueIdentifier extends ValueObject<string> {
    private constructor(props: string) {
        super(props);
    }

    public static create(): UniqueIdentifier {
        const uuid = UuidFactory.get();
        return new UniqueIdentifier(uuid);
    }

    public static createFrom(id: string): UniqueIdentifier {
        const uuid = UuidFactory.get(id);
        return new UniqueIdentifier(uuid);
    }

}