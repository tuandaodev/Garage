// Export App Services
export * from './services/app.service';


export enum ValidatorType {
    MIN = 'min',
    MAX = 'max',
    REQUIRED = 'required',
    REQUIREDTRUE = 'requiredTrue',
    EMAIL = 'email',
    MINLENGTH = 'minlength',
    MAXLENGTH = 'maxlength',
    PATTERN = 'pattern',
    //Custom
    EXACTLENGTH = 'exactLength'
}