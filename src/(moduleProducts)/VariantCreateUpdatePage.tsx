import React, { useEffect, useState } from 'react';
import StepperForm from '../../../CommonComponent/StepperForm';
import { useSnackbar } from '../../../../hooks/SnackbarContext';
import { fieldTypesEnum, SnackbarSeverityEnum, textFieldTypesEnum } from '../../../../../src/store/CommonEnums';
import { useNavigate, useParams } from 'react-router-dom';
import { removeCachedItemsByPrefix, setOrGetCache as setOrGetCacheSession } from "../../../../Services/Common/CachingSessionService";
import ILOVItem from '../../../../Services/interfaces/Common/LOVs';
import DynamicForm from '../../../CommonComponent/DynamicForm';
import { IDynamicFormStep } from '../../../../Services/interfaces/Common/IDynamicForm';
import { NavRoutesEnum } from '../../../../Services/Common/NavRoutes';
import { Button, Typography } from '@mui/material';
import Variants from '../../../../Services/interfaces/Product/Variants';
import { InitialStateVariant, InitialStateVariantFrom1Validation, InitialStateVariantFrom2Validation } from '../../../../../src/(moduleProducts)/store/ProductStoreModule';
import { VariantValidationSchemaFrom1, VariantValidationSchemaFrom2 } from '../../../../Services/validation/Product/ProductValidation';
import useProductApiModule from '../../../../Services/API/Product/ProductApiModule';

const VariantCreateUpdatePage: React.FC = () => {
    const { ProductApi, VariantApi } = useProductApiModule();

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
            <Typography variant="h4" gutterBottom>
                {urlId ? "Variant Edit" : "Variant Creation"}
            </Typography>

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
            <Button onClick={() => handleBack()} variant="outlined" color="primary" style={{ marginRight: 8 }}>
                Back
            </Button>
        </div>
    );
};

export default VariantCreateUpdatePage;