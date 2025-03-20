/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, } from '@mui/material';
import Category from '../models/Product/Category';
import Product from '../models/Product/Product';
import Variants from '../models/Product/Variants';

import { SectionProductCharts } from './sections/DashboardPage/SectionProductCharts';
import { SectionTotalCount } from './sections/DashboardPage/SectionTotalCount';
import categoryApi from '../services/Product/categoryApi';
import productApi from '../services/Product/productApi';
import variantApi from '../services/Product/variantApi';

const DashboardPage: React.FC = () => {
    const ProductApi = useMemo(() => productApi(), []);
    const VariantApi = useMemo(() => variantApi(), []);
    const CategoryApi = useMemo(() => categoryApi(), []);

    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [variants, setVariants] = useState<Variants[]>([]);

    useEffect(() => {
        const loadData = async () => {
            const productsData = await ProductApi.getAll();
            const categoriesData = await CategoryApi.getAll();
            const variantsData = await VariantApi.getAll();

            setCategories(categoriesData.data);
            setProducts(productsData.data);
            setVariants(variantsData.data);
        };

        loadData();
    }, []);
    console.log("x");

    const totalProducts = products.length;
    const totalVariants = variants.length;
    const totalStock = variants.reduce((sum, variant) => sum + (Number(variant.stock) || 0), 0);

    return (
        <Box display={'flex'} gap={3} flexDirection={'column'} padding={3}>
            <SectionTotalCount totalProducts={totalProducts} totalVariants={totalVariants} totalStock={totalStock}></SectionTotalCount>
            <SectionProductCharts categories={categories} products={products} variants={variants}></SectionProductCharts>
        </Box>

    );
};

export default DashboardPage;