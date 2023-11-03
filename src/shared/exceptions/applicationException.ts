export default class ApplicationException extends Error {
    constructor(msg?: string) {
        super(msg ?? 'an error occurred in the application layer.');
    }
}