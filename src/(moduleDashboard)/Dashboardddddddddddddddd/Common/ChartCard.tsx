import React, { useRef, useEffect } from 'react';
import { Card, CardContent } from '@mui/material';
import * as echarts from 'echarts';

interface ChartCardProps {
    title: string;
    option: echarts.EChartsOption;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, option }) => {
    const chartRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chartRef.current) {
            const chart = echarts.init(chartRef.current);
            chart.setOption(option);

            // Cleanup on unmount
            return () => {
                chart.dispose();
            };
        }
    }, [option]);

    return (
        <Card sx={{ flex: 1 }}>
            <CardContent>
                <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
            </CardContent>
        </Card>
    );
};

export default ChartCard;