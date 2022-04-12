import { HTMLAttributes } from "react";

export type AcornInputType =  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

export interface AcornInputProps<T = AcornInputType> extends HTMLAttributes<T> {
    id: string;
    name: string;
    value: any;
    focused?: boolean;
    error?: boolean;
    disabled?: boolean;
    required?: boolean;
    onFocus?: () => void;
    onBlur?: () => void;
    onChange?: (value: any) => void;
}