import { Typography, Button } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StepperForm from '../components/reusableComponent/StepperForm';
import { useSnackbar } from '../Context/SnackbarContext';
import { removeCachedItemsByPrefix } from '../helpers/CachingLocalStorageService';
import { IDynamicFormStep } from '../models/Common/IDynamicForm';
import Category from '../models/Product/Category';
import { NavRoutesEnum } from '../routes/NavRoutes';
import { SnackbarSeverityEnum, fieldTypesEnum } from '../store/CommonEnums';
import { InitialStateCategory, InitialStateCategoryFrom1Validation, InitialStateCategoryFrom2Validation } from './store/ProductStoreModule';
import { CategoryValidationSchemaFrom1, CategoryValidationSchemaFrom2 } from './store/ProductValidation';
import DynamicForm from '../components/reusableComponent/DynamicForm';
import categoryApi from '../services/Product/categoryApi';


const CategoryCreateUpdatePage: React.FC = () => {
    const CategoryApi = useMemo(() => categoryApi(), []);

    const { urlId } = useParams();
    const { showSnackbar } = useSnackbar();
    const [newCategory, setNewCategory] = useState<Category>(InitialStateCategory);
    const [isStepValid, setIsStepValid] = useState(false);
    const navigate = useNavigate();

    const handleCategoryChange = (updatedCategory: Category, isStepValid: boolean) => {
        setNewCategory(updatedCategory);
        setIsStepValid(isStepValid);
    };

    const handleCreateCategory = async (Category: Category) => {
        try {
            let createCategory: Category;
            if (!Category.id) {
                createCategory = await CategoryApi.create(Category);
                setNewCategory({ ...newCategory, id: createCategory?.id });
            } else {
                createCategory = await CategoryApi.update(Category);
            }
            setNewCategory((prev) => ({ ...prev, createdAt: new Date().toISOString() }));
            showSnackbar('Category created successfully', SnackbarSeverityEnum.Success);
        } catch (error) {
            if (error instanceof Error) {
                showSnackbar(`Error creating Category: ${error.message}`, SnackbarSeverityEnum.Error);
            } else {
                showSnackbar('Unknown error occurred', SnackbarSeverityEnum.Error);
            }
            throw error;
        }
    };

    const onReset = () => {
        setNewCategory(InitialStateCategory);
        removeCachedItemsByPrefix("Category/");
    };
    const handleBack = () => {
        navigate(`${NavRoutesEnum.Categories}`);
    };
    useEffect(() => {
        if (urlId) {
            const fetchCategory = async () => {
                try {
                    const CategoryData = await CategoryApi.getById(urlId);
                    setNewCategory(CategoryData);
                } catch (error) {
                    showSnackbar(`Error fetching Category: ${error}`, SnackbarSeverityEnum.Error);
                }
            };
            fetchCategory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlId]);


    const CategoryFormSteps: IDynamicFormStep[] = [
        {
            step: 1,
            fields: [
                {
                    name: 'name',
                    label: 'Category Name',
                    fieldType: fieldTypesEnum.Text,
                    required: true
                }
            ],
            validationSchema: CategoryValidationSchemaFrom1,
            initialValidationState: InitialStateCategoryFrom1Validation,
        },
        {
            step: 2,
            fields: [
                {
                    name: 'description',
                    label: 'Category Description',
                    fieldType: fieldTypesEnum.Text,
                    required: true
                },

            ],
            validationSchema: CategoryValidationSchemaFrom2,
            initialValidationState: InitialStateCategoryFrom2Validation,
        },
    ];


    return (
        <div>
            <Typography variant="h4" gutterBottom>
                {urlId ? "Category Edit" : "Category Creation"}
            </Typography>

            <StepperForm
                steps={['Step 1: Category Name', 'Step 2: Category description']}
                onSubmit={async () => await handleCreateCategory(newCategory)}
                saveOnStep={false}
                isStepValid={isStepValid}
                onReset={() => onReset()}
            >
                {CategoryFormSteps.map((stepConfig) => (
                    <DynamicForm
                        key={stepConfig.step}
                        data={newCategory}
                        onChange={handleCategoryChange}
                        step={stepConfig.step}
                        fields={stepConfig.fields}
                        validationSchema={stepConfig.validationSchema}
                        initialValidationState={stepConfig.initialValidationState}
                    />
                ))}
            </StepperForm>
            <Button onClick={() => handleBack()} variant="outlined" color="primary" style={{ marginRight: 8 }}>
                Back
            </Button>
        </div>
    );
};

export default CategoryCreateUpdatePage;