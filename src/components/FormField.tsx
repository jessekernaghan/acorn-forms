import { Form } from "../hooks/useForm"
import { useField } from "../hooks/useField"
import { ComponentType, useEffect, useMemo } from "react";

import { AcornInputProps, AcornInputType } from "../types";
import { Validator, validate } from "../validators";

export interface FormFieldProps<T = AcornInputType> {
    form: Form,
    name: string,
    component: ComponentType<AcornInputProps<T>>,
    id?: string,
    validators?: Validator[]
}

export const FormField = ({
        component: Component,
        form,
        name,
        id,
        validators = [],
        ...additionalProps
    }: FormFieldProps) => {
        const { onChange, onValidate, value, ...fieldProps } = useField(name, form);

        const validateOnChange = async (value: any) => {
            onChange(value);
        }

        useEffect(() => {
            if(!validators || !validators.length) return;
            const init = async() => {
                const validateRes = await validate(value, validators);
                const errors = validateRes
                    .filter(validation => !validation.valid)
                    .map(validateData => {
                        return validateData.message;
                    });
                onValidate(errors);
            }

            init();
        }, [value]);

        const validatorProps = useMemo(() => {
            let props = {};
            validators.forEach(validator => {
                props = {
                    ...props,
                    ...validator.getProps()
                }
            });

            return props;
        }, [validators]);

        return <Component 
                    id={id || name}
                    name={name}
                    value={value}
                    onChange={validateOnChange}
                    {...fieldProps} 
                    {...additionalProps}  
                    {...validatorProps}
                />
    }
);