import { registerValidator } from "./registerValidator";

export const Required = registerValidator(
    async (value) => {
        return !!value.trim().length;
    },
    () => { return { required: true } }
);

type MinLengthConfig = [minLength: number];
export const MinLength = registerValidator<MinLengthConfig>(
    async (value, minLength) => {
        return !!(value.trim().length >= minLength);
    },
    (minLength) => { return { minLength }}
);

type BetweenLengthsConfig = [minLength: number, maxLength: number];
export const BetweenLengths = registerValidator<BetweenLengthsConfig>(
    async (value, minLength, maxLength) => {
        const len = value.trim().length;
        return !!(len >= minLength && len <= maxLength);
    },
    (minLength, maxLength) => ({ minLength, maxLength })
)


export const IsEmail = registerValidator(
    async (value) => {
        return /[^@\s]+@[^@\s]+\.[^@\s]+/.test(value);
    },
    () => ({pattern: "[^@\s]+@[^@\s]+\.[^@\s]+"})
);


export const IsUsername = registerValidator(
    async (value) => {
        return /^[a-z0-9_-]+$/.test(value);
    },
    () => ({pattern: "^[a-z0-9_-]+$"})
);