import { Form } from "../hooks/useForm"
import { useField } from "../hooks/useField"
import { ComponentType, useEffect, useMemo } from "react";

import { AcornInputProps, AcornInputType } from "../types";
import { Validator, validate } from "../validators";
import * as React from "react";

export type AllowedElements = "input" | "textarea" | "select";

export interface AcornFormFieldProps<T = AcornInputType> {
    form: Form,
    name: string,
    component: AllowedElements | ComponentType<AcornInputProps<T>>,
    validators?: Validator[]
}

export const AcornFormField = ({
        component: Component,
        form,
        name,
        validators = [],
        ...additionalProps
    }: AcornFormFieldProps) => {
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

        return (
            <Component 
                name={name}
                value={value}
                onChange={validateOnChange}
                {...fieldProps} 
                {...additionalProps}  
                {...validatorProps}
            />
        )
    }