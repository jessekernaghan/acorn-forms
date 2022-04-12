import { Validator, ValidationResult } from "./registerValidator";
/**
 * 
 * @param {Validator[]} validators array of Validator promises 
 */
 export const validate = async (
     value: string, 
     validators: Array<Validator>
): Promise<Array<ValidationResult>> => {
    const errors = await Promise.all(
        validators.map(validator => validator.validate(value))
    );

    return errors;
}