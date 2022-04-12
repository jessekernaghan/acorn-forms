import { useCallback, useMemo, useReducer } from "react";

export type FormData = Record<string, any>;

export interface Form {
    onFieldFocus: (name: string) => void,
    onFieldBlur: (name: string) => void,
    onFieldChange: (name: string, value: any) => void,
    onFieldValidate: (name: string, errors: string[]) => void,
    onFieldLoading: (name: string) => void,
    onFieldLoaded: (name: string) => void,
    getFieldState: (name:string) => FieldState,
    getErrors: () => FormErrors
}

interface FocusFormAction<T> {
    type: "FOCUS",
    name:  keyof T
}

interface BlurFormAction<T> {
    type: "BLUR",
    name: keyof T
}

interface ChangeFormAction<T> {
    type: "CHANGE",
    name: keyof T,
    value: any
}

interface ValidateFormAction<T> {
    type: "VALIDATE",
    name: keyof T,
    errors: string[]
}

interface LoadingFormAction<T> {
    type: "LOADING",
    name: keyof T
}

interface LoadedFormAction<T> {
    type: "LOADED",
    name: keyof T
}

type FormAction<T> = FocusFormAction<T>    |
                     BlurFormAction<T>     |
                     ChangeFormAction<T>   |
                     ValidateFormAction<T> |
                     LoadingFormAction<T>  |
                     LoadedFormAction<T>;


export interface FieldState {
    value: any,
    errors: string[],
    touched: boolean,
    focused: boolean,
    loading: boolean
}

type FormState<T> = {
    fields: {
        [key in keyof T]: FieldState;
    },
    values: T,
    errorCount: number
};


function getInitialState<T>(
    values: T
): FormState<T> {

    // TODO: figure out at way to type this properly
    let res: FormState<T> = { fields: {}, values, errorCount: 0 } as FormState<T>;

    Object.keys(values).forEach((key) => {
        res.fields[(key as keyof T)] = {
            value: values[(key as keyof T)],
            errors: [],
            touched: false,
            focused: false,
            loading: false
        }
    });

    return res;
}


type FormReducer<T> = (state: FormState<T>, action: FormAction<T>) => FormState<T>;
function formReducer<T>(state: FormState<T>, action: FormAction<T>): FormState<T> {
    switch(action.type) {
        case "FOCUS":
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.name]: {
                        ...state.fields[action.name],
                        focused: true,
                        touched: false
                    }
                }
            }

        case "BLUR":
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.name]: {
                        ...state.fields[action.name],
                        focused: false,
                        touched: true
                    }
                }
                
            }

        case "CHANGE":
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.name]: {
                        ...state.fields[action.name],
                        value: action.value
                    }
                },
                values: {
                    ...state.values,
                    [action.name]: action.value
                }
                
            }
        
        case "VALIDATE": {
            const prevErrors = state.fields[action.name].errors;
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.name]: {
                        ...state.fields[action.name],
                        errors: action.errors
                    }
                },
                errorCount: state.errorCount + (action.errors.length - prevErrors.length)
            }
        }
    
        case "LOADING":
            return {
                ...state,
                fields: {
                    ...state.fields,
                    [action.name]: {
                        ...state.fields[action.name],
                        loading: true
                    }
                }
            }
    
        case "LOADED":
            return {
                ...state,
                fields: {       
                    ...state.fields,
                    [action.name]: {
                        ...state.fields[action.name],
                        loading: false
                    }
                }
            }

        default:
            return state;
    }
}

export type FormErrors = Array<[string, Array<string>]>;

export function useForm<T extends {[key: string]: any}>(
    values: T
) {
    const [state, dispatcher] = useReducer<FormReducer<typeof values>>(
        formReducer, 
        getInitialState(values)
    );

    const errors = useMemo(() => {

        const {fields, errorCount} = state;

        if(errorCount === 0) return [];
        
        const errors: FormErrors = [];
        for (let key in fields) {
            const field = fields[key];

            if(field.errors.length) {
                errors.push([key, field.errors]);
            }
        }

        return errors;

    }, [state]);

    const onFieldFocus = useCallback((
        name: keyof (typeof values)
    ) => dispatcher({ type: "FOCUS", name }), []);
    

    const onFieldBlur = useCallback((
        name: keyof (typeof values)
    ) => dispatcher({ type: "BLUR", name }), []);

    const onFieldChange = useCallback((
        name: keyof (typeof values),
        value: any
    ) => dispatcher({ type: "CHANGE", name, value }), []);

    const onFieldValidate = useCallback((
        name: keyof (typeof values),
        errors: string[]
    ) => dispatcher({ type: "VALIDATE", name, errors }), []);

    const onFieldLoading = useCallback((
        name: keyof (typeof values)
    ) => dispatcher({ type: "LOADING", name }), []);

    const onFieldLoaded = useCallback((
        name: keyof (typeof values)
    ) => dispatcher({ type: "LOADED", name }), []);

    const getFieldState = (name: keyof (typeof values)) => {
        if(!state.fields[name]) throw new Error(`
            Field with name ${name} attempted to register 
            with a form, but no key ${name} was found on 
            the form data object.
        `);
        return state.fields[name];
    }

    const getErrors = useCallback(() => {
        return errors;
    }, [errors]);

    const res: [Form, FormState<typeof values>] = [
        { 
            onFieldFocus,
            onFieldBlur,
            onFieldChange,
            onFieldValidate,
            onFieldLoading,
            onFieldLoaded,
            getFieldState,
            getErrors
        },
        state
    ];

    return res;
}