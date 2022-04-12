import { useCallback } from "react";
import { Form, FieldState } from "./useForm";


export interface UseFieldProps extends FieldState {
    onFocus: () => void,
    onBlur: () => void,
    onChange: (value: any) => void,
    onValidate: (errors: string[]) => void,
    onLoaded: () => void,
    onLoading: () => void,
    value: any, 
    touched: boolean, 
    focused: boolean, 
    loading: boolean
}

export function useField(name: string, form: Form): UseFieldProps {
    const { 
        getFieldState, 
        onFieldFocus, 
        onFieldBlur, 
        onFieldChange, 
        onFieldValidate,
        onFieldLoaded,
        onFieldLoading
    } = form;
    
    const { value, errors, touched, focused, loading } = getFieldState(name);

    const onFocus = useCallback(() => onFieldFocus(name), [name, onFieldFocus]);
    const onBlur = useCallback(() => onFieldBlur(name), [name, onFieldBlur]);
    const onChange = useCallback((value: any) => onFieldChange(name, value), [name, onFieldChange]);
    const onValidate = useCallback((errors: string[]) => onFieldValidate(name, errors), [name, onFieldValidate]);

    const onLoaded = useCallback(() => onFieldLoaded(name), [name, onFieldLoaded]);
    const onLoading = useCallback(() => onFieldLoading(name), [name, onFieldLoading]);
    
    return {
        onFocus,
        onBlur,
        onChange,
        onValidate,
        onLoaded,
        onLoading,
        errors,
        value, 
        touched, 
        focused, 
        loading
    }
}