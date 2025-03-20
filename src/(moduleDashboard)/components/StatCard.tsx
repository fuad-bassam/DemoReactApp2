import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface StatCardProps {
    title: string;
    value: number | string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {

    console.log("Stat");

    return (
        <Card sx={{ flex: 1 }}>
            <CardContent>
                <Typography variant="h6">{title}</Typography>
                <Typography variant="h4">{value}</Typography>
            </CardContent>
        </Card>
    );
};

export default StatCard;