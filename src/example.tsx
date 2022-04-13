
import * as React from "react";
import { useForm, useField, AcornFormFieldProps, AcornFormField, AcornInputProps, Validator } from "./index";


interface LoginDTO {
    username: string;
    password: string;
    rememberMe: boolean;
}

const LoginForm = () => {
    const [form, formState] = useForm<LoginDTO>({
        username: "", 
        password: "", 
        rememberMe: false 
    });

    const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
        if(form.getErrors().length) {
            // handle errors
        } else {
            // do something with data
            console.log(formState.values);
        }
    }

    return (
        <form onSubmit={onSubmit}> 
            <FormField 
                component="input" 
                name="username" 
                form={form} 
            />
        </form>
    )
}

interface TextFieldType extends AcornFormFieldProps {
    label?: string;
    description?: string;
    validators?: Validator[];
    errors?: string[];
    touched?: boolean;
    focused?: boolean;
    loading?: boolean;
    disabled?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: any) => void;
    onLoading?: () => void;
    onLoaded?: () => void;
}
const SimpleTextField = (
    { 
        form,
        label,
        description,
        errors = [],
        touched,
        focused,
        onChange,
        ...props 
    }: TextFieldType
) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(onChange) onChange(e.currentTarget.value);
    }

    return (
        <label>
            <span>{label}</span>
            <AcornFormField 
                component="input" 
                name="username" 
                form={form} 
            />
            {errors?.length && errors.map(error => (
                <span>{error}</span>
            ))}
        </label>
    )
}

