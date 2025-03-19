import React, { useEffect, useState } from 'react';
import StepperForm from '../../../CommonComponent/StepperForm';
import { useSnackbar } from '../../../../hooks/SnackbarContext';
import { fieldTypesEnum, SnackbarSeverityEnum } from '../../../../../src/store/CommonEnums';
import { useNavigate, useParams } from 'react-router-dom';
import DynamicForm from '../../../CommonComponent/DynamicForm';
import { IDynamicFormStep } from '../../../../Services/interfaces/Common/IDynamicForm';
import { NavRoutesEnum } from '../../../../Services/Common/NavRoutes';
import { Button, Typography } from '@mui/material';
import Category from '../../../../Services/interfaces/Product/Category';
import { CategoryValidationSchemaFrom1, CategoryValidationSchemaFrom2 } from '../../../../Services/validation/Product/ProductValidation';
import { InitialStateCategory, InitialStateCategoryFrom1Validation, InitialStateCategoryFrom2Validation } from '../../../../../src/(moduleProducts)/store/ProductStoreModule';
import { removeCachedItemsByPrefix } from '../../../../Services/Common/CachingSessionService';
import useProductApiModule from '../../../../Services/API/Product/ProductApiModule';

const CategoryCreateUpdatePage: React.FC = () => {
    const { CategoryApi } = useProductApiModule();

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