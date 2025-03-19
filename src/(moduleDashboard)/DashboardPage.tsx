/* eslint-disable react-hooks/exhaustive-deps */
// pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import Category from '../models/Product/Category';
import Product from '../models/Product/Product';
import Variants from '../models/Product/Variants';
import { SectionProductCharts } from './sections/SectionProductCharts';
import { SectionTotalCount } from './sections/SectionTotalCount';







const DashboardPage: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [variants, setVariants] = useState<Variants[]>([]);
    const { ProductApi, VariantApi, CategoryApi } = useProductApiModule();


    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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

    const totalProducts = products.length;
    const totalVariants = variants.length;
    const totalStock = variants.reduce((sum, variant) => sum + (Number(variant.stock) || 0), 0);

    return (
        <Box display={'flex'} gap={3} flexDirection={isSmallScreen ? 'column' : 'row'} padding={3}>
            <SectionTotalCount isSmallScreen={isSmallScreen} totalProducts={totalProducts} totalVariants={totalVariants} totalStock={totalStock}></SectionTotalCount>
            <SectionProductCharts categories={categories} products={products} variants={variants}></SectionProductCharts>
        </Box>

    );
};

export default DashboardPage;