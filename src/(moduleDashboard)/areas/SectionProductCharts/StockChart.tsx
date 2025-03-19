// components/StockChart.tsx
import React from 'react';
import * as echarts from 'echarts';
import ChartCard from '../../components/ChartCard';

interface StockChartProps {
    variants: any[];
}

const StockChart: React.FC<StockChartProps> = ({ variants }) => {
    // Prepare data for the chart
    const variantStockData = variants.map((variant) => ({
        name: variant.name,
        value: variant.stock,
    }));

    // ECharts options
    const option: echarts.EChartsOption = {
        title: {
            text: 'Stock by Variant',
            left: 'center',
        },
        tooltip: {
            trigger: 'axis',
        },
        xAxis: {
            type: 'category',
            data: variantStockData.map((item) => item.name),
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                name: 'Stock',
                type: 'bar',
                data: variantStockData.map((item) => item.value),
            },
        ],
    };

    return <ChartCard title="Stock by Variant" option={option} />;
};

export default StockChart;