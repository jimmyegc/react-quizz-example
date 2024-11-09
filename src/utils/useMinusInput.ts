import { useState } from "react";

export const useMinusInput = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/\D/g, '')
        const patron = /^([0-5]?[0-9])?$/
        if (patron.test(newValue))
            setValue(newValue)
    }
    const resetValue = (newValue: string) => {
        setValue(newValue)
    }

    return {
        props: {
            value,
            onChange: handleChange,
        },
        resetValue
    }
}

export interface MinusInputProps {
    props: {
        value: any;
        onChange: (event: any) => void;
    };
    resetValue: (newValue: string) => void;
}