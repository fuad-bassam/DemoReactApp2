import React, { useEffect, useState } from 'react';
import StepperForm from '../../../../CommonComponent/StepperForm';
import Product from '../../../../../Services/interfaces/Product/Product';
import ProductFormStep1 from './ProductFormStep1';
import ProductFormStep2 from './ProductFormStep2';
import { useSnackbar } from '../../../../../hooks/SnackbarContext';
import { SnackbarSeverityEnum } from '../../../../../Enum/CommonEnums';
import { useParams } from 'react-router-dom';
import { InitialStateProduct } from '../../../../../Store/ProductStoreModule';
import useProductApiModule from '../../../../../Services/API/Product/ProductApiModule';

const ProductCreateUpdatePage: React.FC = () => {
    const { ProductApi } = useProductApiModule();
    const { urlId } = useParams();
    const { showSnackbar } = useSnackbar();
    //fuad note: need to update data after the stepper change the step *
    const [newProduct, setNewProduct] = useState<Product>(InitialStateProduct);
    const [isStepValid, setIsStepValid] = useState(false);
    const handleProductChange = (updatedProduct: Product, isStepValid: boolean) => {
        setNewProduct(updatedProduct);
        setIsStepValid(isStepValid);
    };

    const handleCreateProduct = async (product: Product) => {
        try {
            let createProduct: Product;
            if (!product.id) {
                createProduct = await ProductApi.create(product);
                setNewProduct({ ...newProduct, id: createProduct?.id });
            } else {
                createProduct = await ProductApi.update(product);
            }
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
        setNewProduct({
            name: '',
            categoryId: "0",
            description: '',
            notes: "",
            createdAt: new Date().toISOString(),
        });
    };

    useEffect(() => {
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

    return (
        <div>
            <StepperForm
                steps={['Step 1: Product Info', 'Step 2: Product Note']}
                onSubmit={async () => await handleCreateProduct(newProduct)}
                saveOnStep={false}
                isStepValid={isStepValid}
                onReset={() => onReset()}
            >
                <ProductFormStep1 data={newProduct} onChange={handleProductChange} />
                <ProductFormStep2 data={newProduct} onChange={handleProductChange} />
            </StepperForm>
        </div>
    );
};

export default ProductCreateUpdatePage;