import { MinLength, IsEmail, Required, registerValidator } from "../index";


describe("Form Validator Tests", () => {
    test("required", async () => {
        const message = "This is required";
        const validator = Required(message);
        const res1 = await validator.validate("");
        const res2 = await validator.validate("asdf");
        const res3 = await validator.validate(" ");

        expect(res1.valid).toBe(false);
        expect(res1.message).toBe(message);

        expect(res2.valid).toBe(true);
        expect(res3.valid).toBe(false);
    });

    test("minLength", async () => {
        const message = "Must have a minimum of 2 characters";
        const validator = MinLength(
            "Must have a minimum of 2 characters",
            6
        );
        const res1 = await validator.validate("1");
        const res2 = await validator.validate("asdfasdf");
        const res3 = await validator.validate(" ");

        expect(res1.valid).toBe(false);
        expect(res1.message).toBe(message);

        expect(res2.valid).toBe(true);
        expect(res3.valid).toBe(false);
    });

    test("IsEmail", async () => {
        const message = "Must be a standard email format";
        const validator = IsEmail(message);

        const res1 = await validator.validate("1");
        const res3 = await validator.validate("hello@me.com");

        expect(res1.valid).toBe(false);
        expect(res1.message).toBe(message);

        expect(res3.valid).toBe(true);
    });

    

    test("Between", async () => {
        const message = "Must be a standard email format";
        const validator = IsEmail("Must be a standard email format");

        const res1 = await validator.validate("1");
        const res3 = await validator.validate("hello@me.com");

        expect(res1.valid).toBe(false);
        expect(res1.message).toBe(message);

        expect(res3.valid).toBe(true);
    });
});