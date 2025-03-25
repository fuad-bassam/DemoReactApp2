import React, { useEffect, useMemo, useState } from 'react';
import DynamicForm from '../components/reusableComponent/DynamicForm';
import { Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import StepperForm from '../components/reusableComponent/StepperForm';
import { useSnackbar } from '../Context/SnackbarContext';
import { removeCachedItemsByPrefix } from '../helpers/CachingLocalStorageService';
import { IDynamicFormStep } from '../models/Common/IDynamicForm';
import ILOVItem from '../models/Common/ILOVItem';
import Variants from '../models/Product/Variants';
import { NavRoutesEnum } from '../routes/NavRoutes';
import { SnackbarSeverityEnum, fieldTypesEnum, textFieldTypesEnum } from '../store/CommonEnums';
import { InitialStateVariant, InitialStateVariantFrom1Validation, InitialStateVariantFrom2Validation } from './store/ProductStoreModule';
import { VariantValidationSchemaFrom1, VariantValidationSchemaFrom2 } from './store/ProductValidation';
import { setOrGetCache as setOrGetCacheSession } from '../helpers/CachingSessionService';
import productApi from '../services/Product/productApi';
import variantApi from '../services/Product/variantApi';

const VariantCreateUpdatePage: React.FC = () => {
    const ProductApi = useMemo(() => productApi(), []);
    const VariantApi = useMemo(() => variantApi(), []);

    const { urlId } = useParams();
    const { showSnackbar } = useSnackbar();
    const [newVariant, setNewVariant] = useState<Variants>(InitialStateVariant);
    const [isStepValid, setIsStepValid] = useState(false);
    const navigate = useNavigate();

    const handleVariantChange = (updatedVariant: Variants, isStepValid: boolean) => {
        setNewVariant(updatedVariant);
        setIsStepValid(isStepValid);
    };

    const handleCreateVariant = async (Variant: Variants) => {
        try {
            let createVariant: Variants;
            if (!Variant.id) {
                createVariant = await VariantApi.create(Variant);
                setNewVariant({ ...newVariant, id: createVariant?.id });
            } else {
                createVariant = await VariantApi.update(Variant);
            }
            setNewVariant((prev) => ({ ...prev, createdAt: new Date().toISOString() }));
            showSnackbar('Variant created successfully', SnackbarSeverityEnum.Success);
        } catch (error) {
            if (error instanceof Error) {
                showSnackbar(`Error creating Variant: ${error.message}`, SnackbarSeverityEnum.Error);
            } else {
                showSnackbar('Unknown error occurred', SnackbarSeverityEnum.Error);
            }
            throw error;
        }
    };

    const onReset = () => {
        setNewVariant(InitialStateVariant);
        removeCachedItemsByPrefix("Variant/");
    };
    const handleBack = () => {
        navigate(`${NavRoutesEnum.Variants}`);
    };
    useEffect(() => {
        if (urlId) {
            const fetchVariant = async () => {
                try {
                    const VariantData = await VariantApi.getById(urlId);
                    setNewVariant(VariantData);
                } catch (error) {
                    showSnackbar(`Error fetching Variant: ${error}`, SnackbarSeverityEnum.Error);
                }
            };
            fetchVariant();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [urlId]);

    const ProductsApi = async (): Promise<ILOVItem[]> => {
        const Products = await ProductApi.getAll();
        return Products.data.map<ILOVItem>((cat: any) => ({ value: cat.id, label: cat.name }));
    };
    const handleGetLovProducts = async () => {
        try {
            const result: ILOVItem[] = await setOrGetCacheSession("LOVsProducts", () => ProductsApi());
            return result;
        } catch (error) {
            throw error;
        }
    };


    const VariantFormSteps: IDynamicFormStep[] = [
        {
            step: 1,
            fields: [
                {
                    name: 'name',
                    label: 'Variant Name',
                    fieldType: fieldTypesEnum.Text,
                    required: true
                },
                {
                    name: 'productId',
                    label: 'product',
                    fieldType: fieldTypesEnum.Dropdown,
                    LOVDataHandler: handleGetLovProducts,
                    required: true,
                },
            ],
            validationSchema: VariantValidationSchemaFrom1,
            initialValidationState: InitialStateVariantFrom1Validation,
        },
        {
            step: 2,
            fields: [
                {
                    name: 'price',
                    label: 'price',
                    fieldType: fieldTypesEnum.Text,
                    required: true,
                    textFieldType: textFieldTypesEnum.NUMBER
                },
                {
                    name: 'stock',
                    label: 'stock',
                    fieldType: fieldTypesEnum.Text,
                    required: true,
                    textFieldType: textFieldTypesEnum.NUMBER

                },
            ],
            validationSchema: VariantValidationSchemaFrom2,
            initialValidationState: InitialStateVariantFrom2Validation,
        },
    ];


    return (
        <div>
            <Button onClick={() => handleBack()} variant="outlined" color="primary" style={{ marginRight: 8 }}>
                Back
            </Button>
            <StepperForm
                steps={['Step 1: Variant Info', 'Step 2: Variant values']}
                onSubmit={async () => await handleCreateVariant(newVariant)}
                saveOnStep={false}
                isStepValid={isStepValid}
                onReset={() => onReset()}
            >
                {VariantFormSteps.map((stepConfig) => (
                    <DynamicForm
                        key={stepConfig.step}
                        data={newVariant}
                        onChange={handleVariantChange}
                        step={stepConfig.step}
                        fields={stepConfig.fields}
                        validationSchema={stepConfig.validationSchema}
                        initialValidationState={stepConfig.initialValidationState}
                    />
                ))}
            </StepperForm>

        </div>
    );
};

export default VariantCreateUpdatePage;