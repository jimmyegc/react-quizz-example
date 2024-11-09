import { useState } from 'react';

export const usePositiveNumberInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*\.?\d*$/.test(newValue)) {
      setValue(newValue);
    }
  };

  return [value, handleChange];
}