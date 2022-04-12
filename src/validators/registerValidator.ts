import { AllHTMLAttributes } from "react";

/**
 * Result from a validated input value
 */
export interface ValidationResult { 
    valid: boolean, 
    message: string 
};


export type Validator = {
    validate: (value: string) => Promise<ValidationResult>;
    getProps: () => AllHTMLAttributes<HTMLInputElement>
}

export const registerValidator = <
    T extends unknown[] = never
>(
    validator: (value: any, ...args:T) => Promise<boolean>,
    propsProvider?: (...args:T) => AllHTMLAttributes<HTMLInputElement>
) => {
    const validatorContructor = (
        message: string,
        ...args: T
    ) => {
        const validate = async (
            value: string
        ) => {
            const valid = await validator(value, ...args);
            const invalidMessage = message;
            return {
                valid,
                message: !valid ? invalidMessage : ""
            }
        }

        const getProps = () => {
            if(propsProvider) return propsProvider(...args);
            return {}
        }

        return {
            validate,
            getProps
        }
    }

    return validatorContructor;
}

