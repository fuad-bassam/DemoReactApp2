import React, { useEffect } from 'react';
import { TextField, Box, Slide } from '@mui/material';
import Product from '../../../../../Services/interfaces/Product/Product';
import { useValidation } from '../../../../../hooks/useValidation';
import { InitialStateProductFrom2Validation } from '../../../../../Store/ProductStoreModule';
import { ProductValidationSchemaFrom2 } from '../../../../../Services/validation/Product/ProductValidation';

interface ProductFormProps {
    data: Product;
    onChange?: (product: Product, isStepValid: boolean) => void;
}

const ProductFormStep2: React.FC<ProductFormProps> = ({ data, onChange }) => {
    const { errors, validateField, isDataValid } = useValidation(ProductValidationSchemaFrom2, InitialStateProductFrom2Validation);
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
        <Slide in={true} direction="left" timeout={500}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 400 }}>
                <TextField
                    label="Product Name"
                    name="name"
                    value={data.name}
                    fullWidth
                    required
                    disabled
                />
                <TextField
                    label="Product description"
                    name="description"
                    value={data.description}
                    onChange={handleChange}
                    fullWidth
                    required
                />
                <TextField
                    label="Notes"
                    name="notes"
                    value={data.notes}
                    onChange={handleChange}
                    fullWidth

                />
            </Box>
        </Slide>
    );
};

export default ProductFormStep2;
