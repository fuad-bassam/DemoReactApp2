import React, { useEffect, useState } from 'react';
import { TextField, Box, Slide, CircularProgress } from '@mui/material';
import LOVs from './LOV';
import { useValidation } from '../../hooks/useValidation';
import { IDynamicFormFields } from '../../models/Common/IDynamicForm';
import ILOVItem from '../../models/Common/ILOVItem';



interface DynamicFormProps {
    data: any; // Generic data object
    onChange?: (data: any, isStepValid: boolean) => void;
    step: number;
    fields: Array<IDynamicFormFields>;
    validationSchema: any;
    initialValidationState: any;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
    data,
    onChange,
    step,
    fields,
    validationSchema,
    initialValidationState,
}) => {
    const { errors, validateField, isDataValid } = useValidation(validationSchema, initialValidationState);
    const [dropdownOptions, setDropdownOptions] = useState<{ [key: string]: ILOVItem[] }>({});
    const [loading, setLoading] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        if (onChange) {
            onChange(data, isDataValid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    useEffect(() => {
        // Fetch options for dropdown fields
        fields.forEach((field) => {
            if (field.fieldType === 'dropdown' && field.LOVDataHandler && !dropdownOptions[field.name]) {
                setLoading((prev) => ({ ...prev, [field.name]: true }));
                field.LOVDataHandler()
                    .then((options) => {
                        setDropdownOptions((prev) => ({ ...prev, [field.name]: options }));
                        setLoading((prev) => ({ ...prev, [field.name]: false }));
                    })
                    .catch(() => {
                        setLoading((prev) => ({ ...prev, [field.name]: false }));
                    });
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fields]);
    const handleLOVsChange = (name: string, value: string) => {
        const updatedData = { ...data, [name]: value };
        validateField(name, value);
        if (onChange) {
            onChange(updatedData, isDataValid);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const updatedData = { ...data, [name]: value };

        validateField(name, value);
        if (onChange) {
            onChange(updatedData, isDataValid);
        }
    };

    return (
        <Slide in={true} direction="left" timeout={500}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
                {fields.map((field) => {
                    if (field.fieldType === 'dropdown') {
                        const options = dropdownOptions[field.name] || [];
                        const isLoading = loading[field.name];

                        return (
                            <div key={field.name}>
                                {isLoading ? (
                                    <CircularProgress size={24} />
                                ) : (
                                    <LOVs
                                        fieldName={field.name}
                                        label={field.label}
                                        data={options}
                                        value={data[field.name] || ''}
                                        onChange={handleLOVsChange}
                                    />
                                )}
                            </div>
                        );
                    } else {
                        return (
                            <TextField
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                value={data[field.name] || ''}
                                onChange={handleChange}
                                fullWidth
                                type={field.textFieldType || 'text'}
                                required={field.required}
                                disabled={field.disabled}
                                error={!!errors[field.name]}
                                helperText={errors[field.name]}
                            />
                        );
                    }
                })}
            </Box>
        </Slide>
    );
};

export default DynamicForm;