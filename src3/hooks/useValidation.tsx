import { useState } from 'react';
import Joi from 'joi';

export const useValidation = (schema: Joi.ObjectSchema, initialErrors: { [key: string]: string | undefined }) => {


    const [errors, setErrors] = useState<{ [key: string]: string | undefined }>(initialErrors);

    const validateField = (name: string, value: string) => {

        const obj = { [name]: value };
        const fieldSchema = Joi.object({ [name]: schema.extract(name) });
        const { error } = fieldSchema.validate(obj);

        setErrors((prevErrors) => {
            if (!error) {
                const { [name]: _, ...rest } = prevErrors;
                return rest;
            }
            return {
                ...prevErrors,
                [name]: error.details[0].message,
            };
        });

    };

    const validateForm = (formData: { [key: string]: any }) => {
        const { error } = schema.validate(formData, { abortEarly: false });

        if (!error) {
            setErrors({});
            return null;
        }

        const newErrors: { [key: string]: string } = {};
        error.details.forEach((err) => {
            newErrors[err.path[0]] = err.message;
        });

        setErrors(newErrors);
        return newErrors;
    };

    const isDataValid = Object.keys(errors).length === 0;

    return { errors, validateField, validateForm, isDataValid };
};