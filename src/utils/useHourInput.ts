import { useState } from "react";

export const useHourInput = (setterValue) => {
    const [value, setValue] = useState(setterValue)

    const handleChange = (event) => {
        const inputValue = event.target.value;
        const newValue = inputValue.replace(/\D/g, '')
        const patron = /^(0?[0-9]|1[0-9]|2[0-3])?$/
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

export interface HourInputProps {
    props: {
        value: any;
        onChange: (event: any) => void;
    };
    resetValue: (newValue: string) => void;
}