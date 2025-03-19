// components/CategoryChart.tsx
import React from 'react';
import * as echarts from 'echarts';
import ChartCard from '../../components/ChartCard';

interface CategoryChartProps {
    categories: any[];
    products: any[];
}

const CategoryChart: React.FC<CategoryChartProps> = ({ categories, products }) => {
    const categoryProductCount = categories.map((category) => ({
        name: category.name,
        value: products.filter((product) => product.categoryId === category.id).length,
    }));

    const option: echarts.EChartsOption = {
        title: {
            text: 'Products by Category',
            left: 'center',
        },
        tooltip: {
            trigger: 'item',
        },
        series: [
            {
                name: 'Products',
                type: 'pie',
                radius: '50%',
                data: categoryProductCount,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                    },
                },
            },
        ],
    };

    return <ChartCard title="Products by Category" option={option} />;
};

export default CategoryChart;