import { Box } from "@mui/material";
import StatCard from "../components/StatCard";

export const SectionTotalCount: React.FC<{ isSmallScreen: boolean; totalProducts: number; totalVariants: number; totalStock: number }> = ({ isSmallScreen, totalProducts, totalVariants, totalStock }) => {
    return (
        <Box display={'flex'} gap={3} flexDirection={isSmallScreen ? 'column' : 'row'}>
            <StatCard title="Total Products" value={totalProducts} />
            <StatCard title="Total Variants" value={totalVariants} />
            <StatCard title="Total Stock" value={totalStock} />
        </Box>
    );
};
