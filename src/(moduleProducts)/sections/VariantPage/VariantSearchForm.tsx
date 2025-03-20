import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, TextField, useMediaQuery } from "@mui/material";
import LOVs from "../../../components/reusableComponent/LOV";
import ILOVItem from "../../../models/Common/ILOVItem";
import { InitialStateVariant } from "../../store/ProductStoreModule";
import Variants from "../../../models/Product/Variants";
import useProductApi from "../../../services/Product/productApi";



interface VariantSearchFormProps {
    onSubmit: (formData: Variants) => void;
    onReset: (formData: Variants) => void;
    actions?: React.ReactNode;
}

const VariantSearchForm: React.FC<VariantSearchFormProps> = ({ onSubmit, onReset, actions }) => {
    const [formData, setFormData] = useState<Variants>(InitialStateVariant);
    // const { ProductApi } = useProductApiModule();
    const ProductApi = useMemo(() => useProductApi, []);

    const [productLovData, setProductLovData] = useState<ILOVItem[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    const handleProductApi = useCallback(async (): Promise<ILOVItem[]> => {
        const categories = await ProductApi().getAll();
        return categories.data.map<ILOVItem>((cat: any) => ({ value: cat.id, label: cat.name }));
    }, [ProductApi]);

    useEffect(() => {
        const fetchProductOptions = async () => {
            const options = await handleProductApi();
            setProductLovData(options);
        };

        fetchProductOptions();
    }, [handleProductApi]);

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        setFormData(InitialStateVariant);
        onReset(InitialStateVariant);
    };
    const handleLOVsChange = (name: string, value: string) => {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
    console.log("ss")

    const isXs = useMediaQuery('(max-width:600px)');

    return (
        <form
            onSubmit={handleFormSubmit}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                margin: '16px',
                flexDirection: isXs ? 'column' : 'row',
            }}
        >
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                style={{ flex: isXs ? '1 1 100%' : '1 1 45%' }}
                margin="normal"
            />
            <div style={{ flex: isXs ? '1 1 100%' : '1 1 45%' }}>
                <LOVs
                    fieldName="productId"
                    label="Product"
                    data={productLovData}
                    value={formData["productId"] || ''}
                    onChange={handleLOVsChange}
                />
            </div>
            <TextField
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                style={{ flex: isXs ? '1 1 100%' : '1 1 45%' }}
                margin="normal"
            />
            <TextField
                label="Stock"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                style={{ flex: isXs ? '1 1 100%' : '1 1 45%' }}
                margin="normal"
            />
            <div style={{ width: '100%', display: 'flex', gap: '16px', flexDirection: isXs ? 'column' : 'row' }}>
                {actions}
                <Button type="submit" variant="contained" color="primary">
                    Search
                </Button>
                <Button type="button" variant="outlined" color="secondary" onClick={handleReset}>
                    Clear Data
                </Button>
            </div>
        </form>
    );
};


export default VariantSearchForm;