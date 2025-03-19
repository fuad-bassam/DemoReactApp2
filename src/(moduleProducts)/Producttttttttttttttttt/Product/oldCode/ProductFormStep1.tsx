import React, { useEffect } from 'react';
import { TextField, Box } from '@mui/material';
import Product from '../../../../../Services/interfaces/Product/Product';
import { useValidation } from '../../../../../hooks/useValidation';
import { InitialStateProductFrom1Validation } from '../../../../../Store/ProductStoreModule';
import { ProductValidationSchemaFrom1 } from '../../../../../Services/validation/Product/ProductValidation';

interface ProductFormProps {
    data: Product;
    onChange?: (product: Product, isStepValid: boolean) => void;
}

const ProductFormStep1: React.FC<ProductFormProps> = ({ data, onChange }) => {
    const { errors, validateField, isDataValid } = useValidation(ProductValidationSchemaFrom1, InitialStateProductFrom1Validation);

    useEffect(() => {
        if (onChange) {
            onChange(data, isDataValid);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [errors]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const updatedProduct = { ...data, [name]: value };
        validateField(name, value);

        if (onChange) {

            onChange(updatedProduct, isDataValid);
        }
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
            <TextField
                label="Product Name"
                name="name"
                value={data.name}
                onChange={handleChange}
                fullWidth
                error={!!errors.name}
                helperText={errors.name}
                required
            />
            <TextField
                label="Product category"
                name="categoryId"
                type="number"
                value={data.categoryId}
                onChange={handleChange}
                fullWidth
                error={!!errors.categoryId}
                helperText={errors.categoryId}
                required
            />
        </Box>
    );
};

export default ProductFormStep1;
