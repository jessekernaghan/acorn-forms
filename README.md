# Acorn Forms

React-based form utilities that don't get in your way with a focus on composability, simplicity, and web standards. So straightforward you could build it yourself, but now you don't have to.


## Purpose 
Rather than trying to be an all-in form solution, Acorn Forms is meant to be a set of building blocks that are composable and individually implementable to suit the needs and preferences of the developers using them. 

### Goals
- Exensible by design: allows for the messiness of the real world by making
everything composible not making unnecessary assumptions.  

- Style-agnostic: you write your own field and input components, Acorn just helps you apply logic to them. 

- Prioritizes leaning on web standards: rather than trying to reinvent what HTML has already given us, Acorn Forms encourages using existing web features such as validation. If that's not your thing, no worries; it will work either way.

- Typescript focused: ground up Typescript support and consideration to help avoid those pesky buried typing problems.


## How it works

Acorn Forms provides 3 key pieces out of the box, and lets you put them together how you wish. A simplified end result could look something like this:

```
import { useForm, useField, FormField } from "acorn-forms";


interface LoginDTO {
    username: string;
    password: string;
    rememberMe: boolean;
}

const LoginForm = () => {
    const { form, formState } = useForm<LoginDTO>({
        username: "", 
        password: "", 
        rememberMe: false 
    });

    const onSubmit = (e) => {

    }

    return (
        <form onSubmit={onSubmit}> 

        </form>
    )
}

interface SimpleFormFieldType { type: string }
const SimpleFormField = () => {

}


```

