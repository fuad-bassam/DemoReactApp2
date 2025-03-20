import React, { useState } from "react";
import { Button, TextField, useMediaQuery } from "@mui/material";
import Category from "../../../models/Product/Category";
import { InitialStateCategory } from "../../store/ProductStoreModule";


interface CategorySearchFormProps {
    onSubmit: (formData: Category) => void;
    onReset: (formData: Category) => void;
    actions?: React.ReactNode;
}

const CategorySearchForm: React.FC<CategorySearchFormProps> = ({ onSubmit, onReset, actions }) => {
    const [formData, setFormData] = useState<Category>(InitialStateCategory);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleReset = (e: React.FormEvent) => {
        e.preventDefault();
        setFormData(InitialStateCategory);
        onReset(InitialStateCategory);
    };

    const isXs = useMediaQuery('(max-width:600px)');

    return (
        <form
            onSubmit={handleFormSubmit}
            style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                margin: '16px',
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
            <TextField
                label="Description"
                type="description"
                name="description"
                value={formData.description}
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

export default CategorySearchForm;