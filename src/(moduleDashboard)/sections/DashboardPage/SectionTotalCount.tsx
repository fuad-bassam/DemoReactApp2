import { Box, useMediaQuery, useTheme } from "@mui/material";
import StatCard from "../components/StatCard";

export const SectionTotalCount: React.FC<{ totalProducts: number; totalVariants: number; totalStock: number }> = ({ totalProducts, totalVariants, totalStock }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box display={'flex'} gap={3} flexDirection={isSmallScreen ? 'column' : 'row'}>
            <StatCard title="Total Products" value={totalProducts} />
            <StatCard title="Total Variants" value={totalVariants} />
            <StatCard title="Total Stock" value={totalStock} />
        </Box>
    );
};
