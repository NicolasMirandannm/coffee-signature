export default class ApplicationException extends Error {
    constructor(msg?: string) {
        super(msg ?? 'an error occurred in the application layer.');
    }

    static whenParameterIsNull(parameter: any, msg: string): void {
        if (parameter == null)
            throw new ApplicationException(msg);
    }

    static whenAnyPropInParameterIsNull(parameter: any): void {
        for (const key in parameter) {
            if (Object.prototype.hasOwnProperty.call(parameter, key) && parameter[key] == null)
                throw new ApplicationException(`${key} is empty`);
        }
    }
}