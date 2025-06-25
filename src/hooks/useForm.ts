import { useState } from 'react';
import type { ChangeEvent } from 'react';

export function useForm<T extends Record<string, string>>(
  initialValues: T,
  validators: Record<keyof T, (value: string) => string>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const getError = (field: keyof T): string => {
    return touched[field as string] ? errors[field as string] || '' : '';
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (!touched[name]) {
      setTouched({
        ...touched,
        [name]: true
      });
    }

    if (validators[name as keyof T]) {
      const error = validators[name as keyof T](value);
      setErrors({
        ...errors,
        [name]: error
      });
    }
  };

  const handleBlur = (field: string) => {
    setTouched({
      ...touched,
      [field]: true
    });

    if (validators[field as keyof T]) {
      const error = validators[field as keyof T](values[field as keyof T]);
      setErrors({
        ...errors,
        [field]: error
      });
    }
  };

  const validateAll = (): boolean => {
    const allTouched = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as Record<string, boolean>);

    setTouched(allTouched);

    const newErrors = Object.keys(values).reduce((acc, key) => {
      const field = key as keyof T;
      if (validators[field]) {
        acc[key] = validators[field](values[field]);
      }
      return acc;
    }, {} as Record<string, string>);

    setErrors(newErrors);

    return !Object.values(newErrors).some(error => !!error);
  };

  const resetForm = () => {
    setValues(initialValues);
    setTouched({});
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    touched,
    getError,
    handleChange,
    handleBlur,
    validateAll,
    resetForm
  };
}
