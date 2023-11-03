export default class InfraException extends Error {
    constructor(msg?: string) {
        super(msg ?? 'an error occurred in the infra layer.');
    }
}