/* eslint-disable react-hooks/exhaustive-deps */
// pages/DashboardPage.tsx
import React, { useEffect, useState } from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import StatCard from './Common/StatCard';
import CategoryChart from './CategoryChart';
import StockChart from './StockChart';
import Variants from '../../../Services/interfaces/Product/Variants';
import Category from '../../../Services/interfaces/Product/Category';
import Product from '../../../Services/interfaces/Product/Product';
import useProductApiModule from '../../../Services/API/Product/ProductApiModule';

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
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 3,
                padding: 3,
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    gap: 3,
                }}
            >
                <StatCard title="Total Products" value={totalProducts} />
                <StatCard title="Total Variants" value={totalVariants} />
                <StatCard title="Total Stock" value={totalStock} />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                    gap: 3,
                }}
            >
                <CategoryChart categories={categories} products={products} />
                <StockChart variants={variants} />
            </Box>
        </Box>

    );
};

export default DashboardPage;