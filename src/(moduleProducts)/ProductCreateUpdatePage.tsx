import { Button, Grid2 } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StepperForm from '../components/reusableComponent/StepperForm';
import { useSnackbar } from '../Context/SnackbarContext';
import { removeCachedItemsByPrefix } from '../helpers/CachingLocalStorageService';
import { IDynamicFormStep } from '../models/Common/IDynamicForm';
import ILOVItem from '../models/Common/ILOVItem';
import Product from '../models/Product/Product';
import { NavRoutesEnum } from '../routes/NavRoutes';
import { SnackbarSeverityEnum, fieldTypesEnum } from '../store/CommonEnums';
import { InitialStateProduct, InitialStateProductFrom1Validation, InitialStateProductFrom2Validation } from './store/ProductStoreModule';
import { ProductValidationSchemaFrom1, ProductValidationSchemaFrom2 } from './store/ProductValidation';
import { setOrGetCache as setOrGetCacheSession } from '../helpers/CachingSessionService';
import DynamicForm from '../components/reusableComponent/DynamicForm';
import categoryApi from '../services/Product/categoryApi';
import productApi from '../services/Product/productApi';


const ProductCreateUpdatePage: React.FC = () => {
    const ProductApi = useMemo(() => productApi(), []);
    const CategoryApi = useMemo(() => categoryApi(), []);
    const { urlId } = useParams();
    const { showSnackbar } = useSnackbar();
    const [newProduct, setNewProduct] = useState<Product>(InitialStateProduct);
    const [isStepValid, setIsStepValid] = useState(false);
    const navigate = useNavigate();

    const handleProductChange = (updatedProduct: any, isStepValid: boolean) => {
        setNewProduct(updatedProduct);
        setIsStepValid(isStepValid);
    };

    const handleCreateProduct = async (product: any) => {
        try {
            let createProduct: any;
            if (!product.id) {
                createProduct = await ProductApi.create(product);
                setNewProduct({ ...newProduct, id: createProduct?.id });
            } else {
                createProduct = await ProductApi.update(product);
            }
            setNewProduct((prev) => ({ ...prev, createdAt: new Date().toISOString() }));
            showSnackbar('Product created successfully', SnackbarSeverityEnum.Success);
        } catch (error) {
            if (error instanceof Error) {
                showSnackbar(`Error creating product: ${error.message}`, SnackbarSeverityEnum.Error);
            } else {
                showSnackbar('Unknown error occurred', SnackbarSeverityEnum.Error);
            }
            throw error;
        }
    };

    const onReset = () => {
        setNewProduct(InitialStateProduct);
        removeCachedItemsByPrefix("Product/");
    };
    const handleBack = () => {
        navigate(`${NavRoutesEnum.Products}`);
    };
    useEffect(() => {
        debugger
        if (urlId) {
            const fetchProduct = async () => {
                try {
                    const productData = await ProductApi.getById(urlId);
                    setNewProduct(productData);
                } catch (error) {
                    showSnackbar(`Error fetching product: ${error}`, SnackbarSeverityEnum.Error);
                }
            };
            fetchProduct();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlId]);

    const categoriesApi = async (): Promise<ILOVItem[]> => {
        const categories = await CategoryApi.getAll();
        return categories.data.map<ILOVItem>((cat: any) => ({ value: cat.id, label: cat.name }));
    };
    const handleGetLovCategories = async () => {
        try {
            const result: ILOVItem[] = await setOrGetCacheSession("LOVsCategories", () => categoriesApi());
            return result;
        } catch (error) {
            throw error;
        }
    };


    const productFormSteps: IDynamicFormStep[] = [
        {
            step: 1,
            fields: [
                {
                    name: 'name',
                    label: 'Product Name',
                    fieldType: fieldTypesEnum.Text,
                    required: true
                },
                {
                    name: 'categoryId',
                    label: 'Product Category',
                    fieldType: fieldTypesEnum.Dropdown,
                    LOVDataHandler: handleGetLovCategories,
                    required: true,
                },
            ],
            validationSchema: ProductValidationSchemaFrom1,
            initialValidationState: InitialStateProductFrom1Validation,
        },
        {
            step: 2,
            fields: [
                {
                    name: 'description',
                    label: 'Product Description',
                    fieldType: fieldTypesEnum.Text,
                    required: true
                },
                {
                    name: 'notes',
                    label: 'Notes',
                    fieldType: fieldTypesEnum.Text
                },
            ],
            validationSchema: ProductValidationSchemaFrom2,
            initialValidationState: InitialStateProductFrom2Validation,
        },
    ];


    return (
        <Grid2 >

            <Button onClick={() => handleBack()} variant="outlined" color="primary" style={{ marginRight: 8 }}>
                Back
            </Button>
            <StepperForm
                steps={['Step 1: Product Info', 'Step 2: Product Note']}
                onSubmit={async () => await handleCreateProduct(newProduct)}
                saveOnStep={false}
                isStepValid={isStepValid}
                onReset={() => onReset()}
            >
                {productFormSteps.map((stepConfig) => (
                    <DynamicForm
                        key={stepConfig.step}
                        data={newProduct}
                        onChange={handleProductChange}
                        step={stepConfig.step}
                        fields={stepConfig.fields}
                        validationSchema={stepConfig.validationSchema}
                        initialValidationState={stepConfig.initialValidationState}
                    />
                ))}
            </StepperForm>

        </Grid2>
    );
};

export default ProductCreateUpdatePage;