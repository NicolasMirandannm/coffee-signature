export default class InfraException extends Error {
    constructor(msg?: string) {
        super(msg ?? 'an error occurred in the infra layer.');
    }

    static whenParameterIsNull(parameter: any, msg: string) {
        if (parameter == null)
            throw new InfraException(msg);
    }
}