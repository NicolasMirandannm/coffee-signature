import ValueObject from "./valueObject";
import {UuidFactory} from "@nestjs/core/inspector/uuid-factory";

export default class UniqueIdentifier extends ValueObject<string> {
    private constructor(props: string) {
        super(props);
    }

    public static create(id?: string): UniqueIdentifier {
        return new UniqueIdentifier(id);
    }

}