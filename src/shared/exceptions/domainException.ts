export default class DomainException extends Error {
    constructor(msg?: string) {
        super(msg ?? 'an error occurred in the domain layer.');
    }
}